import React from 'react';
import {View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Surface, Subheading} from 'react-native-paper';
import {Button} from '../../Button';
import {colors} from '../../../theme';
import {api} from '../../../api';
import {
  accountAction,
  deliveryAction,
  feedbackAction,
} from '../../../store/actions';
import {makeNetworkCalls, callBasket} from '../../../utils';

const ConfirmDialog = ({navigation}) => {
  const dispatch = useDispatch();
  const {recievedPayment, currentEntry, currentIndex} = useSelector(
    ({delivery}) => delivery,
  );
  const {loading, token} = useSelector(({account}) => account);
  const {dark} = useSelector(({theme}) => theme);
  const handlePayment = () => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    makeNetworkCalls({
      url: api.cashPayment,
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token,
      },
      data: {
        status: recievedPayment === 1 ? 'approved' : 'declined',
        entry: currentEntry?.entry?._id,
      },
    })
      .then(async (res) => {
        await callBasket(api.riderBasket, token, dispatch, currentIndex);
        const {msg} = res.data;
        if (recievedPayment === 0) {
          dispatch(accountAction.setOrder({message: null}));
          dispatch(
            deliveryAction.setCurrentPickupInfo({
              currentEntry: null,
              currentIndex: null,
            }),
          );
        }
        dispatch(
          deliveryAction.setPaymentRecieved({
            recievedPayment: null,
            cashPaid: recievedPayment !== 0 ? true : false,
          }),
        );
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        if (recievedPayment !== 0) {
          navigation('ConfirmPickupCode');
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          feedbackAction.launch({open: true, severity: 'w', msg: `${err}`}),
        );
      })
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
      });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={recievedPayment === 1 || recievedPayment === 0}>
      <View
        style={[
          classes.container,
          {backgroundColor: dark ? 'rgba(0,0,0,0.5)' : 'rgba(225,225,225,0.5)'},
        ]}>
        <Surface style={classes.surface}>
          <Subheading style={classes.message}>Proceed ?</Subheading>

          <Button
            label="Yes, Proceed"
            rootStyle={classes.cancel}
            onPress={handlePayment}
          />

          <TouchableOpacity
            onPress={() => {
              dispatch(
                deliveryAction.setPaymentRecieved({recievedPayment: null}),
              );
            }}>
            <Subheading style={classes.dontCancel}>
              No, don’t proceed
            </Subheading>
          </TouchableOpacity>
        </Surface>
      </View>
    </Modal>
  );
};

export default ConfirmDialog;

const classes = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dontCancel: {
    color: colors.red.main,
    marginBottom: 30,
    marginTop: 10,
  },
  cancel: {
    marginVertical: 10,
  },
  message: {
    marginVertical: 10,
  },
});
