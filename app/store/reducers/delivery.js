import {DELIVERY_DATA} from '../types';

const initialstate = {
  cancel: false,
  reason: false,
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case DELIVERY_DATA:
      return Object.assign({}, state, {
        ...action.payload,
      });
    default:
      return state;
  }
};