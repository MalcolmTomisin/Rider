import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import store from './app/store';
import codePush from 'react-native-code-push';

// THEMES
import StartUp from './app/StartUp';

//let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};

const App = () => {
  return (
    <Provider store={store}>
      <StartUp />
    </Provider>
  );
};

store.subscribe(() => {
  console.log('Store Changed, ', store.getState());
});

//export default codePush(codePushOptions)(App);
export default App;
