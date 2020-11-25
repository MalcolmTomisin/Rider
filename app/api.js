export const baseURL = 'https://dev.api.logistics.churchesapp.com/api/v1/';

export const pspk = 'pk_test_fef4b69ccc575dec3a8babc10d9371505943faa8';

export const api = {
  login: `${baseURL}auth/rider`,
  register: `${baseURL}user`,
  verify: `${baseURL}/api/auth/verify`,
  online: `${baseURL}rider/online`,
  acceptEntry: `${baseURL}entry/rider-accept`,
  userAuthKey: '@user',
  reverseGeocode: 'https://maps.googleapis.com/maps/api/geocode/json?',
  rejectEntry: `${baseURL}entry/rider-reject`,
  riderBasket: `${baseURL}rider/basket`,
  enroute: `${baseURL}entry/enroute-pickup`,
  location: `${baseURL}rider/location`,
  cashPayment: `${baseURL}entry/confirm/cash-payment`,
  alertArrival: `${baseURL}entry/arrived-pickup`,
};
