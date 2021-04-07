import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import constants from '../../../utils/constants';
import {Button} from '../../Button';
import {colors} from '../../../theme';

export default function CashConfirm({confirm, price, name}) {
  return (
    <View style={styles.card}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            height: 1.5,
            width: 44,
            marginVertical: 15,
            backgroundColor: '#474545',
          }}
        />
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={[styles.text, {color: '#474545', textAlign: 'center'}]}>
          Pickup Information
        </Text>
      </View>
      <Text
        style={{
          marginTop: 14,
          fontFamily: 'Manrope-Regular',
          fontSize: 12,
          marginBottom: 35,
          color: '#474545',
        }}>
        {`${name}`} need to pay you cash before you can pickup the order.{' '}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 30,
        }}>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 10,
            fontFamily: 'Manrope-Light',
          }}>
          Amount to receive
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Manrope-Bold',
            color: colors.red.main,
          }}>
          ₦ {`${price}`}
        </Text>
      </View>
      <Button
        style={styles.button}
        label="Confirm cash payment"
        labelStyle={{fontSize: 18, fontFamily: 'Manrope-Bold'}}
        rootStyle={{backgroundColor: colors.green.main}}
        onPress={confirm}
      />
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
    bottom: 10,
    right: 0,
    //justifyContent: 'center',
    //alignItems: 'center',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    elevation: 4,
    paddingHorizontal: 30,
  },
  text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    lineHeight: 21.86,
  },
  row_item: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  circle: {width: 11, borderRadius: 11, height: 11, marginRight: 10},
  button: {
    backgroundColor: colors.green.main,
    height: 52,
  },
  tinyText: {fontSize: 10, fontFamily: 'Manrope-Regular', color: '#474545'},
});
