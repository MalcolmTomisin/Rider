package com.exalt.rider.services;

import android.content.Context;
import android.location.Location;
import android.preference.PreferenceManager;

import com.exalt.rider.R;

import java.text.DateFormat;
import java.util.Date;

public class Utils {
    static final String KEY_REQUESTING_LOCATION_UPDATES = "requesting_locaction_updates";

    /**
     * Returns true if requesting location updates, otherwise returns false.
     *
     * @param context The {@link Context}.
     */
    static boolean requestingLocationUpdates(Context context) {
        return PreferenceManager.getDefaultSharedPreferences(context)
                .getBoolean(KEY_REQUESTING_LOCATION_UPDATES, false);
    }

    /**
     * Stores the location updates state in SharedPreferences.
     * @param requestingLocationUpdates The location updates state.
     */
    static void setRequestingLocationUpdates(Context context, boolean requestingLocationUpdates) {
        PreferenceManager.getDefaultSharedPreferences(context)
                .edit()
                .putBoolean(KEY_REQUESTING_LOCATION_UPDATES, requestingLocationUpdates)
                .apply();
    }

    /**
     * Returns the {@code location} object as a human readable string.
     * @param location  The {@link Location}.
     */
    static String getLocationText(Location location) {
        return location == null ? "Unknown location" :
                "(" + location.getLatitude() + ", " + location.getLongitude() + ")";
    }

//    static String getLocationTitle(Context context) {
//        return context.getString(R.string.app_name,
//                DateFormat.getDateTimeInstance().format(new Date()));
//    }

    public static final String ACTION_STOP_SERVICE = "stop service";
    public static final String ACTION_START_SERVICE = "start service";
}
