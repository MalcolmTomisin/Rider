import { AUTH_TOKEN, USER_DATA, LOCATION_DATA, IS_ONLINE } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialstate = {
  token: null,
  user: null,
  location: {
    address: {
      address_components: [],
      formatted_address: '1600 Charleston Rd, Mountain View, CA 94043, USA',
      geometry: {
        location: {lat: 37.4220543, lng: -122.084095},
        location_type: 'ROOFTOP',
        viewport: {},
      },
      place_id: 'ChIJX6rUlvi5j4ARMfP1t1jdF4E',
      plus_code: {
        compound_code: 'CWC8+R9 Mountain View, CA, USA',
        global_code: '849VCWC8+R9',
      },
      types: ['street_address'],
    },
    coords: {
      latitude: 37.4219983,
      longitude: -122.084,
    },
  },
  isOnline: true,
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case USER_DATA:
      return {...state, ...action.payload};
    case AUTH_TOKEN:
      return {...state, ...action.payload};
    case LOCATION_DATA:
      return Object.assign({}, state, {
        location: action.payload,
      });
    case IS_ONLINE:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
