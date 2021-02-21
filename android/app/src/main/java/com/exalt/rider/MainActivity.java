package com.exalt.rider;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import com.exalt.rider.data.AsyncStorage;
import com.exalt.rider.services.LocationUpdateService;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;

import org.devio.rn.splashscreen.SplashScreen;
import android.os.Handler;
import android.util.Log;

public class MainActivity extends ReactActivity {
    public static final String TOKEN = "Location-Token";
    public static final String TAG = "com.exalt.rider";
    private AsyncStorage storage;
    String token;
  @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);

        new Handler().postDelayed(() -> SplashScreen.hide(MainActivity.this), 2500);
//      ReactInstanceManager mReactInstanceManager = getReactNativeHost().getReactInstanceManager();
//      ReactApplicationContext context = (ReactApplicationContext) mReactInstanceManager.getCurrentReactContext();
//      mReactInstanceManager.addReactInstanceEventListener(validContext -> {
//          // Use validContext here
////          storage = new AsyncStorage((ReactApplicationContext) validContext);
////          token = storage.getToken();
//
//      });
      SharedPreferences preferences = getSharedPreferences("rider", Context.MODE_PRIVATE);
      if (preferences != null){
          token = preferences.getString("x-auth-token", "");
          if (!token.equals("")){
              Intent serviceIntent = new Intent(this, LocationUpdateService.class);
              serviceIntent.putExtra(TOKEN, token);
              startService(serviceIntent);
              HeadlessJsTaskService.acquireWakeLockNow(this);
          }
      }
    }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "rider";
  }

//    @Override
//    protected void onPause() {
//        super.onPause();
//        startService(new Intent(this, LocationUpdateService.class));
//        HeadlessJsTaskService.acquireWakeLockNow(this);
//    }
}
