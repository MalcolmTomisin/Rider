import {DELIVERY_DATA, PICK_UP} from '../types';

const initialstate = {
  cancel: false,
  reason: false,
  pickUp: null,
  deliveryAddress: null,
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case DELIVERY_DATA:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case PICK_UP:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
