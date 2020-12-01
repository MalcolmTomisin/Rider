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
import {FeedBack} from '../../components/Feedback';
import {
  accountAction,
  deliveryAction,
  feedbackAction,
} from '../../store/actions';
import {rejectOrder} from '../../components/Modal/components/CancelOrder';
import constants from '../../utils/constants';
import {ConfirmDialog} from '../../components/Modal';
import {callBasket} from '../../utils';

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
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState({
    latitude: 6.6052898,
    longitude: 3.3149357,
  });
  const [destination, setDestination] = useState({
    latitude: 6.605284535830513,
    longitude: 3.3171244316839394,
  });

  //alert user of arrival
  const alertUserOfArrival = () => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    fetch(api.alertArrival, {
      method: 'POST',
      headers: {
        'x-auth-token': token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({entry: currentEntry.entry._id}),
    })
      .then((res) => {
        if (res.status !== 200) {
          //console.log('stat', res.status);
          throw new Error('Unsuccessful');
        }
        return res.json();
      })
      .then(async (res) => {
        await callBasket(api.riderBasket, token, dispatch, currentIndex);
        dispatch(
          feedbackAction.launch({open: true, severity: 's', msg: res.msg}),
        );
        //navigate('ConfirmPickupCode');
        if (currentEntry.entry.paymentMethod !== 'cash') {
          navigate('ConfirmPickupCode');
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
      });
  };

  //accept entry order
  const accept = () => {
    const {data} = message;
    //console.log('data', data._id);
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
        if (res.status !== 200) {
          throw new Error('unsuccessful');
        }
        return res.json();
      })
      .then(async (res) => {
        // console.log('res', res);
        message.accept = true;
        await callBasket(api.riderBasket, token, dispatch, currentIndex);
        dispatch(
          feedbackAction.launch({open: true, severity: 's', msg: res.msg}),
        );
        dispatch(accountAction.setOrder({message}));
        push('OrderPool');
      })
      .catch((err) => {
        //console.log('err', err);
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
        //console.log('stat', res);
        // if (res.status !== 200) {
        //   console.log('stat', res);
        //   throw new Error('unsuccessful');
        // }
        return res.json();
      })
      .then(async (res) => {
        //console.log('json', res);
        await callBasket(api.riderBasket, token, dispatch, currentIndex);
        dispatch(
          feedbackAction.launch({open: true, severity: 's', msg: res.msg}),
        );
        dispatch(deliveryAction.setEnrouteToPickUp({enroute: true}));
        pop();
        push('Dashboard');
      })
      .catch((err) => {
        //console.log('err', err);
        dispatch(
          feedbackAction.launch({open: true, severity: 'w', msg: `${err}`}),
        );
      })
      .finally(() =>
        dispatch(accountAction.setLoadingStatus({loading: false})),
      );
  };

  //notify api delivery has started
  const startDelievery = () => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    fetch(api.startDelivery, {
      method: 'POST',
      headers: {
        'x-auth-token': token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({order: currentEntry._id}),
    })
      .then((res) => {
        //console.log('statres', res);
        if (!res.ok) {
          throw new Error('unsuccessful');
        }
        return res.json();
      })
      .then(async (res) => {
        await callBasket(api.riderBasket, token, dispatch, currentIndex);
        dispatch(
          feedbackAction.launch({open: true, severity: 's', msg: res.msg}),
        );
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
      });
  };

  //notify api delivery has arrived
  const announceArrivalAtDelivery = () => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    fetch(api.alertArrivalAtDelivery, {
      method: 'POST',
      headers: {
        'x-auth-token': token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        order: currentEntry._id,
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('unsuccessful');
        }
        return res.json();
      })
      .then(async (res) => {
        await callBasket(api.riderBasket, token, dispatch, currentIndex);
        dispatch(
          feedbackAction.launch({open: true, severity: 's', msg: res.msg}),
        );
        pop();
        navigate('ConfirmDeliveryCode');
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
      });
  };

  useEffect(() => {
    handleGetUserLocation();
    // handleGetAddressCordinates();
  }, []);

  useEffect(() => {
    if (enroute) {
      Geolocation.watchPosition(
        ({coords: {longitude, latitude}}) => {
          console.log('it has happened');
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
        //console.log('entry', message);
        dispatch(accountAction.setOrder({message}));
      });
    }
  }, [socket]);
  const onCountDownFinish = () => {
    rejectOrder(message, dispatch, token);
  };

  const handleGetUserLocation = async () => {
    // dispatch(accountAction.setLoadingStatus({loading: true}));
    Geolocation.getCurrentPosition(
      (info) => {
        //console.log('location', info.coords.latitude);
        //console.log('location', info.coords.longitude);
        setCoordinates({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
        //dispatch(accountAction.setLoadingStatus({loading: false}));
      },
      (error) => {
        //dispatch(accountAction.setLoadingStatus({loading: false}));
        // See error code charts below.
        // console.log(error.code, error.message);
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
    //console.log('e.nativeEvent', e.nativeEvent);
    if (typeof e.nativeEvent.coordinate.latitude !== 'undefined') {
      setDestination(e.nativeEvent.coordinate);
    }
  };

  //console.log('coordinates', coordinates);

  const mapStyle = dark ? DARK_MAP_THEME : [];

  return (
    <View style={classes.root}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        ref={mapView}
        customMapStyle={mapStyle}
        onPress={onMapPress}>
        {currentEntry?.entry?.status !== 'pickedup' &&
          pickUp &&
          currentEntry?.entry?.status !== 'enrouteToDelivery' &&
          currentEntry?.entry?.status !== 'arrivedAtDelivery' &&
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
                // optimizeWaypoints={true}
                // mode="BICYCLING"
                precision="high"
                timePrecision="now"
                onStart={(params) => {
                  // console.log(
                  //   `Started routing between "${params.origin}" and "${params.destination}"`,
                  // );
                }}
                onReady={onReady}
                onError={(errorMessage) => {
                  //console.log('GOT AN ERROR', errorMessage);
                }}
                resetOnChange={false}
                mode="DRIVING"
              />
            </>
          )}
        {currentEntry?.entry?.status !== 'enrouteToPickup' &&
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
                // optimizeWaypoints={true}
                // mode="BICYCLING"
                precision="high"
                timePrecision="now"
                onStart={(params) => {
                  // console.log(
                  //   `Started routing between "${params.origin}" and "${params.destination}"`,
                  // );
                }}
                onReady={onReady}
                onError={(errorMessage) => {
                  //console.log('GOT AN ERROR', errorMessage);
                }}
                resetOnChange={false}
                mode="DRIVING"
              />
            </>
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

      {currentEntry?.entry?.status === 'driverAccepted' ? (
        <>
          <EnroutePickup onPress={goingEnroute} />
          <AddressBanner />
        </>
      ) : null}

      {/* {currentEntry ? (
        currentEntry.entry.status === constants.PICK_UP ||
        currentEntry.entry.status === 'arrivedAtPickup' ? null : (
          <>
            <EnroutePickup onPress={goingEnroute} />
            <AddressBanner />
          </>
        )
      ) : null} */}

      {currentEntry?.entry?.status === 'enrouteToPickup' ? (
        <>
          <ConfirmPickup confirmArrival={alertUserOfArrival} />
          <AddressBanner />
        </>
      ) : null}

      {currentEntry?.entry?.status === 'arrivedAtPickup' &&
      currentEntry.entry.paymentMethod !== 'card' &&
      currentEntry?.transaction?.status !== 'approved' ? (
        <ConfirmPayment />
      ) : null}

      {/* {cashPaid && (
        <>
          <ConfirmPickup confirmArrival={alertUserOfArrival} />
          <AddressBanner />
        </>
      )} */}

      {/* {currentEntry?.entry?.status === 'arrivedAtPickup' ?
      //&& currentEntry?.entry.paymentMethod === 'card' ?
      (
        <>
          <ConfirmPickup confirmArrival={alertUserOfArrival} />
          <AddressBanner />
        </>
      ) : null} */}

      {/* {currentEntry && currentEntry?.entry.status === constants.PICK_UP ? (
        <>
          <ConfirmPickup confirmArrival={alertUserOfArrival} />
          <AddressBanner />
        </>
      ) : currentEntry &&
        currentEntry?.entry.paymentMethod !== 'card' &&
        enroute ? (
        <ConfirmPayment />
      ) : null} */}

      {currentEntry?.entry?.status === 'pickedup' ? (
        <>
          <AddressBanner />
          <EnrouteDelivery onPress={startDelievery} />
        </>
      ) : null}

      {currentEntry?.status === 'enrouteToDelivery' ? (
        <>
          <AddressBanner />
          <ConfirmDelivery confirmDelivery={announceArrivalAtDelivery} />
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
