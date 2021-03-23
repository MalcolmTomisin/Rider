import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {colors} from '../../../theme';
import {cloudURL} from '../../../api';
import {Surface, Subheading, Avatar, Caption, Card} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeaterIcon from 'react-native-vector-icons/Feather';
import {Button, OutlineButton} from '../../Button';
import constants from '../../../utils/constants';
import PhoneIcon from '../../svg/PhoneIcon';
const {DEVICE_HEIGHT, DEVICE_WIDTH} = constants;

const PickUp = ({message, dark, onCountDownFinish, onAccept}) => (
  <View style={styles.tabRouteContainers}>
    <Text style={styles.headerText}>Pickup location</Text>
    <View style={styles.bar}>
      <View
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <FeaterIcon
          name="navigation"
          size={8}
          color={colors.white}
          style={{marginRight: 15}}
        />
        <Caption numberOfLines={1} style={styles.orderContentAddressText}>
          Man runs mad in 2020
        </Caption>
      </View>
    </View>
    <View style={styles.profileRow}>
      <View style={styles.row_sb}>
        {/* capitalizing the first text */}
        <Avatar.Text
          label={`${
            message?.data?.name?.indexOf(' ') !== -1
              ? `${message?.data?.name?.charAt(0)}${message?.data?.name?.charAt(
                  message?.data?.name.indexOf(' ') + 1,
                )}`
              : `${message?.data?.name.charAt(0)}`
          }`}
          size={45}
          style={{marginRight: 10}}
        />
        <View style={{padding: 5}}>
          <Caption
            style={[
              styles.profile_name,
              {color: dark ? 'white' : 'black'},
            ]}>{`${message?.data.name}`}</Caption>
          <Caption
            style={{
              fontSize: 10,
              color: dark ? 'white' : 'black',
              fontFamily: 'Manrope-Light',
            }}>{`${message?.data.email}`}</Caption>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`tel:${message?.data.phoneNumber}`);
        }}>
        <PhoneIcon style={{marginRight: 4}} />
      </TouchableOpacity>
    </View>
    <View style={styles.row_se}>
      <Button
        rootStyle={styles.button}
        label="Accept"
        labelStyle={{fontSize: 10, fontFamily: 'Manrope-Light'}}
        //onPress={onAccept}
      />
      <OutlineButton
        outlineStyle={[
          styles.outlineButton,
          {borderColor: dark ? 'white' : colors.red.main},
        ]}
        text="Cancel Order"
        textStyle={[
          styles.outlineButtonText,
          {color: dark ? 'white' : colors.red.main},
        ]}
        //onPress={onCountDownFinish}
        containerStyle={{marginHorizontal: 5}}
      />
    </View>
  </View>
);

const Delivery = () => <View style={{}} />;

const Amount = () => <View style={{}} />;

const Order = ({onAccept, onCountDownFinish, timerIsRunning, reset}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  const renderTabBar = (props) => (
    <TabBar
      
    />
  );

  const renderScene = SceneMap({
    first: PickUp,
    second: Delivery,
  });
  return (
    <View style={styles.root}>
      <Surface style={styles.container}>
        <TabView
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
          style={{flex: 1, elevation: 3}}
        />
      </Surface>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    lineHeight: 19.12,
    marginVertical: 20,
    marginLeft: 10,
  },
  bar: {
    backgroundColor: colors.blue.secondary,
    marginHorizontal: 8,
    borderRadius: 10,
    height: 49,
    width: '95%',
    marginBottom: 43,
    justifyContent: 'center',
    //alignItems: 'center'
  },
  tabRouteContainers: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  row_sb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profile_name: {
    fontSize: 18,
    marginBottom: -10,
    fontFamily: 'Manrope-Bold',
    lineHeight: 24.59,
  },
  row_se: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  button: {
    backgroundColor: colors.green.main,
    width: 136,
    marginHorizontal: 5,
    height: 40,
  },
  outlineButton: {
    width: 136,
    height: 40,
  },
  outlineButtonText: {
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'Manrope-Light',
  },
  root: {
    position: 'absolute',
    bottom: DEVICE_HEIGHT * 0.3,
    paddingHorizontal: 20,
    width: '100%',
    height: DEVICE_HEIGHT * 0.53,
  },
  container: {
    paddingVertical: 10,
    //alignItems: 'center',
    // flexDirection: 'row',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 1,
    paddingHorizontal: 20,
    flex: 1,
  },
  orderContentAddressText: {
    fontSize: 10,
    fontWeight: '400',
    color: 'white',
    textAlign: 'left',
    marginRight: 5,
    fontFamily: 'Manrope-Regular',
  },
});
