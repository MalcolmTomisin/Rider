
export const baseURL = 'https://dev.api.logistics.churchesapp.com/api/v1/';

export const pspk = 'pk_test_fef4b69ccc575dec3a8babc10d9371505943faa8';

export const api = {
  login: `${baseURL}auth/rider`,
  register: `${baseURL}user`,
  verify: `${baseURL}/api/auth/verify`,
  forgotPassword: `${baseURL}/api/auth/forgot-password`,
  resetPassword: `${baseURL}/api/auth/reset-password`,
  online: `${baseURL}rider/online`,
  acceptEntry: `${baseURL}entry/rider-accept`,
  card: `${baseURL}/api/cards`,
  userAuthKey: '@user',
  reverseGeocode: 'https://maps.googleapis.com/maps/api/geocode/json?'
};