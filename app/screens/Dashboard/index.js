import React, {Component, useState} from 'react';
import {Dimensions, StyleSheet, View, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {ActivityIndicator, Surface} from 'react-native-paper';
import {colors, DARK_MAP_THEME} from '../../theme';
import {useSelector} from 'react-redux';
import {
  Offline,
  Order,
  EnroutePickup,
  ConfirmPickup,
} from '../../components/Card';
import socketIO from 'socket.io-client';

const {width, height} = Dimensions.get('window');

const GOOGLE_MAPS_APIKEY = 'AIzaSyCiOd5vESI31DmPFd6e7QVRVMTX43sm_Ic';

Geocoder.init(GOOGLE_MAPS_APIKEY);

const Home = () => {
  const {isOnline} = useSelector(({account}) => account);
  const {dark} = useSelector(({theme}) => theme);
  const mapView = React.useRef(null);
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({
    latitude: 6.6052898,
    longitude: 3.3149357,
  });
  const [destination, setDestination] = useState({
    latitude: 6.605284535830513,
    longitude: 3.3171244316839394,
  });

  React.useEffect(() => {
    handleGetUserLocation();
    // handleGetAddressCordinates();
  }, []);
  React.useEffect(() => {
    console.log('here');
    const socket = socketIO('https://dev.api.logistics.churchesapp.com');
    socket.connect();
    socket.on('connect', () => {
      console.log('connected');
    });
  });

  const handleGetUserLocation = async () => {
    Geolocation.getCurrentPosition(
      (info) => {
        console.log('location', info.coords.latitude);
        console.log('location', info.coords.longitude);
        setCoordinates({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const onReady = (result) => {
    mapView.current.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: width / 25,
        bottom: height / 25,
        left: width / 25,
        top: height / 25,
      },
    });
  };

  const onMapPress = (e) => {
    console.log('e.nativeEvent', e.nativeEvent);
    if (typeof e.nativeEvent.coordinate.latitude !== 'undefined') {
      setDestination(e.nativeEvent.coordinate);
    }
  };

  console.log('coordinates', coordinates);

  const mapStyle = dark ? DARK_MAP_THEME : [];

  return (
    <View style={classes.root}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        ref={mapView}
        customMapStyle={mapStyle}
        onPress={onMapPress}>
        <MapView.Marker coordinate={coordinates} />
        <MapView.Marker coordinate={destination} />
        {coordinates && (
          <MapViewDirections
            origin={coordinates}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="red"
            language="en"
            // optimizeWaypoints={true}
            // mode="BICYCLING"
            precision="high"
            timePrecision="now"
            onStart={(params) => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`,
              );
            }}
            onReady={onReady}
            onError={(errorMessage) => {
              console.log('GOT AN ERROR', errorMessage);
            }}
            resetOnChange={false}
            mode="DRIVING"
          />
        )}
      </MapView>
      {isOnline ? null : <Offline />}
      {/* <Order /> */}
      {/* <EnroutePickup /> */}
      {/* <ConfirmPickup /> */}
    </View>
  );
};

export default Home;

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  church: {
    position: 'absolute',
    bottom: 0,
    elevation: 6,
    width: '100%',
    padding: 5,
  },
});
