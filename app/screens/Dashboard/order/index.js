import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {Task} from '../../../components/Card';
import {useSelector, useDispatch} from 'react-redux';
import {useFetch} from '../../../utils/fetchHook';
import {api} from '../../../api';
import {Loading} from '../../../components/Loading';
import {
  deliveryAction,
  accountAction,
  feedbackAction,
} from '../../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {callBasket} from '../../../utils';

const OrderPool = ({navigation: {navigate, push}}) => {
  const dispatch = useDispatch();
  const {token, loading, acceptedOrders} = useSelector(({account}) => account);
  const {currentIndex} = useSelector(({delivery}) => delivery);
  const [refresh, setRefresh] = useState(false);

  const {response} = useFetch(api.riderBasket, {
    method: 'GET',
    headers: {
      'x-auth-token': token,
    },
  });

  const refreshBasket = () => {
    setRefresh(true);
    fetch(api.riderBasket, {
      method: 'GET',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Unable to fetch orders');
        }
        return res.json();
      })
      .then((res) => {
        dispatch(accountAction.setAcceptedOrders({acceptedOrders: res.data}));
      })
      .catch((err) => {
        dispatch(
          feedbackAction.launch({open: true, severity: 'w', msg: `${err}`}),
        );
      })
      .finally(() => {
        setRefresh(false);
      });
  };

  const pickUp = (item, index) => {
    dispatch(
      deliveryAction.setDeliveryNavigation({
        pickUp: {
          latitude: item.pickupLatitude,
          longitude: item.pickupLongitude,
        },
      }),
    );
    AsyncStorage.setItem('currentEntry', `${index}`);
    dispatch(deliveryAction.setCurrentPickupInfo({currentEntry: item}));
    dispatch(deliveryAction.setIndexOfEntry({currentIndex: index}));
    if (item.entry.status === 'arrivedAtPickup') {
      navigate('ConfirmPickupCode');
    } else if (item.entry.status === 'arrivedAtDelivery') {
      navigate('ConfirmDeliveryCode');
    } else {
      push('Dashboard');
    }
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
        status={v?.entry?.status}
      />
    ));
  };

  return (
    <View style={classes.root}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={refreshBasket} />
        }>
        {renderTasks()}
      </ScrollView>
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
