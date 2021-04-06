package com.exalt.rider;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.exalt.rider.services.LocationUpdateService;
import com.exalt.rider.services.Utils;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ReactNativeCallBack extends ReactContextBaseJavaModule {
    ReactApplicationContext context;
    public static final String TAG = "com.exalt.rider";
    public ReactNativeCallBack(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "ReactNativeCallBack";
    }

    // call from javascript layer
    //launches foreground service just after login
    @ReactMethod
    public void startService(String mToken){
        if (LocationUpdateService.IS_RUNNING){
            return;
        }
        Log.e(TAG, "Event running with token: " + mToken);
        Intent serviceIntent = new Intent(context, LocationUpdateService.class);
        serviceIntent.setAction(Utils.ACTION_START_SERVICE);
        serviceIntent.putExtra(MainActivity.TOKEN, mToken);
        context.startService(serviceIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);
    }

    @ReactMethod
    public void stopService(){
        if (!LocationUpdateService.IS_RUNNING){
            return;
        }
        Log.e(TAG, "stopping background service ");
        Intent serviceIntent = new Intent(context, LocationUpdateService.class);
        serviceIntent.setAction(Utils.ACTION_STOP_SERVICE);
        context.stopService(serviceIntent);
    }
}
