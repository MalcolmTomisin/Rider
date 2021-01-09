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
  EnrouteDelivery,
  ConfirmDelivery,
} from '../../components/Card';
import io from 'socket.io-client';
import WSContext from '../../components/Socket/context';
import {Loading} from '../../components/Loading';
import {api} from '../../api';
import {
  accountAction,
  deliveryAction,
  feedbackAction,
} from '../../store/actions';
import {rejectOrder} from '../../components/Modal/components/CancelOrder';
import {ConfirmDialog} from '../../components/Modal';
import {callBasket, makeNetworkCalls} from '../../utils';
import NotificationSounds, {
  playSampleSound,
} from 'react-native-notification-sounds';
import {useFetch} from '../../utils/fetchHook';

const {width, height} = Dimensions.get('window');

const GOOGLE_MAPS_APIKEY = 'AIzaSyCiOd5vESI31DmPFd6e7QVRVMTX43sm_Ic';

Geocoder.init(GOOGLE_MAPS_APIKEY);

const Home = ({navigation: {navigate, push, pop}}) => {
  let {isOnline, message, token, loading, location} = useSelector(
    ({account}) => account,
  );
  let {pickUp, currentEntry, enroute, cashPaid, currentIndex} = useSelector(
    ({delivery}) => delivery,
  );
  const {dark} = useSelector(({theme}) => theme);
  const socket = useContext(WSContext);
  const mapView = React.useRef(null);
  const [running, setTimerIsRunning] = useState(true);
  const [retry, setRetry] = useState(false);
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState({
    latitude: 6.6052898,
    longitude: 3.3149357,
  });
  const [destination, setDestination] = useState({
    latitude: 6.605284535830513,
    longitude: 3.3171244316839394,
  });

  useFetch();

  //alert user of arrival
  const alertUserOfArrival = () => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    makeNetworkCalls({
      url: api.alertArrival,
      method: 'post',
      headers: {
        'x-auth-token': token,
        'Content-type': 'application/json',
      },
      data: {entry: currentEntry.entry._id},
    })
      .then(async (res) => {
        const {data, msg} = res.data;
        await callBasket(api.riderBasket, token, dispatch, currentIndex);
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        if (currentEntry.entry.paymentMethod !== 'cash') {
          navigate('ConfirmPickupCode');
        }
      })
      .catch((err) => {
        const {msg} = err?.response?.data;
        dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
      })
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
      });
  };

  //notify api rider already enroute
  const goingEnroute = () => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    makeNetworkCalls({
      url: api.enroute,
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token,
      },
      data: {entry: currentEntry.entry._id},
    })
      .then(async (res) => {
        await callBasket(api.riderBasket, token, dispatch, currentIndex);
        const {data, msg} = res.data;
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        dispatch(deliveryAction.setEnrouteToPickUp({enroute: true}));
        setRetry(false);
        pop();
        push('Dashboard');
      })
      .catch((err) => {
        const {msg} = err?.response?.data;
        dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
        setRetry(true);
      })
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
      });
  };

  //notify api delivery has started
  const startDelievery = () => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    makeNetworkCalls({
      url: api.startDelivery,
      method: 'post',
      headers: {
        'x-auth-token': token,
        'Content-type': 'application/json',
      },
      data: {order: currentEntry._id},
    })
      .then(async (res) => {
        const {msg} = res.data;
        await callBasket(api.riderBasket, token, dispatch, currentIndex);
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        setRetry(false);
      })
      .catch((err) => {
        const {msg} = err?.response?.data;
        dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
        setRetry(true);
      })
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
      });
  };

  //notify api delivery has arrived
  const announceArrivalAtDelivery = () => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    makeNetworkCalls({
      url: api.alertArrivalAtDelivery,
      method: 'post',
      headers: {
        'x-auth-token': token,
        'Content-type': 'application/json',
      },
      data: {order: currentEntry._id},
    })
      .then(async (res) => {
        await callBasket(api.riderBasket, token, dispatch, currentIndex);
        const {msg} = res.data;
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        setRetry(false);
        pop();
        navigate('ConfirmDeliveryCode');
      })
      .catch((err) => {
        const {msg} = err?.response?.data;
        dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
        setRetry(true);
      })
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
      });
  };

  useEffect(() => {
    handleGetUserLocation();
    // handleGetAddressCordinates();
  }, []);

  useEffect(() => {
    if (token) {
      Geolocation.watchPosition(
        ({coords: {longitude, latitude}}) => {
          console.log('it has happened');
          makeNetworkCalls({
            url: api.location,
            headers: {
              'Content-type': 'application/json',
              'x-auth-token': token,
            },
            method: 'patch',
            data: {latitude, longitude},
          }).catch((err) => console.error(err));
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 20,
          fastestInterval: 30000,
          interval: 60000,
        },
      );
    }
  }, []);

  const handleGetUserLocation = async () => {
    Geolocation.getCurrentPosition(
      (info) => {
        setCoordinates({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      (error) => {},
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
    //console.log('e.nativeEvent', e.nativeEvent);
    if (typeof e.nativeEvent.coordinate.latitude !== 'undefined') {
      setDestination(e.nativeEvent.coordinate);
    }
  };

  const mapStyle = dark ? DARK_MAP_THEME : [];

  return (
    <View style={classes.root}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        ref={mapView}
        customMapStyle={mapStyle}
        onPress={onMapPress}>
        {currentEntry &&
          currentEntry?.entry?.status !== 'pickedup' &&
          pickUp &&
          currentEntry?.entry?.status !== 'enrouteToDelivery' &&
          currentEntry?.entry?.status !== 'arrivedAtDelivery' &&
          currentEntry?.entry?.status !== 'cancelled' &&
          currentEntry?.entry?.status !== 'delivered' && (
            <>
              <MapView.Marker coordinate={coordinates} />
              <MapView.Marker coordinate={pickUp} />
              <MapViewDirections
                origin={coordinates}
                destination={{
                  latitude: currentEntry?.pickupLatitude,
                  longitude: currentEntry?.pickupLongitude,
                }}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={4}
                strokeColor="red"
                language="en"
                precision="high"
                timePrecision="now"
                onStart={(params) => {}}
                onReady={onReady}
                onError={(errorMessage) => {}}
                resetOnChange={false}
                mode="DRIVING"
              />
            </>
          )}
        {currentEntry &&
          currentEntry?.entry?.status !== 'enrouteToPickup' &&
          currentEntry?.entry?.status !== 'driverAccepted' &&
          currentEntry?.entry?.status !== 'arriveAtPickup' &&
          coordinates &&
          currentEntry &&
          currentEntry?.entry?.status !== 'completed' &&
          currentEntry?.entry?.status !== 'cancelled' && (
            <>
              <MapView.Marker coordinate={coordinates} />
              <MapView.Marker
                coordinate={{
                  latitude: currentEntry?.deliveryLatitude,
                  longitude: currentEntry?.deliveryLongitude,
                }}
              />
              <MapViewDirections
                origin={coordinates}
                destination={{
                  latitude: currentEntry?.deliveryLatitude,
                  longitude: currentEntry?.deliveryLongitude,
                }}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={4}
                strokeColor="red"
                language="en"
                precision="high"
                timePrecision="now"
                onStart={(params) => {}}
                onReady={onReady}
                onError={(errorMessage) => {}}
                resetOnChange={false}
                mode="DRIVING"
              />
            </>
          )}
      </MapView>

      {!isOnline && <Offline />}
      <Loading visible={loading} size="large" />

      {currentEntry?.entry?.status === 'driverAccepted' ? (
        <>
          <EnroutePickup onPress={goingEnroute} error={retry} />
          <AddressBanner />
        </>
      ) : null}

      {currentEntry?.entry?.status === 'enrouteToPickup' ? (
        <>
          <ConfirmPickup confirmArrival={alertUserOfArrival} error={retry} />
          <AddressBanner />
        </>
      ) : null}

      {currentEntry?.entry?.status === 'arrivedAtPickup' &&
      currentEntry.entry.paymentMethod !== 'card' &&
      currentEntry?.transaction?.status !== 'approved' ? (
        <ConfirmPayment />
      ) : null}

      {currentEntry?.status === 'pickedup' ? (
        <>
          <AddressBanner />
          <EnrouteDelivery onPress={startDelievery} error={retry} />
        </>
      ) : null}

      {currentEntry?.status === 'enrouteToDelivery' ? (
        <>
          <AddressBanner />
          <ConfirmDelivery
            confirmDelivery={announceArrivalAtDelivery}
            error={retry}
          />
        </>
      ) : null}

      <ConfirmDialog navigation={push} />
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
