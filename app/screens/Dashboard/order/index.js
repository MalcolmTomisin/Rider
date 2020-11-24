import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Task} from '../../../components/Card';
import {useSelector, useDispatch} from 'react-redux';
import {useFetch} from '../../../utils/fetchHook';
import {api} from '../../../api';
import {Loading} from '../../../components/Loading';
import {deliveryAction} from '../../../store/actions';

const OrderPool = ({navigation: {navigate, push}}) => {
  const dispatch = useDispatch();
  const {token, loading, acceptedOrders} = useSelector(({account}) => account);

  const {response} = useFetch(api.riderBasket, {
    method: 'GET',
    headers: {
      'x-auth-token': token,
    },
  });

  const pickUp = (item) => {
    dispatch(
      deliveryAction.setDeliveryNavigation({
        pickUp: {
          latitude: item.pickupLatitude,
          longitude: item.pickupLongitude,
        },
      }),
    );
    push('Dashboard');
  };

  console.log('resposne', response);
  const renderTasks = () => {
    if (!acceptedOrders || acceptedOrders.length < 1) {
      return null;
    }

    return acceptedOrders.map((v, i) => (
      <Task
        key={i}
        pickUpAddress={v?.pickupAddress}
        deliveryAddress={v?.deliveryAddress}
        estimatedCost={v?.estimatedCost}
        id={v?.orderId}
        pickUpAction={() => pickUp(v)}
      />
    ));
  };

  return (
    <View style={classes.root}>
      <ScrollView>{renderTasks()}</ScrollView>
      <Loading visible={loading} size="large" />
    </View>
  );
};

export default OrderPool;

const classes = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-evenly',
  },
});
