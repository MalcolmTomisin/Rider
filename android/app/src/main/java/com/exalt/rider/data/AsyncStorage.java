package com.exalt.rider.data;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.reactnativecommunity.asyncstorage.ReactDatabaseSupplier;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Objects;

public class AsyncStorage {
    public static String TAG = "RNAsyncStorage";
    public ReactApplicationContext context;
    private String token =  "";

    Cursor catalystLocalStorage = null;
    SQLiteDatabase readableDatabase = null;

    public AsyncStorage (ReactApplicationContext context) {
        this.context = context;
        this.fetch();
    }

    public void fetch(){
        try {
            readableDatabase = ReactDatabaseSupplier.getInstance(context).getReadableDatabase();
            catalystLocalStorage = readableDatabase.query("catalystLocalStorage", new String[]{"value"}, "key = ?", new String[] { "x-auth-token" }, null, null, null);
            token = catalystLocalStorage.getString(catalystLocalStorage.getColumnIndex("value"));
            Log.e(TAG, token);
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

    public String getToken(){
        return token;
    }
}
