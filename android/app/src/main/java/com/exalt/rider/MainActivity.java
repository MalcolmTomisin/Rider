package com.exalt.rider;

import android.content.Intent;
import android.os.Bundle;

import com.exalt.rider.services.LocationUpdateService;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Handler;

public class MainActivity extends ReactActivity {

  @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
        new Handler().postDelayed(() -> SplashScreen.hide(MainActivity.this), 2500);
    }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "rider";
  }

    @Override
    protected void onStop() {
        super.onStop();
        startService(new Intent(this, LocationUpdateService.class));
        HeadlessJsTaskService.acquireWakeLockNow(this);
    }
}
