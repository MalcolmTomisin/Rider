import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default {
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height,
};
