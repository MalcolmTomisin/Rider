import React, {Component, useState, useContext, useEffect} from 'react';
import {Dimensions, StyleSheet, View, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {ActivityIndicator, Surface} from 'react-native-paper';
import {colors, DARK_MAP_THEME} from '../../theme';
import {useSelector, useDispatch} from 'react-redux';
import {
  Offline,
  Order,
  EnroutePickup,
  ConfirmPickup,
  AddressBanner,
  ConfirmPayment,
} from '../../components/Card';
import io from 'socket.io-client';
import WSContext from '../../components/Socket/context';
import {Loading} from '../../components/Loading';
import {api} from '../../api';
import {FeedBack} from '../../components/Feedback';
import {accountAction, deliveryAction} from '../../store/actions';
import feedbackAction from '../../store/actions/feedback';
import {rejectOrder} from '../../components/Modal/components/CancelOrder';
import constants from '../../utils/constants';

const {width, height} = Dimensions.get('window');

const GOOGLE_MAPS_APIKEY = 'AIzaSyCiOd5vESI31DmPFd6e7QVRVMTX43sm_Ic';

Geocoder.init(GOOGLE_MAPS_APIKEY);

const Home = ({navigation: {navigate}}) => {
  let {isOnline, message, token, loading, location} = useSelector(
    ({account}) => account,
  );
  let {pickUp, currentEntry, enroute} = useSelector(({delivery}) => delivery);
  const {dark} = useSelector(({theme}) => theme);
  const socket = useContext(WSContext);
  const mapView = React.useRef(null);
  const [running, setTimerIsRunning] = useState(true);
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState({
    latitude: 6.6052898,
    longitude: 3.3149357,
  });
  const [destination, setDestination] = useState({
    latitude: 6.605284535830513,
    longitude: 3.3171244316839394,
  });

  //accept entry order
  const accept = () => {
    const {data} = message;
    console.log('data', data._id);
    dispatch(accountAction.setLoadingStatus({loading: true}));
    setTimerIsRunning(false);
    fetch(api.acceptEntry, {
      method: 'POST',
      headers: {
        'x-auth-token': token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({entry: data._id}),
    })
      .then((res) => {
        console.log(res.status);
        return res.json();
      })
      .then((res) => {
        console.log('res', res);
        message.accept = true;
        dispatch(
          feedbackAction.launch({open: true, severity: 's', msg: res.msg}),
        );
        dispatch(accountAction.setOrder({message}));
        navigate('OrderPool');
      })
      .catch((err) => {
        console.log('err', err);
        dispatch(
          feedbackAction.launch({
            open: true,
            severity: 'w',
            msg: 'Unsuccessful',
          }),
        );
        setTimerIsRunning(true);
      })
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
      });
  };

  //notify api rider already enroute
  const goingEnroute = () => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    fetch(api.enroute, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({entry: currentEntry.entry._id}),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch(
          feedbackAction.launch({open: true, severity: 's', msg: res.msg}),
        );
        dispatch(deliveryAction.setEnrouteToPickUp({enroute: true}));
      })
      .catch((err) => {
        console.err(err);
        dispatch(
          feedbackAction.launch({open: true, severity: 's', msg: `${err}`}),
        );
      })
      .finally(() => dispatch(accountAction.setLoadingStatus({loading: true})));
  };

  useEffect(() => {
    handleGetUserLocation();
    // handleGetAddressCordinates();
  }, []);

  useEffect(() => {
    if (enroute) {
      Geolocation.watchPosition(
        ({coords: {longitude, latitude}}) => {
          fetch(api.location, {
            method: 'PATCH',
            headers: {
              'Content-type': 'application/json',
              'x-auth-token': token,
            },
            body: JSON.stringify({latitude, longitude}),
          });
        },
        (error) => {
          console.error(error);
        },
        {interval: 120000, enableHighAccuracy: true},
      );
    }
  }, [enroute]);

  useEffect(() => {
    if (socket) {
      socket.on('assignEntry', (message) => {
        console.log('entry', message);
        dispatch(accountAction.setOrder({message}));
      });
    }
  }, []);
  const onCountDownFinish = () => {
    rejectOrder(message, dispatch, token);
  };

  const handleGetUserLocation = async () => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    Geolocation.getCurrentPosition(
      (info) => {
        console.log('location', info.coords.latitude);
        console.log('location', info.coords.longitude);
        setCoordinates({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
        dispatch(accountAction.setLoadingStatus({loading: false}));
      },
      (error) => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
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
        {pickUp && (
          <>
            <MapView.Marker coordinate={coordinates} />
            <MapView.Marker coordinate={pickUp} />
          </>
        )}
        {pickUp && (
          <MapViewDirections
            origin={coordinates}
            destination={pickUp}
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

      {!isOnline ? (
        <Offline />
      ) : !message?.data ? null : message?.accept ? null : (
        <Order
          onAccept={accept}
          onCountDownFinish={onCountDownFinish}
          timerIsRunning={running}
        />
      )}
      <Loading visible={loading} size="large" />
      {/* {currentEntry && <EnroutePickup />} */}
      {currentEntry && currentEntry?.entry.status !== constants.PICK_UP ? (
        <>
          <EnroutePickup onPress={goingEnroute} />
          <AddressBanner />
        </>
      ) : null}
      {currentEntry && currentEntry?.entry.status === constants.PICK_UP ? (
        <>
          <ConfirmPickup />
          <AddressBanner />
        </>
      ) : null}
      <ConfirmPayment />
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
