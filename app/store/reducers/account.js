import {
  AUTH_TOKEN,
  USER_DATA,
  LOCATION_DATA,
  IS_ONLINE,
  MESSAGE,
  ADDRESS,
  LOADING,
  ACCEPTED_ORDERS,
  ICON_LOADING,
  NETWORK_INFO,
  SET_COORDINATES,
} from '../types';

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
      latitude: 6.5568768,
      longitude: 3.3488896,
    },
  },
  isOnline: false,
  message: null,
  address: '',
  loading: false,
  acceptedOrders: [],
  buttonIconLoading: false,
  networkOffline: false,
  resetTimer: Math.random(),
  coordinates: {latitude: null, longitude: null},
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
    case MESSAGE:
      return {...state, ...action.payload};
    case ADDRESS:
      return {...state, ...action.payload};
    case LOADING:
      return {...state, ...action.payload};
    case ACCEPTED_ORDERS:
      return {...state, ...action.payload};
    case ICON_LOADING:
      return {...state, ...action.payload};
    case NETWORK_INFO:
      return {...state, ...action.payload};
    case SET_COORDINATES:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
