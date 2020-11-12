import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducers';
import { setSignUpName, setSignInToken } from './actions/signUp';
import accountActions from './actions/account';

const store = createStore(appReducer, applyMiddleware(thunk));

export const boundSignUpName = (details) => {
  store.dispatch(setSignUpName(details));
};

export const boundSetSignInToken = (details) => {
  store.dispatch(setSignInToken(details));
};

export default store;
