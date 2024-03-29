import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Text
} from 'react-native';
import {Surface, Subheading, Caption, Paragraph} from 'react-native-paper';
import {colors} from '../../../theme';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {openGoogleMapsIntent} from '../../../utils';
import Clipboard from '@react-native-community/clipboard';
import {feedbackAction} from '../../../store/actions';
import Ionicon from 'react-native-vector-icons/MaterialIcons';
import {getStatusOfOrder} from '../../../utils'

const Task = ({
  pickUpAddress,
  deliveryAddress,
  estimatedCost,
  id,
  pickUpAction,
  status,
  serial,
  orderInfo,
  rejectOrder,
}) => {
  const {dark} = useSelector(({theme}) => theme);
  const {buttonIconLoading} = useSelector(({account}) => account);
  const hr = {borderBottomColor: dark ? colors.hr.dark : colors.hr.light};
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // const renderOrders = orders => {
  //   return orders.map((v,i) => (

  //   ))
  // }
  return (
    <Surface style={[classes.root]}>
      <View style={[classes.headerRoot, hr]}>
        <View style={{marginLeft: -4}}>
          <Subheading style={{fontSize: 12}}>{`${
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
        <View style={{marginLeft: -7}}>
            <Subheading style={{fontSize: 12, lineHeight: 16.39, color: colors.red.main}}>Payment</Subheading>
            <Paragraph style={{textAlign: 'right', fontSize: 9.5}}>{`₦ ${Math.ceil(
              estimatedCost,
            )}`}</Paragraph>
          </View>
      </View>
      <View style={[classes.bodyRoot, hr]}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View>
          <Subheading style={classes.bodyHeaderText}>
            * Pickup address
          </Subheading>
          <Caption style={[classes.content, {marginTop: -7}]}>{pickUpAddress}</Caption>
        </View>
        <Ionicon style={{marginBottom: 15, color: colors.grey.main}} name="keyboard-arrow-right" size={15} onPress={() => setOpen(true)} />
        </View>
        

        <View>
          <Subheading style={classes.bodyHeaderText}>
            * Delivery address
          </Subheading>
          <Caption style={[classes.content, {marginTop: -7}]}>{deliveryAddress}</Caption>
        </View>
      </View>
      {status !== 'completed' && (
        <View style={classes.footerRoot}>
          

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
                getStatusOfOrder().get(status)
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
          <TouchableOpacity onPress={rejectOrder} style={[classes.buttonRoot, {backgroundColor: orderInfo?.entry?.status !== 'enrouteToPickup' && orderInfo?.entry?.status !== 'driverAccepted' ? colors.grey.main : colors.red.main}]} disabled={orderInfo?.entry?.status !== 'enrouteToPickup' && orderInfo?.entry?.status !== 'driverAccepted'}>
            <Caption style={classes.buttonText}>Cancel Order</Caption>
          </TouchableOpacity>
        </View>
      )}
      <Modal visible={open} onRequestClose={() => {setOpen(false)}}>
        <View style={{flex: 1, paddingHorizontal: 20}}>
              <View style={classes.spacing}>
                <View style={classes.textContainer}>
                  <Text style={classes.littleText}>Order Type</Text>
                  <Text style={classes.boldText}>{orderInfo?.pickupType !== 'anytime' ? 'Instant Pickup' : 'Anytime'}</Text>
                </View>
                <View style={classes.textContainer}>
                  <Text style={[classes.littleText, {textAlign: 'right'}]}>Order ID</Text>
                  <Text style={classes.boldText}>{id}</Text>
                </View>
              </View>
               <View style={classes.spacing}>
                 <View>
                  <Text style={classes.littleText}>Payment</Text>
                  <Text style={{fontFamily: 'Manrope-Bold', fontSize: 12, color: colors.red.main}}>N {orderInfo?.estimatedCost}</Text>
                </View>
                <View>
                  <Text style={[classes.littleText, {textAlign: 'right'}]}>Payment Type</Text>
                  <Text style={[classes.boldText , {textAlign: 'right'}]}>{orderInfo?.transaction.paymentMethod}</Text>
                </View>
               </View>
                <View style={classes.spacing}>
                  <View>
                  <Text style={classes.littleText}>Total Distance</Text>
                  <Text style={classes.boldText}>{orderInfo?.estimatedDistance}</Text>
                </View>
                <View>
                  <Text style={classes.littleText}>Estimated Delivery Time</Text>
                  <Text style={[classes.boldText , {textAlign: 'right'}]}>{`${Math.ceil(orderInfo?.estimatedTravelduration)} mins`}</Text>
                </View>
                </View>
                 <View style={{marginBottom: 30}}>
                  <Text style={classes.littleText}>Pickup Address</Text>
                  <Text style={classes.boldText}>{orderInfo?.pickupAddress}</Text>
                </View>
                  <View>
                    <View style={{marginBottom: 30}}>
                  <Text style={classes.littleText}>Delivery Address</Text>
                  <Text style={classes.boldText}>{orderInfo?.deliveryAddress}</Text>
                </View>
                <View style={{marginBottom: 30}}>
                  <Text style={classes.littleText}>Note</Text>
                  <Text style={{fontFamily: 'Manrope-Light', fontSize: 10}}>{orderInfo?.transaction.note}</Text>
                </View>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
            onPress={() => {
              setOpen(false);
              pickUpAction();
            }}>
            {buttonIconLoading === serial ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Caption style={classes.buttonText}>{`${
                getStatusOfOrder().get(status)
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
          <TouchableOpacity 
          onPress={() => {
            setOpen(false);
            rejectOrder();
          }}
          disabled={orderInfo?.entry?.status !== 'enrouteToPickup' && orderInfo?.entry?.status !== 'driverAccepted'} 
          style={[classes.buttonRoot, {backgroundColor: orderInfo?.entry?.status !== 'enrouteToPickup' && orderInfo?.entry?.status !== 'driverAccepted' ? colors.grey.main : colors.red.main}]}>
            <Caption style={classes.buttonText}>Cancel Order</Caption>
          </TouchableOpacity>
                  </View>
        </View>
      </Modal>
    </Surface>
  );
};

export default Task;

const classes = StyleSheet.create({
  root: {
    // flex: 1,
    //height: 300,
    marginVertical: 15,
    marginHorizontal: 20,
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
    fontSize: 10,
    fontWeight: '400',
  },
  bodyRoot: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  bodyHeaderText: {
    fontSize: 10,
    color: colors.red.main,
  },
  footerRoot: {
    paddingVertical: 15,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonRoot: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    width: '45%',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    marginRight: 5,
    fontSize: 10,
    //numberOfLines: 1,
    fontFamily: 'Manrope-Bold',
  },
  littleText: {
    fontSize: 8,
    fontFamily:'Manrope-Light',
  },
  boldText: {
    fontSize: 12,
    fontFamily: 'Manrope-SemiBold',
  },
  spacing: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30
  },
  textContainer: {paddingVertical: 10, justifyContent: 'space-between'},
});
