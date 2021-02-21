package com.exalt.rider.network;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.PATCH;

public interface RiderServiceAPI {
    @PATCH("rider/location")
    Call<Message> updateRiderServiceAPI(@Body LocationObject locationObject, @Header("x-auth-token") String auth);
}
