import {SIGN_UP_NAME, SIGN_IN} from '../types';
import {Platform} from 'react-native';

const initialState = {
  name: '',
  email: '',
  password: '',
  type: 'Logistics',
  country: '',
  state: '',
  platform: Platform.OS === 'ios' ? 'ios' : 'android',
  phoneNumber: '',
  signedIn: false,
};

export default (state = initialState, action) => {
  switch (action) {
    case SIGN_UP_NAME:
      return {...state, ...action.payload};
    case SIGN_IN:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
