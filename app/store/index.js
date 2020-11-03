import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducers';
import {setSignUpDetails} from './actions/signUp';

const store = createStore(appReducer, applyMiddleware(thunk));

export const boundSignUp = (details) => {
  store.dispatch(setSignUpDetails(details));
};

export default store;
