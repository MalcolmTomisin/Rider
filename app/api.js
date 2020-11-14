
export const baseURL = 'https://dev.api.logistics.churchesapp.com/api/v1/';

export const pspk = 'pk_test_fef4b69ccc575dec3a8babc10d9371505943faa8';

export const api = {
  login: `${baseURL}auth/rider`,
  register: `${baseURL}user`,
  verify: `${baseURL}/api/auth/verify`,
  forgotPassword: `${baseURL}/api/auth/forgot-password`,
  resetPassword: `${baseURL}/api/auth/reset-password`,
  online: `${baseURL}rider/online`,

  // food delivery
  popularRestaurant: `${baseURL}/api/restaurant/popular`,
  restaurant: `${baseURL}/api/restaurants`,
  menuCategory: `${baseURL}/api/restaurant/menu/categories`,
  fastestNear: `${baseURL}/api/restaurant/near`,
  getDish: `${baseURL}/api/restaurant/menu`,
  getOption: `${baseURL}/api/restaurant/menu/options`,
  getDeal: `${baseURL}/api/restaurant/deals/today`,
  checkout: `${baseURL}/api/order/checkout`,
  location: `${baseURL}/api/locations`,
  card: `${baseURL}/api/cards`,
  userAuthKey: '@user'
};