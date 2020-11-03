import {SIGN_UP_NAME} from '../types';
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
};

export default (state = [], action) => {
  switch (action) {
    case SIGN_UP_NAME:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
