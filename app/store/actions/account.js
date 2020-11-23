import {USER_DATA, AUTH_TOKEN, LOCATION_DATA, IS_ONLINE, MESSAGE, ADDRESS} from '../types';

// user data action
const setUserData = (payload) => ({
  type: USER_DATA,
  payload,
});

// auth token action
const setToken = (payload) => ({
  type: AUTH_TOKEN,
  payload,
});

// auth token action
const setLocation = (payload) => ({
  type: LOCATION_DATA,
  payload,
});

//set online/offline status
const setOnline = (payload) => ({
  type: IS_ONLINE,
  payload,
});

//hydrate global state with details of order
const setOrder = (payload) => ({
  type: MESSAGE,
  payload,
});

//set address of rider from google apis
const setAddress = (payload) => ({
  payload,
  type: ADDRESS
})
 
export default {
  setUserData,
  setToken,
  setLocation,
  setOnline,
  setOrder,
  setAddress
};
