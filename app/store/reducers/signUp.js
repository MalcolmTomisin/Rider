import {
  SIGN_UP_NAME,
  SIGN_IN,
  SIGN_UP_LASTNAME,
  SIGN_UP_EMAIL,
  SIGN_UP_PASSWORD,
} from '../types';
import {Platform} from 'react-native';
//disregard this store since riders do no longer sign up on app

const initialState = {
  firstName: '',
  email: '',
  password: '',
  type: 'Logistics',
  country: '',
  state: '',
  platform: Platform.OS === 'ios' ? 'ios' : 'android',
  phoneNumber: '',
  signedIn: false,
  lastName: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_NAME:
      return {...state, ...action.payload};
    case SIGN_IN:
      return {...state, ...action.payload};
    case SIGN_UP_LASTNAME:
      return {...state, ...action.payload};
    case SIGN_UP_PASSWORD:
      return {...state, ...action.payload};
    case SIGN_UP_EMAIL:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
