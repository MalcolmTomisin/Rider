import {CHANGE_APP_MODE} from '../types';

// themes action
const setAppTheme = payload => ({
  type: CHANGE_APP_MODE,
  payload,
});


export default {
  setAppTheme,
};