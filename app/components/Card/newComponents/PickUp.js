import React from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import constants from '../../../utils/constants';
import {Avatar} from 'react-native-paper';
import Phone from '../../svg/PhoneOutline';
import Info from '../../svg/Info';
import MapPin from '../../svg/MapPin';
import {Button} from '../../Button';
import {colors} from '../../../theme';
import {useSelector} from 'react-redux';
import {openGoogleMapsIntent} from '../../../utils';

export default function PickUp({confirmArrival, showNote}) {
  const {currentEntry} = useSelector(({delivery}) => delivery);
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

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={[styles.text, {color: '#474545', textAlign: 'left'}]}>
          Pickup Information
        </Text>
        <Text style={[styles.text, {color: '#FF0000', textAlign: 'right'}]}>
          1h, 3ms away
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 30,
        }}>
        <View style={styles.row_item}>
          <View style={[styles.circle, {backgroundColor: '#FF0000'}]} />
          <Text style={styles.tinyText}>You</Text>
        </View>
        <View style={styles.row_item}>
          <View style={[styles.circle, {backgroundColor: '#072D8F'}]} />
          <Text style={styles.tinyText}>Pickup Location</Text>
        </View>
        <View style={styles.row_item}>
          <View style={[styles.circle, {backgroundColor: '#0BD236'}]} />
          <Text style={styles.tinyText}>Delivery location</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 34,
          alignItems: 'center',
        }}>
        <Avatar.Image
          size={40}
          source={require('../../../assets/images/rider-bg.png')}
        />
        <View style={{}}>
          <Text
            style={{
              textAlign: 'left',
              fontFamily: 'Manrope-Bold',
              fontSize: 18,
              color: 'black',
              lineHeight: 24.59,
            }}>
            Malcolm Tomisin
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontFamily: 'Manrope-Light',
              fontSize: 10,
              color: '#000000',
              lineHeight: 13.66,
            }}>
            malcolmtomisin@gmail.com
          </Text>
        </View>
        <Phone
          onPress={() => {
            console.log('currentEntry1', currentEntry);
            Linking.openURL(
              `tel:+${currentEntry.countryCode}${currentEntry.entry?.phoneNumber}`,
            );
          }}
        />
        <MapPin onPress={() =>
                openGoogleMapsIntent(
                  currentEntry.pickupLatitude,
                  currentEntry.pickupLongitude,
                )} />
        <Info onPress={showNote} />
      </View>
      <Button
        style={styles.button}
        label="Confirm Arrival"
        labelStyle={{fontSize: 18, fontFamily: 'Manrope-Bold'}}
        rootStyle={{backgroundColor: colors.green.main}}
        onPress={confirmArrival}
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
    bottom: 20,
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
