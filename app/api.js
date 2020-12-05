import axios from 'axios';

export const baseURL = 'https://dev.api.logistics.churchesapp.com/api/v1/';
import {} from 'react-redux';

export const instance = axios.create({
  baseURL,
});

export const pspk = 'pk_test_fef4b69ccc575dec3a8babc10d9371505943faa8';

export const api = {
  login: 'auth/rider',
  register: 'user',
  verify: '/api/auth/verify',
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
};
