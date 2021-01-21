import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import store from './app/store';
import remoteConfig from '@react-native-firebase/remote-config';

// THEMES
import StartUp from './app/StartUp';

const App = () => {
  useEffect(() => {
    remoteConfig()
      .setDefaults({
        update: 'hello world',
      })
      .then(() => {
        console.log('Default values set.');
      });
  }, []);
  return (
    <Provider store={store}>
      <StartUp />
    </Provider>
  );
};

store.subscribe(() => {
  //console.log('Store Changed, ', store.getState());
});

export default App;
