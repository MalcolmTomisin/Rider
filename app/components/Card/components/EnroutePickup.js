import React from 'react';
import {StyleSheet, View, TouchableOpacity, Linking} from 'react-native';
import {Surface, Subheading, Avatar, Caption, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeaterIcon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {colors} from '../../../theme';
import {Button} from '../../Button';
import {openGoogleMapsIntent} from '../../../utils';

const EnroutePickup = ({onPress, error}) => {
  const {dark} = useSelector(({theme}) => theme);
  const {currentEntry} = useSelector(({delivery}) => delivery);

  return (
    <View style={classes.root}>
      <Surface style={classes.container}>
        <View style={classes.actionRoot}>
          <View style={classes.item}>
            <Icon
              name="chevron-down"
              size={20}
              color={dark ? colors.grey.light : colors.grey.dark}
            />
            <TimeDistance entryInfo={currentEntry?.entry} />
          </View>

          <View style={classes.item}>
            <TouchableOpacity
              style={classes.actionButtonRoot}
              onPress={() => {
                console.log('currentEntry0', currentEntry);
                Linking.openURL(
                  `tel:+${currentEntry.countryCode}${currentEntry.entry?.phoneNumber}`,
                );
              }}>
              <FeaterIcon
                name="phone-call"
                size={30}
                color={dark ? colors.grey.light : colors.grey.dark}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={classes.actionButtonRoot}
              onPress={() =>
                openGoogleMapsIntent(
                  currentEntry.pickupLatitude,
                  currentEntry.pickupLongitude,
                )
              }>
              <FeaterIcon
                name="map-pin"
                size={30}
                color={dark ? colors.grey.light : colors.grey.dark}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Button
          label="Enroute to Pickup"
          rootStyle={classes.ButtonRoot}
          labelStyle={classes.Button}
          onPress={onPress}
          error={error}
        />

        <View style={classes.productRoot}>
          <Caption>Picking up </Caption>
          <TouchableOpacity>
            <Caption
              style={
                classes.productId
              }>{`package ${currentEntry?.orderId}`}</Caption>
          </TouchableOpacity>
        </View>
      </Surface>
    </View>
  );
};

export default EnroutePickup;

const TimeDistance = ({entryInfo}) => {
  const {dark} = useSelector(({theme}) => theme);
  return (
    <View
      style={[
        classes.timeDistanceRoot,
        {backgroundColor: dark ? colors.white : colors.black},
      ]}>
      <Caption
        style={[
          classes.timeDistanceText,
          {color: dark ? colors.black : colors.white},
        ]}>
        {`${Math.ceil(entryInfo?.TET)} min`}
      </Caption>
      <View
        style={[
          classes.hr,
          {borderRightColor: dark ? colors.grey.main : colors.grey.light},
        ]}
      />
      <Caption
        style={[
          classes.timeDistanceText,
          {color: dark ? colors.black : colors.white},
        ]}>
        {`${Math.ceil(entryInfo?.TED)} km`}
      </Caption>
    </View>
  );
};

const classes = StyleSheet.create({
  root: {position: 'absolute', bottom: 0, paddingHorizontal: 20, width: '100%'},
  container: {
    paddingVertical: 16,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 1,
    paddingHorizontal: 20,
  },
  timeDistanceRoot: {
    height: 35,
    width: 130,
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
    backgroundColor: colors.green.light,
    marginVertical: 20,
  },
  Button: {
    color: colors.green.main,
  },
  productId: {
    color: colors.red.main,
  },
  productRoot: {
    alignItems: 'center',
    flexDirection: 'row',
    fontWeight: '300',
  },
  actionRoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
});
