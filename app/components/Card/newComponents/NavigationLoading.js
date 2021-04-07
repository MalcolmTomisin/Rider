import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavigationLoadinIcon from '../../svg/NavigationLoading';
import constants from '../../../utils/constants';

export default function NavigationLoading(props) {
  return (
    <View style={styles.card}>
      <View
        style={{
          height: 1.5,
          width: 44,
          marginVertical: 21,
          backgroundColor: '#474545',
        }}
      />
      <NavigationLoadinIcon />
      <Text
        style={{
          fontFamily: 'Manrope-Bold',
          fontSize: 16,
          lineHeight: 21.68,
          color: '#474545',
          textAlign: 'center',
          marginTop: 30,
        }}>
        You accepted the order and we are routing you to the pickup location
        please be patient.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: constants.DEVICE_WIDTH,
    height: 263,
    backgroundColor: 'white',
    zIndex: 4,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    elevation: 4,
  },
});
