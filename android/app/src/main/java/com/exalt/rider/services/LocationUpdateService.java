package com.exalt.rider.services;

import android.app.ActivityManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.location.Location;
import android.os.Binder;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.os.Looper;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.exalt.rider.MainActivity;
import com.exalt.rider.R;
import com.exalt.rider.network.LocationObject;
import com.exalt.rider.network.Message;
import com.exalt.rider.network.RiderServiceAPI;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.reactnativecommunity.asyncstorage.ReactDatabaseSupplier;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutorService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class LocationUpdateService extends HeadlessJsTaskService {
    public static final String CHANNEL_ID = "RiderChannel";
    private static final String TAG = "com.exalt.rider";
    private String authToken = null;
    private FusedLocationProviderClient client;
    private LocationRequest locationRequest;
    private boolean canRequestUpdates = false;
    private LocationCallback locationCallback;
    private final IBinder mBinder = new LocalBinder();
    private static final int NOTIFICATION_ID = 12345678;
    private static final String BASE_URL = "https://exaltlogistics.exaltgroups.com/api/v1/";
    public static boolean IS_RUNNING = false;
    private Retrofit retrofit;
    Cursor catalystLocalStorage = null;
    SQLiteDatabase readableDatabase = null;
    /**
     * Used to check whether the bound activity has really gone away and not unbound as part of an
     * orientation change. We create a foreground service notification only if the former takes
     * place.
     */
    private boolean mChangingConfiguration = false;


    @Nullable
    @Override
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        if (extras != null) {
            return new HeadlessJsTaskConfig(
                    "Headless",
                    Arguments.fromBundle(extras),
                    5000, // timeout for the task
                    true // optional: defines whether or not  the task is allowed in foreground. Default is false
            );
        }
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        client = LocationServices.getFusedLocationProviderClient(this);
        locationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult locationResult) {
                super.onLocationResult(locationResult);
                onNewLocation(locationResult.getLastLocation());
            }
        };
        createLocationRequest();
        try {
            Log.e(TAG, "let's get this location ");
            client.requestLocationUpdates(locationRequest,
                    locationCallback, Looper.myLooper());
        } catch (SecurityException unlikely) {
            Log.e(TAG, "Lost location permission. Could not request updates. " + unlikely);
        }
        //initialize network client
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if(intent.getAction().equals(Utils.ACTION_START_SERVICE)){
            authToken = intent.getStringExtra(MainActivity.TOKEN);
            createNotificationChannel();
            startForeground(NOTIFICATION_ID, getNotification());
            IS_RUNNING = true;
        }
        else if(intent.getAction().equals(Utils.ACTION_STOP_SERVICE)){
            Log.i(TAG, "Received Stop Foreground Intent");
            //your end servce code
            stopForeground(true);
            stopSelfResult(startId);
            IS_RUNNING = false;
        }
        //do heavy work on a background thread
        //stopSelf();
        return START_NOT_STICKY;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(
                    CHANNEL_ID,
                    "Foreground Service Channel",
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(serviceChannel);
        }
    }

    private Notification getNotification(){
        String input = "Location Updates";
        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this,
                0, notificationIntent, 0);
        Intent stopServiceIntent = new Intent(this, LocationUpdateService.class);
        stopServiceIntent.setAction(Utils.ACTION_STOP_SERVICE);
        PendingIntent stopServicePending = PendingIntent.getService(this, 0, stopServiceIntent, 0);

        return new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Exalt Rider")
                .setContentText(input)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentIntent(pendingIntent)
                .setPriority(Notification.PRIORITY_HIGH)
                .setWhen(System.currentTimeMillis())
                .addAction(android.R.drawable.ic_menu_close_clear_cancel, "close", stopServicePending)
                .build();
    }
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        mChangingConfiguration = true;
    }

    @Override
    public IBinder onBind(Intent intent) {
        // Called when a client (MainActivity in case of this sample) comes to the foreground
        // and binds with this service. The service should cease to be a foreground service
        // when that happens.
        Log.i(TAG, "in onBind()");
        stopForeground(true);
        mChangingConfiguration = false;
        return mBinder;
    }

    @Override
    public void onRebind(Intent intent) {
        // Called when a client (MainActivity in case of this sample) returns to the foreground
        // and binds once again with this service. The service should cease to be a foreground
        // service when that happens.
        Log.i(TAG, "in onRebind()");
        stopForeground(true);
        mChangingConfiguration = false;
        super.onRebind(intent);
    }

    @Override
    public boolean onUnbind(Intent intent) {
        Log.i(TAG, "Last client unbound from service");

        // Called when the last client (MainActivity in case of this sample) unbinds from this
        // service. If this method is called due to a configuration change in MainActivity, we
        // do nothing. Otherwise, we make this service a foreground service.
        if (!mChangingConfiguration && Utils.requestingLocationUpdates(this)) {
            Log.i(TAG, "Starting foreground service");
            /*
            // TODO(developer). If targeting O, use the following code.
            if (Build.VERSION.SDK_INT == Build.VERSION_CODES.O) {
                mNotificationManager.startServiceInForeground(new Intent(this,
                        LocationUpdatesService.class), NOTIFICATION_ID, getNotification());
            } else {
                startForeground(NOTIFICATION_ID, getNotification());
            }
             */
            startForeground(NOTIFICATION_ID, getNotification());
        }
        return true; // Ensures onRebind() is called when a client re-binds.
    }

    public void fetch(){
        try {
            readableDatabase = ReactDatabaseSupplier.getInstance(getApplicationContext()).getReadableDatabase();
            catalystLocalStorage = readableDatabase.query("catalystLocalStorage", new String[]{"value"}, "key = ?", new String[] { "x-auth-token" }, null, null, null);
            authToken = catalystLocalStorage.getString(catalystLocalStorage.getColumnIndex("value"));
            Log.e(TAG, authToken);
        }
        catch (NullPointerException exception){
            exception.printStackTrace();
        }
        catch (Exception e){
            e.printStackTrace();
        }

        finally {
            if (catalystLocalStorage != null) {
                catalystLocalStorage.close();
            }

            if (readableDatabase != null) {
                readableDatabase.close();
            }
        }
    }

    public void requestLocationUpdates() {
        Log.e(TAG, "Requesting location updates");
        Utils.setRequestingLocationUpdates(this, true);
        startService(new Intent(getApplicationContext(), LocationUpdateService.class));
        try {
            client.requestLocationUpdates(locationRequest,
                    locationCallback, Looper.myLooper());
        } catch (SecurityException unlikely) {
            Utils.setRequestingLocationUpdates(this, false);
            Log.e(TAG, "Lost location permission. Could not request updates. " + unlikely);
        }
    }



    private void createLocationRequest() {
        locationRequest = LocationRequest.create();
        locationRequest.setInterval(40000);
        locationRequest.setFastestInterval(40000);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
    }

    private void onNewLocation(Location location) {
        Log.e(TAG, "New location: " + location);
        if(!isAppOnForeground(this) && authToken != null){
            Log.e(TAG, "enters network calls" + " " + authToken);
            RiderServiceAPI serviceAPI = retrofit.create(RiderServiceAPI.class);
            LocationObject object = new LocationObject(String.valueOf(location.getLongitude()), String.valueOf(location.getLatitude()));
            Call<Message> messageCall = serviceAPI.updateRiderServiceAPI(object, authToken);
            messageCall.enqueue(new Callback<Message>() {
                @Override
                public void onResponse(Call<Message> call, Response<Message> response) {
                    Log.e(TAG, String.valueOf(response.code()) + "response code" );
                    if (response.body() != null) {
                        Log.e(TAG, response.body().getMsg());
                    }
                }

                @Override
                public void onFailure(Call<Message> call, Throwable t) {
                        Log.e(TAG, t.getMessage());
                }
            });
        }
    }

    public class LocalBinder extends Binder {
        LocationUpdateService getService() {
            return LocationUpdateService.this;
        }
    }

    /**
     * Returns true if this is a foreground service.
     *
     * @param context The {@link Context}.
     */
    public boolean serviceIsRunningInForeground(Context context) {
        ActivityManager manager = (ActivityManager) context.getSystemService(
                Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(
                Integer.MAX_VALUE)) {
            if (getClass().getName().equals(service.service.getClassName())) {
                if (service.foreground) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean isAppOnForeground(Context context) {
        /**
         We need to check if app is in foreground otherwise the app will crash.
         http://stackoverflow.com/questions/8489993/check-android-application-is-in-foreground-or-not
         **/
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> appProcesses =
                activityManager.getRunningAppProcesses();
        if (appProcesses == null) {
            return false;
        }
        final String packageName = context.getPackageName();
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (appProcess.importance ==
                    ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
                    appProcess.processName.equals(packageName)) {
                return true;
            }
        }
        return false;
    }

}