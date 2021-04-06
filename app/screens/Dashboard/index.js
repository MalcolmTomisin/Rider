import React, {Component, useState, useContext, useEffect} from 'react';
import {Dimensions, StyleSheet, View, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {ActivityIndicator, Surface} from 'react-native-paper';
import {colors, DARK_MAP_THEME, SILVER_THEME} from '../../theme';
import {useSelector, useDispatch} from 'react-redux';
import {
  Offline,
  Order,
  EnroutePickup,
  ConfirmPickup,
  AddressBanner,
  ConfirmPayment,
  EnrouteDelivery,
  //ConfirmDelivery,
} from '../../components/Card';
import {Loading} from '../../components/Loading';
import {api} from '../../api';
import {
  accountAction,
  deliveryAction,
  feedbackAction,
} from '../../store/actions';
import {ConfirmDialog} from '../../components/Modal';
import {makeNetworkCalls} from '../../utils';
import {useFetch} from '../../utils/fetchHook';
import PickUp from '../../components/Card/newComponents/PickUp';
import PickUpConfirm from '../../components/Card/newComponents/ConfirmPickUp';
import CashConfirm from '../../components/Card/newComponents/CashConfirm';
import {PaymentDialog, Note} from '../../components/Card/newComponents/Modals';
import ConfirmDelivery from '../../components/Card/newComponents/Deliver';
import DeliveryCode from '../../components/Card/newComponents/ConfirmDelivery';
import DeliveryPin from '../../components/svg/DeliveryPin';
import PickupPin from '../../components/svg/PickupPin';
import RiderPin from '../../components/svg/RiderPin';

const {width, height} = Dimensions.get('window');

const GOOGLE_MAPS_APIKEY = 'AIzaSyCiOd5vESI31DmPFd6e7QVRVMTX43sm_Ic';

Geocoder.init(GOOGLE_MAPS_APIKEY);

const Home = ({navigation: {navigate, push, pop}}) => {
  let {isOnline, token, loading} = useSelector(({account}) => account);
  let {pickUp, currentEntry, currentIndex, recievedPayment} = useSelector(
    ({delivery}) => delivery,
  );
  const {dark} = useSelector(({theme}) => theme);
  const mapView = React.useRef(null);
  const [retry, setRetry] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState({
    latitude: 6.6052898,
    longitude: 3.3149357,
  });
  const [destination, setDestination] = useState({
    latitude: 6.605284535830513,
    longitude: 3.3171244316839394,
  });

  //useFetch();

  //rider alerts user/API of arrival
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
      .then((res) => {
        const {data, msg} = res.data;
        //await callBasket(api.riderBasket, token, dispatch, currentIndex);
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        callBasket(api.riderBasket);
      })
      .then(() => {
        push('Dashboard');
        if (currentEntry.entry.paymentMethod !== 'cash') {
          //navigate('ConfirmPickupCode');
        }
      })
      .catch((err) => {
        if (err.response) {
          const {msg} = err?.response?.data;
          dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
          return;
        }
        dispatch(
          feedbackAction.launch({open: true, severity: 'w', msg: `${err}`}),
        );
      })
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
      });
  };

  const handlePayment = (flag) => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    let data = {};
    data.status = flag;
    if (currentEntry?.status === 'arrivedAtDelivery'){
        data.order = currentEntry?._id;
        data.type = currentEntry?.transaction?.cashPaymentType;
    }
    else {
      data.entry = currentEntry?.entry?._id;
    }
    makeNetworkCalls({
      url: api.cashPayment,
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token,
      },
      data,
    })
      .then(async (res) => {
        callBasket(api.riderBasket);
        const {msg} = res.data;
        if (recievedPayment === 0) {
          dispatch(accountAction.setOrder({message: null}));
          dispatch(
            deliveryAction.setCurrentPickupInfo({
              currentEntry: null,
              currentIndex: null,
            }),
          );
        }
        dispatch(
          deliveryAction.setPaymentRecieved({
            recievedPayment: null,
            cashPaid: recievedPayment !== 0 ? true : false,
          }),
        );
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        if (recievedPayment !== 0) {
          //navigation('ConfirmPickupCode');
          push('Dashboard');
        }
      })
      .catch((err) => {
        if (err.response.data) {
          const {msg} = err.response.data;
          dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
          return;
        }
        dispatch(
          feedbackAction.launch({open: true, severity: 'w', msg: `${err}`}),
        );
      })
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
        setShowPayment(false);
      });
  };

  //notify api delivery has arrived
  const announceArrivalAtDelivery = () => {
    console.log('width', width);
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
        const {msg} = res.data;
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        callBasket(api.riderBasket);
      })
      .then(() => {
        setRetry(false);
        //pop();
        //navigate('ConfirmDeliveryCode');
      })
      .catch((err) => {
        setRetry(true);
        if (err.response) {
          const {msg} = err?.response?.data;
          dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
          return;
        }
        dispatch(
          feedbackAction.launch({open: true, severity: 'w', msg: `${err}`}),
        );
      })
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
      });
  };

  useEffect(() => {
    handleGetUserLocation();
    // handleGetAddressCordinates();
  }, []);

  const getLocationUpdates = () => {
    if (token) {
      //watch position and updates backend api with current status
      Geolocation.watchPosition(
        ({coords: {longitude, latitude}}) => {
          console.log('it has happened');
          dispatch(
            accountAction.setNewLocationCoords({
              coordinates: {latitude, longitude},
            }),
          );
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
  };

  useEffect(() => {
    getLocationUpdates();
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

  const callBasket = (url) => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    makeNetworkCalls({
      url,
      method: 'get',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        const {data, msg} = res.data;
        dispatch(accountAction.setAcceptedOrders({acceptedOrders: data}));
        if (typeof currentIndex !== 'undefined') {
          dispatch(
            deliveryAction.setCurrentPickupInfo({
              currentEntry: data[currentIndex],
            }),
          );
        }
      })
      .catch((err) => console.log(err))
      .finally(() =>
        dispatch(accountAction.setLoadingStatus({loading: false})),
      );
  };

  const mapStyle = dark ? DARK_MAP_THEME : SILVER_THEME;

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
              <Marker coordinate={coordinates}>
                <RiderPin />
              </Marker>
              <Marker coordinate={pickUp}>
                <PickupPin />
              </Marker>
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
              <MapView.Marker coordinate={coordinates}>
                <RiderPin />
              </MapView.Marker>
              <MapView.Marker
                coordinate={{
                  latitude: currentEntry?.deliveryLatitude,
                  longitude: currentEntry?.deliveryLongitude,
                }}>
                <DeliveryPin />
              </MapView.Marker>
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

      {currentEntry?.entry?.status === 'enrouteToPickup' && !showNotes && (
        <PickUp
          confirmArrival={alertUserOfArrival}
          error={retry}
          showNote={() => setShowNotes(true)}
        />
      )}

      {currentEntry?.entry?.status === 'arrivedAtPickup' &&
        currentEntry.transaction.paymentMethod !== 'cash' && (
          <PickUpConfirm push={push} pop={pop} />
        )}

{currentEntry?.entry?.status === 'arrivedAtPickup' &&
        currentEntry.transaction.status !== 'pending' && currentEntry.transaction.cashPaymentType === 'pickup' && (
          <PickUpConfirm push={push} pop={pop} />
        )}

{currentEntry?.entry?.status === 'arrivedAtPickup' &&
        currentEntry.transaction.status === 'pending' && currentEntry.transaction.cashPaymentType !== 'pickup' && (
          <PickUpConfirm push={push} pop={pop} />
        )}
      {currentEntry?.entry?.status === 'arrivedAtPickup' &&
        currentEntry?.entry.paymentMethod === 'cash' &&
        currentEntry.transaction.status === 'pending' &&
        currentEntry?.transaction?.cashPaymentType === 'pickup' &&
        !showPayment && (
          <CashConfirm
            confirm={() => setShowPayment(true)}
            name={currentEntry?.name}
            price={Math.round(currentEntry?.transaction?.amount)}
          />
        )}

      {currentEntry?.status === 'arrivedAtDelivery' &&
        currentEntry?.entry.paymentMethod === 'cash' &&
        currentEntry.transaction.status === 'pending' &&
        currentEntry?.transaction?.cashPaymentType !== 'pickup' &&
        !showPayment && (
          <CashConfirm
            confirm={() => setShowPayment(true)}
            name={currentEntry?.name}
            price={Math.round(currentEntry?.transaction?.amount)}
          />
        )}
      {currentEntry?.status === 'enrouteToDelivery' && !showNotes && (
        <ConfirmDelivery
          confirmDelivery={announceArrivalAtDelivery}
          error={retry}
          showNote={() => setShowNotes(true)}
        />
      )}

      {currentEntry?.status === 'arrivedAtDelivery' &&
        currentEntry.transaction.status !== 'pending' && (
          <DeliveryCode pop={pop} push={push} />
        )}

      <ConfirmDialog navigation={push} />
      <PaymentDialog
        showPayment={showPayment}
        paid={() => {
          handlePayment('approved');
        }}
        notPaid={() => handlePayment('declined')}
        name={currentEntry?.name}
        price={Math.round(currentEntry?.transaction?.amount)}
      />
      <Note
        showNotes={showNotes}
        dismiss={() => setShowNotes(false)}
        riderNote={currentEntry?.transaction?.note}
      />
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
    elevation: 8,
    width: '100%',
    padding: 5,
  },
});
