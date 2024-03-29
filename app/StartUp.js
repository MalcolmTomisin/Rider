import React, {useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Navigation from './navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  configureFonts,
  DefaultTheme as PaperTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {colors} from './theme';
import {FeedBack} from './components/Feedback';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {accountAction, deliveryAction, feedbackAction} from './store/actions';
import {Platform, PermissionsAndroid, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {CancelOrder, Reason} from './components/Modal';
import WebSocket from './components/Socket/context';
import io from 'socket.io-client';
import {api} from './api';
import constants from './utils/constants';
import messaging from '@react-native-firebase/messaging';
import {useFetch} from './utils/fetchHook';
//import {Order, Offline} from './components/Card';
import Order from './components/Card/newComponents/Order';
import {makeNetworkCalls } from './utils';
import {rejectOrder} from './components/Modal/components/CancelOrder';
import {navigationRef} from './RootNavigation';
import * as RootNavigation from './RootNavigation';
import {useNetInfo} from '@react-native-community/netinfo';
import axios from 'axios';
import {setSignInToken} from './store/actions/signUp';
import SplashScreen from 'react-native-splash-screen';
import {ConfirmModal} from './components/Modal';
import PickUp from './components/Card/newComponents/PickUp';
import {
  Note,
  ArrivalDialog,
  PaymentDialog,
  PickupOrder,
} from './components/Card/newComponents/Modals';
import CashConfirm from './components/Card/newComponents/CashConfirm';
import Pickup from './components/Card/newComponents/ConfirmPickUp';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    //console.log('Authorization status:', authStatus);
  }
}

const StartUp = () => {
  const [socket, setSocket] = React.useState(null);
  const [running, setTimerIsRunning] = useState(true);
  const [orderPrompt, setOrderPrompt] = useState(false);
  const [stopSound, setStopSound] = useState(false); 
  const dispatch = useDispatch();
  const theme = useSelector(({theme}) => theme);
  const netInfo = useNetInfo();
  const {location, token, isOnline, message, resetTimer} = useSelector(
    ({account}) => account,
  );

  // const intercept = () => {
  //   axios.interceptors.response.use(
  //     (response) => {
  //       console.log('intercept response', response);
  //       return Promise.resolve(response);
  //     },
  //     (error) => {
  //       console.log('intercept', error.response);
  //       if (error?.response?.status === 440) {
  //         Alert.alert('Security', 'You are logged in on another device');
  //         AsyncStorage.clear();
  //         dispatch(setSignInToken({signedIn: false}));
  //         RootNavigation.navigate('Onboarding');
  //       }
  //       return Promise.reject(error);
  //     },
  //   );
  // };

  const {currentIndex} = useSelector(({delivery}) => delivery);

  //reverse geocode coordinates of rider to set address of rider
  const getAddressFromCoordinates = () => {
    const {longitude, latitude} = location.coords;
    fetch(
      `${api.reverseGeocode}latlng=${latitude},${longitude}&result_type=street_address&key=${constants.GOOGLE_MAPS_APIKEY}`,
    )
      .then((res) => res.json())
      .then((res) => {
        dispatch(
          accountAction.setAddress({address: res.results[0].formatted_address}),
        );
      })
      .catch((err) => {
        //console.log(err, 'err');
      });
  };

  // callback on event timer runs out
  const onCountDownFinish = () => {
    rejectOrder(message, dispatch, token);
  };

  const updateFCMToken = () => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        //console.log('ftoken', token);
        if (token) {
          makeNetworkCalls({
            url: api.fcmToken,
            method: 'patch',
            headers: {
              'x-auth-token': token,
              'Content-type': 'application/json',
            },
            data: {
              FCMToken: fcmToken,
            },
          })
            .then((res) => {})
            .catch((err) => {
              if (err.response) {
                const {msg} = err.response.data;
                console.log('msg', msg);
                return;
              }
              console.log('2', `${err}`);
            });
        }
      });
  };

  React.useEffect(() => {
    SplashScreen.hide();
    updateFCMToken();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(remoteMessage?.notification.title, remoteMessage.data?.body);
    });
    setPreliminaries();
    if (token) {
      socketEvents();
    }

    return unsubscribe;
  }, [token]);

  //multiple actions,
  // 1 connecting to socket service
  // 2 listening to events on sockets
  // 3 getting online/offline status of rider
  const socketEvents = () => {
    try {
      console.log(token, 'token');
      const s = io(`https://dev.api.logistics.churchesapp.com?token=${token}`, {
        path: '/sio',
        transports: ['websocket'],
      });

      s.on('connect', () => {
        console.log('socket connected');
      });

      s.on('assignEntry', (message) => {
        console.log('mess', message);
        let resetTimer = Date.now();
        dispatch(accountAction.setOrder({message, resetTimer}));
      });

      s.on('takenEntry', () => {
        console.log('taken');
        dispatch(accountAction.setOrder({message: null}));
      });

      if (token) {
        makeNetworkCalls({
          url: api.riderDetails,
          headers: {
            'x-auth-token': token,
          },
          method: 'get',
        })
          .then((res) => {
            const {data, msg} = res.data;
            dispatch(accountAction.setOnline({isOnline: data.onlineStatus}));
          })
          .catch((err) => {
            if (err.response) {
              const {msg} = err.response.data;
              console.log('rider details err', msg);
              return;
            }
            console.error(err);
          });
      }
      setSocket(s);
    } catch (error) {
      console.log('socket error', error);
    }
  };

  // setting up, retrieving token, rider data and current order being handled by rider(if order exists) for hydrating redux
  // setting up location permissions
  const setPreliminaries = async () => {
    let mToken, entryIndex, user;
    try {
      mToken = await AsyncStorage.getItem('x-auth-token');
      entryIndex = await AsyncStorage.getItem('currentEntry');
      user = await AsyncStorage.getItem('userDetails');
      if (entryIndex) {
        dispatch(
          deliveryAction.setIndexOfEntry({
            currentIndex: parseInt(entryIndex),
          }),
        );
      }
      console.log('mToken', mToken);
      dispatch(accountAction.setToken({token: mToken}));
      dispatch(accountAction.setUserData({user: JSON.parse(user)}));
      if (mToken) {
        await requestLocationPermission();
      }
    } catch (e) {
      console.error(e);
    }
  };

  //see above
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      await requestUserPermission();
      Geolocation.requestAuthorization('always');
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
    await handleLocation();
  };
  //see above
  const handleLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        //console.log('position', position);
        const {latitude, longitude} = position.coords;
        dispatch(accountAction.setLocation(position));
        dispatch(
          accountAction.setNewLocationCoords({
            coordinates: {latitude, longitude},
          }),
        );
        getAddressFromCoordinates();
      },
      (error) => {
        // See error code charts below.
        //console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const RNPTheme = {
    dark: theme.dark,
    colors: {
      ...PaperTheme.colors,
      primary: '#6200ee',
      accent: '#03dac4',
      background: theme.dark ? '#000' : 'rgb(255, 255, 255)',
      surface: theme.dark ? '#131313' : 'white',
      text: theme.dark ? '#fff' : 'black',
      error: '#B00020',
    },
    animation: {
      scale: 1.0,
    },
    roundness: 2,
    fonts: configureFonts(fontConfig),
  };

  const RNTheme = {
    dark: theme.dark,
    colors: {
      ...DefaultTheme.colors,
      primary: theme.dark ? 'rgb(255, 45, 85)' : colors.black,
      background: theme.dark ? colors.black : colors.white,
      card: theme.dark ? colors.grey.dark : colors.white,
      text: theme.dark ? colors.white : 'rgb(28, 28, 30)',
      border: theme.dark ? colors.hr.dark : colors.hr.light,
    },
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
      .finally(() => dispatch(accountAction.setLoadingStatus({loading: false})));
  };

  //function handling rider accepting an order
  const accept = () => {
    setOrderPrompt(false);
    const {data} = message;
    dispatch(accountAction.setLoadingStatus({loading: true}));
    setTimerIsRunning(false);
    makeNetworkCalls({
      url: api.acceptEntry,
      method: 'post',
      headers: {
        'x-auth-token': token,
        'Content-type': 'application/json',
      },
      data: {entry: data._id},
    })
      .then(async (res) => {
        message.accept = true;
        //fetch basket for updated info about current entry
        callBasket(api.riderBasket);
        // dispatch(
        //   feedbackAction.launch({open: true, severity: 's', msg: res.data.msg}),
        // );
        dispatch(accountAction.setOrder({message}));
        setOrderPrompt(true);
        setStopSound(true);
      })
      .catch((err) => {
        if (err.response) {
          const {msg} = err.response.data;
          console.log('err', msg);
          dispatch(
            feedbackAction.launch({
              open: true,
              severity: 'w',
              msg,
            }),
          );
          setTimerIsRunning(true);
          return;
        }
        setTimerIsRunning(true);
      })
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
        setStopSound(false);
      });
  };

  return (
    <WebSocket.Provider value={socket}>
      <PaperProvider theme={RNPTheme}>
        <NavigationContainer theme={RNTheme} ref={navigationRef}>
          <Navigation />
          {!isOnline ? null : !message?.data ? null : message?.accept ? null : (
            <Order
              onAccept={accept}
              onCountDownFinish={onCountDownFinish}
              timerIsRunning={running}
              reset={resetTimer.toString()}
              message={message}
              stopSound={stopSound}
            />
          )}

          {/* internet listener, use different listener on android */}
          {/* {!netInfo.isConnected && <Offline isNetworkOff={true} />} */}
          {/* <Order /> */}
          {/* <ConfirmModal /> */}
          {/* <PickUp /> */}
          {/* <Note /> */}
          {/* <ArrivalDialog /> */}
          {/* <PaymentDialog /> */}
          {/* <CashConfirm /> */}
          <PickupOrder
            showpickup={orderPrompt}
            pickup={() => {
              setOrderPrompt(false);
              RootNavigation.navigate('OrderPool');
            }}
            addToBasket={() => {
              setOrderPrompt(false);
            }}
          />
          {/* <Pickup /> */}
        </NavigationContainer>
        <FeedBack />
        <CancelOrder />
        <Reason />
      </PaperProvider>
    </WebSocket.Provider>
  );
};

export default StartUp;

const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'Manrope-SemiBold',
      fontWeight: '500',
    },
    medium: {
      fontFamily: 'Manrope-Medium',
      fontWeight: '600',
    },
    light: {
      fontFamily: 'Manrope-Regular',
      fontWeight: '400',
    },
    thin: {
      fontFamily: 'Manrope-Light',
      fontWeight: '300',
    },
  },
  default: {
    regular: {
      fontFamily: 'Manrope-SemiBold',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Manrope-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Manrope-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Manrope-Light',
      fontWeight: 'normal',
    },
  },
};
