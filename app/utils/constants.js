import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');

export default {
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height,
  IS_IOS: Platform.OS === 'ios',
  IS_ANDROID: Platform.OS === 'android',
  GOOGLE_MAPS_APIKEY: 'AIzaSyCiOd5vESI31DmPFd6e7QVRVMTX43sm_Ic',
};
