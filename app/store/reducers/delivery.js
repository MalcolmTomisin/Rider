import {
  DELIVERY_DATA,
  PICK_UP,
  CURRENT_PICK_UP,
  ENROUTE,
  PAYMENT_RECIEVED,
} from '../types';

const initialstate = {
  cancel: false,
  reason: false,
  pickUp: null,
  deliveryAddress: null,
  currentEntry: null,
  enroute: false,
  recievedPayment: null,
  cashPaid: false,
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case DELIVERY_DATA:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case PICK_UP:
      return {...state, ...action.payload};
    case CURRENT_PICK_UP:
      return {...state, ...action.payload};
    case ENROUTE:
      return {...state, ...action.payload};
    case PAYMENT_RECIEVED:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
