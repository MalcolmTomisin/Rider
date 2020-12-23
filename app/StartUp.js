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
import {Order, Offline} from './components/Card';
import {makeNetworkCalls, callBasket} from './utils';
import {rejectOrder} from './components/Modal/components/CancelOrder';
import {navigationRef} from './RootNavigation';
import * as RootNavigation from './RootNavigation';

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
  const dispatch = useDispatch();
  const theme = useSelector(({theme}) => theme);
  const {location, token, isOnline, message} = useSelector(
    ({account}) => account,
  );

  const {currentIndex} = useSelector(({delivery}) => delivery);

  //reverse geocode coordinates of rider
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

  const onCountDownFinish = () => {
    rejectOrder(message, dispatch, token);
  };

  React.useEffect(() => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        //console.log('ftoken', token);
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
        });
      });
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, [token]);

  React.useEffect(() => {
    setPreliminaries();
    if (token) {
      socketEvents();
    }
  }, [token]);

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
        dispatch(accountAction.setOrder({message}));
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
      //console.log('error', error);
    }
  };

  const setPreliminaries = async () => {
    let token, entryIndex, user;
    try {
      token = await AsyncStorage.getItem('x-auth-token');
      entryIndex = await AsyncStorage.getItem('currentEntry');
      user = await AsyncStorage.getItem('userDetails');
      if (entryIndex) {
        dispatch(
          deliveryAction.setIndexOfEntry({
            currentIndex: parseInt(entryIndex),
          }),
        );
      }
      dispatch(accountAction.setToken({token}));
      dispatch(accountAction.setUserData({user: JSON.parse(user)}));
      await requestLocationPermission();
    } catch (e) {
      console.error(e);
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
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

  const handleLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        //console.log('position', position);
        dispatch(accountAction.setLocation(position));
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

  const accept = () => {
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
        await callBasket(api.riderBasket, token, dispatch, currentIndex);
        dispatch(
          feedbackAction.launch({open: true, severity: 's', msg: res.data.msg}),
        );
        dispatch(accountAction.setOrder({message}));
        RootNavigation.navigate('OrderPool');
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
      })
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
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
            />
          )}
        </NavigationContainer>
        <FeedBack />
        <CancelOrder />
        <Reason />
      </PaperProvider>
    </WebSocket.Provider>
  );
};

export default StartUp;

const GetAuth = async () => {
  //check if token exists
  try {
    const value = await AsyncStorage.getItem(api.userAuthKey);
    return value != null ? JSON.parse(value) : false;
  } catch (e) {
    //failure
  }
  return false;
};

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
