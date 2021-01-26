import {accountAction, deliveryAction} from '../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {instance} from '../api';
import SendIntentAndroid from 'react-native-send-intent';
import { OpenMapDirections } from 'react-native-navigation-directions';
import constants from './constants';
import store from '../store';

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// formart currency
export const formatMoney = (
  amount,
  decimalCount = 2,
  decimal = '.',
  thousands = ',',
) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    //console.log(e);
  }
};

// action that get's recent status of the order basket, call this after every call that mutates order on the backend 
export const callBasket = async (url, token, dispatch, currentIndex) => {
  dispatch(accountAction.setLoadingStatus({loading: true}));
  makeNetworkCalls({
    url,
    method: 'get',
    headers: {
      'x-auth-token': token,
    },
  })
    .then(async (res) => {
      const {data, msg} = res.data;
      dispatch(accountAction.setAcceptedOrders({acceptedOrders: data}));
      if (currentIndex) {
        dispatch(
          deliveryAction.setCurrentPickupInfo({
            currentEntry: data[currentIndex],
          }),
        );
      } else {
        currentIndex = await AsyncStorage.getItem('currentEntry');
        if (currentIndex) {
          dispatch(
            deliveryAction.setCurrentPickupInfo({
              currentEntry: data[parseInt(currentIndex)],
            }),
          );
        }
      }
    })
    .catch((err) => console.log(err))
    .finally(() => dispatch(accountAction.setLoadingStatus({loading: false})));
};

export const getMapOfWeeks = () => {
  const daysOfWeek = new Map();
  daysOfWeek.set('1', 'Sun');
  daysOfWeek.set('2', 'Mon');
  daysOfWeek.set('3', 'Tue');
  daysOfWeek.set('4', 'Wed');
  daysOfWeek.set('5', 'Thu');
  daysOfWeek.set('6', 'Fri');
  daysOfWeek.set('7', 'Sat');

  return daysOfWeek;
};

//wrapper for axios
export const makeNetworkCalls = async (requestConfig) => {
  return await instance(requestConfig);
};

export const openGoogleMapsIntent = (latitude, longitude, type) => {
  if (constants.IS_IOS) {
    const state = store.getState();
    const {coordinates} = state.account;
    OpenMapDirections(coordinates, {latitude, longitude}, 'd');
    return;
  }
  SendIntentAndroid.openMapsWithRoute(
    `${latitude}, ${longitude}`,
    type ? type : 'd',
  );
};
