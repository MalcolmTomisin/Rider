import {
  SIGN_UP,
  SIGN_IN,
  SIGN_UP_NAME,
  SIGN_UP_EMAIL,
  SIGN_UP_PASSWORD,
  SIGN_UP_LASTNAME,
} from '../types';

export const setSignUpName = (payload) => ({
  action: SIGN_UP_NAME,
  payload,
});

export const setSignInToken = (payload) => ({
  type: SIGN_IN,
  payload,
});

export const setPassword = (payload) => ({
  type: SIGN_UP_PASSWORD,
  payload,
});

export const setEmail = (payload) => ({
  type: SIGN_UP_EMAIL,
  payload,
});

export const setLastName = (payload) => ({
  type: SIGN_UP_LASTNAME,
  payload,
});
