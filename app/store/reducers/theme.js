import {CHANGE_APP_MODE} from '../types';

const initialstate = {
  dark: true,
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case CHANGE_APP_MODE:
      return Object.assign({}, state, {
        dark: action.payload,
      });
    default:
      return state;
  }
};
