import {combineReducers} from 'redux';
import account from "./account";
import theme from './theme';
import feedback from "./feedback";
import delivery from './delivery';
import signup from './signUp';

const appReducer = combineReducers({
  account,
  theme,
  feedback,
  delivery,
  signup,
});

export default appReducer;