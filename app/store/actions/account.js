import {USER_DATA, AUTH_TOKEN, LOCATION_DATA, IS_ONLINE, MESSAGE} from '../types';

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

const setOnline = (payload) => ({
  type: IS_ONLINE,
  payload,
});

const setOrder = (payload) => ({
  type: MESSAGE,
  payload,
})

export default {
  setUserData,
  setToken,
  setLocation,
  setOnline,
  setOrder
};
