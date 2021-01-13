import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import {Surface, Subheading, Avatar, Caption, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeaterIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {colors} from '../../../theme';
import {Button, OutlineButton} from '../../Button';
import {deliveryAction, accountAction} from '../../../store/actions';
import {useNavigation} from '@react-navigation/native';
import CountDown from 'react-native-countdown-component';
import NotificationSounds, {
  playSampleSound,
} from 'react-native-notification-sounds';
import constants from '../../../utils/constants';

const {DEVICE_HEIGHT, DEVICE_WIDTH} = constants;

const Order = ({onAccept, onCountDownFinish, timerIsRunning, reset}) => {
  const dispatch = useDispatch();
  const {dark} = useSelector(({theme}) => theme);
  const {message, address} = useSelector(({account}) => account);
  //const {data} = message;
  const [images, setImages] = useState(false);

  const showImages = () => {
    setImages(!images);
  };
  return (
    <View style={classes.root}>
      <Surface style={classes.container}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Ionicon
            name="md-stopwatch"
            size={12}
            color={dark ? 'white' : 'black'}
          />
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
            running={timerIsRunning}
            onChange={() => {
              NotificationSounds.getNotifications('notification').then(
                (soundsList) => {
                  playSampleSound(soundsList[1]);
                },
              );
            }}
          />
        </View>

        <ScrollView>
          {message?.data?.orders?.map((v, i) => (
            <View key={i}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View
                  style={{
                    width: DEVICE_WIDTH * 0.76,
                    borderRadius: 10,
                    backgroundColor: dark ? '#474545' : '#072D8F',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                      }}>
                      <FeaterIcon
                        name="navigation"
                        size={8}
                        color={dark ? colors.grey.light : colors.grey.dark}
                      />
                      <Caption style={classes.orderContentAddressText}>
                        {message?.data?.pickupAddress}
                      </Caption>
                    </View>
                    <View style={classes.dash} />
                    <View style={classes.dash} />
                    <View style={classes.dash} />
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                      }}>
                      <FeaterIcon
                        name="navigation"
                        size={8}
                        color={dark ? colors.grey.light : colors.grey.dark}
                      />
                      <Caption style={classes.orderContentAddressText}>
                        {v?.deliveryAddress}
                      </Caption>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 8,
                }}>
                {message?.data?.paymentMethod !== 'card' && (
                  <View style={{marginVertical: 10}}>
                    <Caption
                      style={{
                        fontSize: 18,
                        color: colors.red.main,
                        marginBottom: -5,
                      }}>
                      {`₦${Math.round(v?.estimatedCost)}`}
                    </Caption>
                    <Caption
                      style={{fontSize: 8, color: dark ? 'white' : 'black'}}>
                      {`${message.data?.transaction?.paymentMethod !== 'cash' ? 'Paid' : 'Cash payment'}`}
                    </Caption>
                  </View>
                )}
                <View style={{marginVertical: 10}}>
                  <Caption
                    style={{
                      fontSize: 18,
                      color: dark ? 'white' : 'black',
                      textAlign: 'right',
                      marginBottom: -5,
                    }}>
                    {`${Math.ceil(v?.estimatedDistance)} km`}
                  </Caption>
                  <Caption
                    style={{fontSize: 8, color: dark ? 'white' : 'black'}}>
                    Estimated Delivery time:
                    <Caption
                      style={{
                        fontSize: 8,
                        color: colors.green.main,
                      }}>{`${Math.ceil(
                      v?.estimatedTravelduration,
                    )} min`}</Caption>
                  </Caption>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 8,
                }}>
                <Caption
                  style={{fontSize: 10, color: dark ? 'white' : 'black'}}>
                  Picking up order
                  <Caption style={{color: colors.red.main, fontSize: 10}}>
                    {`${v?.orderId}`}
                  </Caption>
                </Caption>
                <Caption onPress={showImages} style={{fontSize: 8}}>
                  Show images
                </Caption>
                {images && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      marginVertical: 10,
                      marginHorizontal: 8,
                    }}>
                    {images &&
                      message?.data?.img?.map((v, i) => (
                        <Card.Cover
                          source={{
                            uri: `https://df7sglzvhxylw.cloudfront.net/${v}`,
                          }}
                          style={classes.img}
                        />
                      ))}
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 15,
            marginHorizontal: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              {/* capitalizing the first text */}
            <Avatar.Text
              label={`${
                message?.data.name.indexOf(' ') !== -1
                  ? `${message?.data.name.charAt(0)}${message?.data.name.charAt(
                      message?.data.name.indexOf(' ') + 1,
                    )}`
                  : `${message?.data.name.charAt(0)}`
              }`}
              size={45}
              style={{}}
            />
            <View style={{padding: 5}}>
              <Caption
                style={{
                  fontSize: 18,
                  marginBottom: -5,
                  color: dark ? 'white' : 'black',
                }}>{`${message?.data.name}`}</Caption>
              <Caption
                style={{
                  fontSize: 10,
                  color: dark ? 'white' : 'black',
                }}>{`${message?.data.email}`}</Caption>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${message?.data.phoneNumber}`);
            }}>
            <FontAwesomeIcon
              name="phone"
              size={26}
              color={dark ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginVertical: 10,
          }}>
          <Button
            rootStyle={{backgroundColor: colors.green.main, width: 136, marginHorizontal: 5}}
            label="Accept"
            labelStyle={{fontSize: 14}}
            onPress={onAccept}
          />
          <OutlineButton
            outlineStyle={{
              width: 136,
              height: 52,
              borderColor: dark ? 'white' : colors.red.main,
            }}
            text="Cancel Order"
            textStyle={{
              fontSize: 14,
              textAlign: 'center',
              color: dark ? 'white' : colors.red.main,
            }}
            onPress={onCountDownFinish}
            containerStyle={{marginHorizontal: 5}}
          />
        </View>
      </Surface>
    </View>
  );
};

export default Order;

const TimeDistance = ({data, onFinish, running}) => {
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
        ]}>{`${Math.ceil(data?.TET)} mins`}</Caption>
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
        ]}>{`${Math.ceil(data?.TED)} km`}</Caption>
      {/* <CountDown
        until={120}
        timeToShow={['M', 'S']}
        onFinish={onFinish}
        digitStyle={{backgroundColor: 'transparent'}}
        style={{alignItems: 'center', justifyContent: 'center'}}
        timeLabels={{m: '', s: ''}}
        digitTxtStyle={{color: colors.red.main}}
        showSeparator
        separatorStyle={{color: colors.red.main}}
        running={running}
        onChange={() => {
          NotificationSounds.getNotifications('notification').then(
            (soundsList) => {
              playSampleSound(soundsList[1]);
            },
          );
        }}
      /> */}
    </View>
  );
};

const classes = StyleSheet.create({
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
  },
  orderRoot: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  orderContentRoot: {
    marginLeft: 10,
  },
  orderContentAddress: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  orderContentAddressText: {
    //marginLeft: 10,
    fontSize: 10,
    fontWeight: '400',
    color: 'white',
    textAlign: 'left',
  },
  dash: {
    height: 2,
    width: 4,
    borderRightWidth: 1,
    borderRightColor: colors.grey.main,
    marginVertical: 1.5,
    marginLeft: 20,
  },
  timeDistanceRoot: {
    height: 35,
    width: 200,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },
  hr: {
    height: 20,
    borderRightWidth: 1,
  },
  ButtonRoot: {
    backgroundColor: colors.green.main,
    marginVertical: 20,
  },
  productId: {
    color: colors.red.main,
  },
  productRoot: {
    alignItems: 'center',
    flexDirection: 'row',
    fontWeight: '300',
  },
  img: {
    width: 110,
    height: 90,
    marginRight: 5,
    borderRadius: 5,
  },
  imgRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  actionRoot: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginVertical: -10,
  },
  actionButtonRoot: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 9,
    fontWeight: '400',
    marginTop: -5,
  },
});
