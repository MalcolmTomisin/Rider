import {combineReducers} from 'redux';
import account from "./account";
import theme from './theme';
import feedback from "./feedback";
import delivery from './delivery';

const appReducer = combineReducers({
  account,
  theme,
  feedback,
  delivery,
});

export default appReducer;