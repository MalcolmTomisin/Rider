import React from 'react';
import {Modal} from 'react-native-paper';
import {View, Text, StyleSheet} from 'react-native';
import {Button, OutlineButton} from '../../Button';
import {colors} from '../../../theme';
import constants from '../../../utils/constants';

export function Note({showNotes, riderNote, dismiss}) {
  return (
    <Modal
      visible={showNotes}
      onDismiss={dismiss}
      contentContainerStyle={{
        backgroundColor: colors.white,
        borderRadius: 20,
        marginHorizontal: 20,
      }}>
      <Text style={styles.headerText}>Notes</Text>
      <Text style={[styles.bodyText, {marginBottom: 48, marginHorizontal: 30}]}>
        {riderNote}
      </Text>
    </Modal>
  );
}

export function ArrivalDialog({showArrival, arrived, notArrived}) {
  return (
    <Modal
      visible={showArrival}
      contentContainerStyle={{
        backgroundColor: colors.white,
        borderRadius: 20,
        marginHorizontal: 20,
      }}>
      <Text style={styles.headerText}>Are you sure you have arrived?</Text>
      <Text
        style={[
          styles.bodyText,
          {
            textAlign: 'center',
            width: constants.DEVICE_WIDTH * 0.581,
            marginHorizontal: 50,
            marginBottom: 30,
          },
        ]}>
        Please confirm that you are at the pickup location.
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 49,
          paddingHorizontal: 24,
        }}>
        <Button
          label="Yes"
          labelStyle={{fontFamily: 'Manrope-Bold', fontSize: 10}}
          rootStyle={{
            backgroundColor: colors.green.main,
            width: constants.DEVICE_WIDTH * 0.363,
            height: 40,
          }}
          onPress={arrived}
        />
        <OutlineButton
          containerStyle={{width: constants.DEVICE_WIDTH * 0.363, height: 40}}
          outlineStyle={{height: 40, borderColor: colors.red.main}}
          text="No"
          textStyle={[
            styles.buttonText,
            {color: colors.red.main, textAlign: 'center'},
          ]}
          onPress={notArrived}
        />
      </View>
    </Modal>
  );
}

export function PaymentDialog({showPayment, paid, notPaid, price, name}) {
  return (
    <Modal
      visible={showPayment}
      contentContainerStyle={{
        backgroundColor: colors.white,
        borderRadius: 20,
        marginHorizontal: 20,
      }}>
      <Text style={styles.headerText}>Confirm payment</Text>
      <Text
        style={[
          styles.bodyText,
          {
            textAlign: 'center',
            marginHorizontal: 50,
            marginBottom: 30,
          },
        ]}>
        Please confirm that you have received{' '}
        <Text style={styles.importantText}>₦ {`${price}`}</Text> from{' '}
        <Text style={styles.importantText}>{`${name}`}</Text>
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 49,
          paddingHorizontal: 24,
        }}>
        <Button
          label="Yes"
          labelStyle={{fontFamily: 'Manrope-Bold', fontSize: 10}}
          rootStyle={{
            backgroundColor: colors.green.main,
            width: constants.DEVICE_WIDTH * 0.363,
            height: 40,
          }}
          onPress={paid}
        />
        <OutlineButton
          containerStyle={{width: constants.DEVICE_WIDTH * 0.363, height: 40}}
          outlineStyle={{height: 40, borderColor: colors.red.main}}
          text="No"
          textStyle={[
            styles.buttonText,
            {color: colors.red.main, textAlign: 'center'},
          ]}
          onPress={notPaid}
        />
      </View>
    </Modal>
  );
}

export function PickupOrder({pickup, addToBasket, showpickup}) {
  return (
    <Modal
      visible={showpickup}
      contentContainerStyle={{
        backgroundColor: colors.white,
        borderRadius: 20,
        marginHorizontal: 20,
      }}>
      <Text
        style={{
          fontFamily: 'Manrope-Bold',
          fontSize: 18,
          marginTop: 49,
          textAlign: 'center',
        }}>
        You have accepted the order
      </Text>
      <Text
        style={{
          fontFamily: 'Manrope-Regular',
          fontSize: 12,
          marginVertical: 15,
          textAlign: 'center',
        }}>
        Choose your next action
      </Text>
      <View style={{alignItems: 'center', paddingHorizontal: 25}}>
        <Button
          label="Start delivery now"
          labelStyle={{fontFamily: 'Manrope-Bold', fontSize: 12}}
          rootStyle={{
            borderRadius: 6,
            backgroundColor: colors.green.main,
            marginBottom: 15,
          }}
          onPress={pickup}
        />
        <Button
          label="Add to your pending orders"
          labelStyle={{fontFamily: 'Manrope-Bold', fontSize: 12}}
          rootStyle={{
            borderRadius: 6,
            backgroundColor: colors.red.main,
            marginBottom: 25,
          }}
          onPress={addToBasket}
        />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 20,
  },
  headerText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: '#131313',
    marginTop: 49,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 12,
    fontFamily: 'Manrope-Light',
    textAlign: 'justify',
    marginTop: 15,
  },
  buttonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
  },
  importantText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: colors.red.main,
  },
});
