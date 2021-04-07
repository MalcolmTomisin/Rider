import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import constants from '../../../utils/constants';
import {Button} from '../../Button';
import {colors} from '../../../theme';
import OTPTextInput from 'react-native-otp-textinput';
import {useSelector, useDispatch} from 'react-redux';
import {api} from '../../../api';
import {accountAction, feedbackAction, deliveryAction} from '../../../store/actions';
import {makeNetworkCalls} from '../../../utils';

export default function DeliveryConfirm({pop, push}) {
    const {token} = useSelector(({account}) => account);
  const {currentEntry} = useSelector(({delivery}) => delivery);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');

  const handleTextChange = (value) => {
    setValue(value);
  };

  const submit = () => {
    if (value.length < 4) {
      return;
    }
    dispatch(accountAction.setLoadingStatus({loading: true}));
    makeNetworkCalls({
      url: api.confirmDelivery,
      method: 'post',
      headers: {
        'x-auth-token': token,
        'Content-type': 'application/json',
      },
      data: {
        order: currentEntry._id,
        OTPCode: value,
      },
    })
      .then((res) => {
        const {msg} = res.data;
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        dispatch(
          deliveryAction.setRatingDetails({ratingDetails: currentEntry}),
        );
        dispatch(deliveryAction.setCurrentPickupInfo({currentEntry: null}));
        pop();
        push('OrderPool');
      })
      .catch((err) => {
        if (err.response) {
          const {msg} = err.response.data;
          dispatch(
            feedbackAction.launch({
              open: true,
              severity: 'w',
              msg,
            }),
          );
          return;
        }
        console.error(err);
        dispatch(
          feedbackAction.launch({
            open: true,
            severity: 'w',
            msg: `${err}`,
          }),
        );
      })
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
      });
  };

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
          Enter Delivery Code
        </Text>
      </View>
      <Text
        style={{
          fontFamily: 'Manrope-Regular',
          fontSize: 12,
          textAlign: 'center',
          marginTop: 14,
          color: '#474545',
        }}>
        Provide the delivery code to complete the order process.{' '}
      </Text>
      <View style={{
        justifyContent: 'center', alignItems: 'center'
      }}>
        <OTPTextInput
        handleTextChange={handleTextChange}
        tintColor={colors.red.main}
        textInputStyle={[styles.textStyle, {color: colors.black}]}
      />
      </View>
      
      <Button
        style={styles.button}
        label="Submit"
        labelStyle={{fontSize: 14, fontFamily: 'Manrope-Bold'}}
        rootStyle={{backgroundColor: colors.green.main}}
        onPress={submit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: constants.DEVICE_WIDTH,
    height: 263,
    backgroundColor: 'white',
    zIndex: 2,
    position: 'absolute',
    left: 0,
    bottom: 0,
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
  textStyle: {
    fontSize: 70,
    marginVertical: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    textAlign: 'center',
    width: 70,
    height: 90,
    fontWeight: '500',
  },
});
