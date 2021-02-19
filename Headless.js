import Geolocation from 'react-native-geolocation-service';
import {makeNetworkCalls} from './app/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from './app/api';

module.exports = async (taskData) => {
  const token = await AsyncStorage.getItem('x-auth-token');
  if (token) {
    //watch position and updates backend api with current status
    Geolocation.watchPosition(
      ({coords: {longitude, latitude}}) => {
        console.log('it has happened');
        makeNetworkCalls({
          url: api.location,
          headers: {
            'Content-type': 'application/json',
            'x-auth-token': token,
          },
          method: 'patch',
          data: {latitude, longitude},
        }).catch((err) => console.error(err));
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 20,
        fastestInterval: 30000,
        interval: 60000,
      },
    );
  }
};
