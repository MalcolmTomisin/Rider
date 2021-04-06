import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {colors} from '../../../theme';
import {cloudURL} from '../../../api';
import {Surface, Subheading, Avatar, Caption, Card} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeaterIcon from 'react-native-vector-icons/Feather';
import {Button, OutlineButton} from '../../Button';
import constants from '../../../utils/constants';
import PhoneIcon from '../../svg/PhoneIcon';
import CreditCard from '../../svg/CreditCard';
import DeliveryIcon from '../../svg/DeliveryIcon';
import PickupIcon from '../../svg/PickupIcon';
import MarkerOutline from '../../svg/DeliveryIconOutline';
import CountDown from 'react-native-countdown-component';
import Stopwatch from '../../svg/Stopwatch';
import {useSelector, useDispatch} from 'react-redux';
import NotificationSounds, {
  playSampleSound,
  stopSampleSound,
} from 'react-native-notification-sounds';

const {DEVICE_HEIGHT, DEVICE_WIDTH} = constants;

const PickUp = ({message, dark, onCountDownFinish, onAccept}) => (
  <View style={styles.tabRouteContainers}>
    <Text style={styles.headerText}>Pickup location</Text>
    <View style={styles.bar}>
      <View style={styles.addressBar}>
        <FeaterIcon
          name="navigation"
          size={8}
          color={colors.white}
          style={{marginRight: 15}}
        />
        <Caption numberOfLines={1} style={styles.orderContentAddressText}>
          {message?.data?.pickupAddress}
        </Caption>
      </View>
    </View>
  </View>
);

const Delivery = ({message}) => (
  <View style={{flex: 1}}>
    <Text style={styles.headerText}>Delivery location(s)</Text>
    <ScrollView contentContainerStyle={{maxHeight: constants.DEVICE_WIDTH * 0.347}}>
    {message?.data?.orders.map((v, i) => (
      <View
        key={i}
        style={{
          height: 104,
          backgroundColor: '#1E9B0E',
          borderRadius: 10,
          justifyContent: 'space-evenly',
          marginBottom: 20,
        }}>
        <View style={styles.addressBar}>
          <MarkerOutline style={{marginRight: 15}} />
          <Caption numberOfLines={1} style={styles.orderContentAddressText}>
            {v?.deliveryAddress}
          </Caption>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{marginLeft: 20, justifyContent: 'space-evenly'}}>
            <Text style={styles.largeText}>{v?.name}</Text>
            <Text style={styles.smallText}>Cash on Pickup</Text>
          </View>
          <View style={{marginRight: 19}}>
            <Text style={[styles.largeText, {textAlign: 'right'}]}>
              {v?.estimatedDistance}
            </Text>
            <Text style={[styles.smallText, {textAlign: 'right'}]}>
              Order ID:
              <Text
                style={{
                  fontFamily: 'Manrope-Bold',
                  fontSize: 8,
                  color: colors.white,
                }}>
                {' '}
                {v?.orderId}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    ))}
    </ScrollView>
  </View>
);

const Amount = ({message}) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      message?.data?.orders.reduce(
        (acc, curr) => acc + Math.round(curr?.estimatedCost),
        0,
      ),
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text style={styles.headerText}>Amount</Text>
      {message?.data?.orders?.map((v, i) => (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 10,
            }}>
            <View style={{paddingVertical: 5, justifyContent: 'space-between'}}>
              <Text style={{fontFamily: 'Manrope-Light', fontSize: 8}}>
                orderID:{' '}
                <Text
                  style={{
                    fontFamily: 'Manrope-Bold',
                    fontSize: 8,
                    color: colors.red.main,
                  }}>
                  {v.orderId}
                </Text>
              </Text>
              <Text style={{fontFamily: 'Manrope-Light', fontSize: 8}}>
                Cash on Pickup
              </Text>
            </View>

            <Text style={styles.boldPrice}>{`₦${Math.round(
              v?.estimatedCost,
            )}`}</Text>
          </View>
          <View
            style={{
              height: 0.5,
              backgroundColor: colors.red.main,
              marginLeft: 10,
              marginVertical: 8,
            }}
          />
        </>
      ))}

      <View style={{alignSelf: 'flex-end', marginTop: 7}}>
        <Text
          style={{
            fontSize: 10,
            fontFamily: 'Manrope-Light',
            textAlign: 'right',
          }}>
          Total
        </Text>
        <Text style={[styles.boldPrice, {textAlign: 'right'}]}>
          ₦ {`${total}`}
        </Text>
      </View>
    </View>
  );
};

const Order = ({
  onAccept,
  onCountDownFinish,
  timerIsRunning,
  reset,
  message,
  dark,
  stopSound,
}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Pickup'},
    {key: 'second', title: 'Delivery'},
    {key: 'third', title: 'Amount'},
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderIcon={({route, focused, color}) => {
        switch (route.title) {
          case 'Pickup':
            return <PickupIcon />;
          case 'Delivery':
            return <DeliveryIcon />;
          case 'Amount':
            return <CreditCard />;
          default:
            return null;
        }
      }}
      renderLabel={({route, focused, color}) => {
        console.log('title', route);
        switch (route?.title) {
          case 'Pickup':
            if (focused) {
              return (
                <Text style={[styles.tabText, {color: colors.blue.secondary}]}>
                  {route?.title}
                </Text>
              );
            }
            return <Text style={[styles.tabText]}>{route.title}</Text>;
          case 'Delivery':
            if (focused) {
              return (
                <Text style={[styles.tabText, {color: colors.green.main}]}>
                  {route?.title}
                </Text>
              );
            }
            return <Text style={[styles.tabText]}>{route.title}</Text>;
          case 'Amount':
            if (focused) {
              return (
                <Text style={[styles.tabText, {color: colors.red.main}]}>
                  {route?.title}
                </Text>
              );
            }
            return <Text style={[styles.tabText]}>{route?.title}</Text>;
          default:
            return null;
        }
      }}
      renderIndicator={({route}) => {
        console.log('title', route);
        switch (route?.title) {
          case 'Pickup':
            return (
              <View
                style={{
                  ...styles.indicator,
                  backgroundColor: colors.blue.secondary,
                }}
              />
            );
          case 'Delivery':
            return (
              <View
                style={{
                  ...styles.indicator,
                  backgroundColor: colors.green.main,
                }}
              />
            );
          case 'Amount':
            return (
              <View
                style={{
                  ...styles.indicator,
                  backgroundColor: colors.red.main,
                }}
              />
            );
        }
      }}
      tabStyle={{flexDirection: 'row', justifyContent: 'space-evenly'}}
      style={{backgroundColor: colors.white, elevation: 0}}
    />
  );

  // const renderScene = SceneMap({
  //   first: PickUp,
  //   second: Delivery,
  //   third: Amount,
  // });

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <PickUp message={message} />;
      case 'second':
        return <Delivery message={message} />;
      case 'third':
        return <Amount message={message} />;
    }
  };

  return (
    <View style={styles.root}>
      <Surface style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            //marginVertical: 10,
          }}>
          <Stopwatch />
          <CountDown
            id={reset}
            until={120}
            timeToShow={['M', 'S']}
            onFinish={onCountDownFinish}
            digitStyle={{backgroundColor: 'transparent'}}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -10,
            }}
            timeLabels={{m: '', s: ''}}
            digitTxtStyle={{color: colors.red.main, fontSize: 18}}
            showSeparator
            separatorStyle={{color: colors.red.main}}
            //running={timerIsRunning}
            onChange={() => {
              NotificationSounds.getNotifications(
                constants.IS_ANDROID ? 'ringtone' : 'ringtone',
              ).then((soundsList) => {
                playSampleSound(soundsList[1]);
                if (stopSound) {
                  stopSampleSound();
                }
              });
            }}
          />
        </View>
        <TabView
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
          style={{flex: 1, overflow: 'hidden'}}
          renderTabBar={renderTabBar}
          sceneContainerStyle={{marginHorizontal: 20}}
        />
        <View>
          <View style={styles.profileRow}>
            <View style={styles.row_sb}>
              {/* capitalizing the first text */}
              <Avatar.Text
                label={`${
                  message?.data?.name?.indexOf(' ') !== -1
                    ? `${message?.data?.name?.charAt(
                        0,
                      )}${message?.data?.name?.charAt(
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
        </View>
        <View style={styles.row_se}>
          <Button
            rootStyle={styles.button}
            label="Accept"
            labelStyle={{fontSize: 10, fontFamily: 'Manrope-Light'}}
            onPress={onAccept}
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
            onPress={onCountDownFinish}
            containerStyle={{marginHorizontal: 5}}
          />
        </View>
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
    paddingLeft: 15,
    paddingRight: 12,
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
    bottom: DEVICE_HEIGHT * 0.1,
    paddingHorizontal: 20,
    width: '100%',
  },
  container: {
    paddingVertical: 10,
    //alignItems: 'center',
    // flexDirection: 'row',
    borderRadius: 25,
    elevation: 1,
    //paddingHorizontal: 20,
    flex: 1,
    overflow: 'hidden',
  },
  orderContentAddressText: {
    fontSize: 10,
    fontWeight: '400',
    color: 'white',
    textAlign: 'left',
    marginRight: 5,
    fontFamily: 'Manrope-Regular',
  },
  tabText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 10,
  },
  indicator: {
    width: 64,
    height: 1,
  },
  addressBar: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  largeText: {
    fontFamily: 'Manrope-Bold',
    color: colors.white,
    fontSize: 16,
    lineHeight: 22,
  },
  smallText: {
    fontFamily: 'Manrope-Light',
    fontSize: 8,
    color: colors.white,
  },
  boldPrice: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    lineHeight: 24.59,
    color: colors.red.main,
  },
});
