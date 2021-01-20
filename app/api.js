import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import * as RootNavigation from './RootNavigation';
import store from './store';
import {setSignInToken} from './store/actions/signUp';
import {accountAction} from './store/actions'

export const baseURL = 'https://dev.api.logistics.churchesapp.com/api/v1/';



export const instance = axios.create({
  baseURL,
});
// instance.interceptors.request.use((config) => {
//   console.log('config before fail', config);
//   return config;
// }, (error) => {
//   console.log('error from request', error);
//   return Promise.reject(error);
// })

instance.interceptors.response.use((response) => {
  console.log('response', response);
  return response;
}, (error) => {
    console.log('intercept', error.response);
    console.log('intercept error', error);
  if (error.response.status === 440){
    console.log('intercept log out', error.response);
    Alert.alert('Security', 'You are logged in on another device');
    AsyncStorage.clear();
    store.dispatch(setSignInToken({signedIn: false}));
    store.dispatch(accountAction.setToken({token: null}));
    RootNavigation.navigate('Onboarding');
  }
  return Promise.reject(error);
})

export const pspk = 'pk_test_fef4b69ccc575dec3a8babc10d9371505943faa8';

export const api = {
  login: 'auth/rider',
  register: 'user',
  verify: 'api/auth/verify',
  online: 'rider/online',
  acceptEntry: 'entry/rider-accept',
  userAuthKey: '@user',
  reverseGeocode: 'https://maps.googleapis.com/maps/api/geocode/json?',
  rejectEntry: 'entry/rider-reject',
  riderBasket: 'rider/basket',
  enroute: 'entry/enroute-pickup',
  location: 'rider/location',
  cashPayment: 'entry/confirm/cash-payment',
  alertArrival: 'entry/arrived-pickup',
  confirmPickUp: 'entry/confirm-pickup',
  startDelivery: 'order/enroute-delivery',
  alertArrivalAtDelivery: 'order/arrived-delivery',
  confirmDelivery: 'order/confirm-delivery',
  weeklyOverview: 'order/weekly-overview',
  rateUser: 'rating/rate-user',
  riderDetails: 'rider/me',
  fcmToken: 'rider/fcmtoken',
  ratingSummary: 'rating/rider-ratings',
  validateEmail: 'auth/validate-email',
  validateOTP: 'auth/validate-otp',
  resetPassword: 'auth/reset-password',
  tripsCurrentMonth: 'rider/trips',
  listBank: 'bank/list',
  validateBank: 'bank/confirm?',
  addbank: 'bank',
};
