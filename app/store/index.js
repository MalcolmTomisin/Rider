import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducers';
import {setSignUpName} from './actions/signUp';

const store = createStore(appReducer, applyMiddleware(thunk));

export const boundSignUpName = (details) => {
  store.dispatch(setSignUpName(details));
};

export default store;
