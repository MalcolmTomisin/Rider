import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import constants from '../utils/constants';
const img = {
  setupBG: require('../assets/images/rider-bg.png'),
  securityImg: require('../assets/images/security.png'),
  emptyAccount: require('../assets/images/empty_account.png'),
  basketIcon: require('../assets/images/ic_basket.png'),
};

export function BasketIcon({onPress}) {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        left: constants.DEVICE_WIDTH / 2 - 28,
        bottom: 0,
        marginBottom: 18,
      }}
      onPress={onPress}>
      <Image source={img.basketIcon} style={{height: 55, width: 55}} />
    </TouchableOpacity>
  );
}

export default img;
