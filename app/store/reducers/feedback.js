import {LAUNCH_FEEDBACK, DISMISS_FEEDBACK} from '../types';

//providing feedback to users, note severity carries two constants, either 's' success or 'w' warning

const initialstate = {
  open: false,
  severity: "",
  msg: ""
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case LAUNCH_FEEDBACK:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case DISMISS_FEEDBACK:
      return Object.assign({}, state, {
        ...initialstate,
      });
    default:
      return state;
  }
};