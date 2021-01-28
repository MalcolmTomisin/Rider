import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Surface, Subheading, Caption, Paragraph} from 'react-native-paper';
import {colors} from '../../../theme';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {openGoogleMapsIntent} from '../../../utils';
import Clipboard from '@react-native-community/clipboard';
import {feedbackAction} from '../../../store/actions';

const Task = ({
  pickUpAddress,
  deliveryAddress,
  estimatedCost,
  id,
  pickUpAction,
  status,
  serial,
  orderInfo,
}) => {
  const {dark} = useSelector(({theme}) => theme);
  const {buttonIconLoading} = useSelector(({account}) => account);
  const hr = {borderBottomColor: dark ? colors.hr.dark : colors.hr.light};
  const dispatch = useDispatch();

  // const renderOrders = orders => {
  //   return orders.map((v,i) => (

  //   ))
  // }
  return (
    <Surface style={[classes.root]}>
      <View style={[classes.headerRoot, hr]}>
        <View style={{marginLeft: -4}}>
          <Subheading>{`${
            orderInfo?.pickupType !== 'anytime' ? 'Instant Pickup' :
            status !== 'completed' && status !== 'cancelled'
              ? 'Ready to Deliver!'
              : status === 'cancelled'
              ? 'Cancelled'
              : 'Delivered'
          }`}</Subheading>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <Caption style={classes.content}>{id}</Caption>
          <Icon name="copy" color={dark ? colors.white : colors.grey.dark} size={20} 
          onPress={async () => {
            Clipboard.setString(id)
            dispatch(feedbackAction.launch({open: true, severity: 's', msg: 'copied'}));
            await new Promise(r => setTimeout(r, 1500));
            dispatch(feedbackAction.dismiss())
            }} />
          </View>
          
        </View>
        <View
          style={[
            classes.headerIconRoot,
            {
              backgroundColor:
                status === 'cancelled' ? 'grey' : colors.red.main,
            },
          ]}>
          <Icon
            name={`${
              status !== 'completed' && status !== 'cancelled'
                ? 'map-pin'
                : status === 'cancelled'
                ? 'alert-triangle'
                : 'shopping-bag'
            }`}
            onPress={() => {
              if (
                status !== 'pickedup' &&
                status !== 'enrouteToDelivery' &&
                status !== 'arrivedAtDelivery' &&
                status !== 'delivered' &&
                status !== 'cancelled'
              ) {
                openGoogleMapsIntent(
                  orderInfo.pickupLatitude,
                  orderInfo.pickupLongitude,
                );
                return;
              }
              openGoogleMapsIntent(
                orderInfo.deliveryLatitude,
                orderInfo.deliveryLongitude,
              );
            }}
            size={15}
            color={colors.white}
          />
        </View>
      </View>
      <View style={[classes.bodyRoot, hr]}>
        <View>
          <Subheading style={classes.bodyHeaderText}>
            * Pickup address
          </Subheading>
          <Caption style={classes.content}>{pickUpAddress}</Caption>
        </View>

        <View>
          <Subheading style={classes.bodyHeaderText}>
            * Delivery address
          </Subheading>
          <Caption style={classes.content}>{deliveryAddress}</Caption>
        </View>
      </View>
      {status !== 'completed' && (
        <View style={classes.footerRoot}>
          <View style={{marginLeft: -7}}>
            <Subheading style={classes.bodyHeaderText}>Payment</Subheading>
            <Paragraph style={classes.bodyHeaderText1}>{`₦ ${Math.ceil(
              estimatedCost,
            )}`}</Paragraph>
            <Caption style={classes.content}>{`${orderInfo?.transaction?.paymentMethod !== 'cash' ? 'Paid' : orderInfo?.transaction?.status === 'pending' ? 'Payment on Pickup' : ''}`}</Caption>
          </View>

          <TouchableOpacity
            style={[
              classes.buttonRoot,
              {
                backgroundColor:
                  status !== 'pickedup' &&
                  status !== 'enrouteToDelivery' &&
                  status !== 'arrivedAtDelivery' &&
                  status !== 'delivered' &&
                  status !== 'cancelled'
                    ? colors.blue.main
                    : status === 'cancelled'
                    ? 'grey'
                    : colors.red.main,
              },
            ]}
            disabled={status === 'cancelled'}
            onPress={pickUpAction}>
            {buttonIconLoading === serial ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Caption style={classes.buttonText}>{`${
                status !== 'pickedup' &&
                status !== 'enrouteToDelivery' &&
                status !== 'arrivedAtDelivery' &&
                status !== 'delivered' &&
                status !== 'cancelled'
                  ? 'Proceed Pickup'
                  : status === 'cancelled'
                  ? 'Cancelled'
                  : status === 'delivered'
                  ? 'Delivered'
                  : 'Start Delivery'
              }`}</Caption>
            )}
            <Icon
              name={`${
                status === 'cancelled'
                  ? 'alert-triangle'
                  : status === 'delivered'
                  ? 'package'
                  : 'arrow-right'
              }`}
              size={10}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      )}
    </Surface>
  );
};

export default Task;

const classes = StyleSheet.create({
  root: {
    // flex: 1,
    //height: 300,
    elevation: 2,
    marginVertical: 10,
  },
  headerRoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerIconRoot: {
    width: 32,
    height: 32,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 13,
    fontWeight: '400',
  },
  bodyRoot: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  bodyHeaderText: {
    fontSize: 15,
    color: colors.red.main,
  },
  footerRoot: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonRoot: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    marginRight: 5,
  },
});
