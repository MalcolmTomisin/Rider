import React from 'react';
import {StyleSheet, View, TouchableOpacity, Linking} from 'react-native';
import {Surface, Subheading, Avatar, Caption, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeaterIcon from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {colors} from '../../../theme';
import {Button, OutlineButton} from '../../Button';
import {deliveryAction} from '../../../store/actions';
import constants from '../../../utils/constants';

const {DEVICE_HEIGHT, DEVICE_WIDTH} = constants;

const ConfirmPayment = () => {
  const dispatch = useDispatch();
  const {dark} = useSelector(({theme}) => theme);
  const {currentEntry, recievedPayment} = useSelector(({delivery}) => delivery);

  return (
    <View style={classes.root}>
      <Surface
        style={[
          classes.container,
          {backgroundColor: dark ? 'black' : 'white'},
        ]}>
        <View style={classes.actionRoot}>
          <Caption
            style={{
              color: dark ? 'white' : 'black',
              textAlign: 'center',
              fontSize: 14,
              marginBottom: 10,
            }}>
            Confirm payment
          </Caption>
          <View
            style={{
              height: 0.3,
              width: DEVICE_WIDTH * 0.75,
              backgroundColor: dark ? 'white' : '#131313',
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginVertical: 5,
          }}>
          <Caption style={{color: dark ? 'white' : 'black', fontSize: 10}}>
            Amount to receive
          </Caption>
          <Caption
            style={{
              fontSize: 18,
              color: colors.red.main,
            }}>{`₦${Math.ceil(currentEntry?.transaction?.amount)}`}</Caption>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            justifyContent: 'space-evenly',
          }}>
          <Button
            rootStyle={{
              backgroundColor: colors.green.main,
              width: 136,
              height: 40,
            }}
            label="Payment received"
            labelStyle={{fontSize: 10}}
            onPress={() => {
              dispatch(deliveryAction.setPaymentRecieved({recievedPayment: 1}));
            }}
          />
          <OutlineButton
            text="Payment not received"
            textStyle={{
              fontSize: 10,
              textAlign: 'center',
              color: dark ? 'white' : colors.red.main,
            }}
            outlineStyle={{
              borderColor: dark ? 'white' : colors.red.main,
              width: 136,
              height: 40,
            }}
            onPress={() => {
              dispatch(deliveryAction.setPaymentRecieved({recievedPayment: 0}));
            }}
          />
        </View>
      </Surface>
    </View>
  );
};

export default ConfirmPayment;

const classes = StyleSheet.create({
  root: {position: 'absolute', bottom: 0, paddingHorizontal: 20, width: '100%'},
  container: {
    paddingVertical: 16,
    //alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 1,
    paddingHorizontal: 20,
  },
  timeDistanceRoot: {
    height: 35,
    width: 230,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  hr: {
    height: 20,
    borderRightWidth: 1,
  },
  ButtonRoot: {
    backgroundColor: colors.green.main,
    marginVertical: 20,
  },
  Button: {
    // color: colors.green.main,
  },
  productId: {
    color: colors.red.main,
  },
  productRoot: {
    backgroundColor: colors.red.main,
    marginVertical: 20,
  },
  actionRoot: {
    //justifyContent: 'space-between',
    //alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  actionButtonRoot: {
    justifyContent: 'center',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arriveButton: {
    fontSize: 15,
  },
});
