import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');

var month = new Array();
month[0] = 'January';
month[1] = 'February';
month[2] = 'March';
month[3] = 'April';
month[4] = 'May';
month[5] = 'June';
month[6] = 'July';
month[7] = 'August';
month[8] = 'September';
month[9] = 'October';
month[10] = 'November';
month[11] = 'December';

export default {
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height,
  IS_IOS: Platform.OS === 'ios',
  IS_ANDROID: Platform.OS === 'android',
  GOOGLE_MAPS_APIKEY: 'AIzaSyCiOd5vESI31DmPFd6e7QVRVMTX43sm_Ic',
  PICK_UP: 'enrouteToPickup',
  month,
};
