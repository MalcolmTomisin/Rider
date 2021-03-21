import React, {useState, useEffect} from 'react';
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
import {callBasket, makeNetworkCalls} from '../../../utils';

const OrderPool = ({navigation: {navigate, push, isFocused}}) => {
  const dispatch = useDispatch();
  const {token, loading, acceptedOrders} = useSelector(({account}) => account);
  const {currentIndex} = useSelector(({delivery}) => delivery);
  const [refresh, setRefresh] = useState(false);

  // const {response} = useFetch(api.riderBasket, {
  //   method: 'get',
  //   headers: {
  //     'x-auth-token': token,
  //   },
  // });

  useEffect(() => {
    refreshBasket();
  }, []);

  //get updated information from api
  const refreshBasket = () => {
    setRefresh(true);
    makeNetworkCalls({
      url: api.riderBasket,
      method: 'get',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        console.log('res', res.data);
        const {data, msg} = res.data;
        dispatch(accountAction.setAcceptedOrders({acceptedOrders: data}));
        if (currentIndex !== null) {
          dispatch(
            deliveryAction.setCurrentPickupInfo({
              currentEntry: data[currentIndex],
            }),
          );
        }
        if (isFocused()) {
          dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        }
      })
      .catch((err) => {
        if (isFocused()) {
          dispatch(
            feedbackAction.launch({open: true, severity: 'w', msg: `${err}`}),
          );
        }
      })
      .finally(() => {
        setRefresh(false);
      });
  };
  
  const rejectOrder = (item, index) => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    console.log('req',  api.riderBasket + `/${item._id}/remove`);
    //setRefresh(true);
    makeNetworkCalls({
      url: api.riderBasket + `/${item._id}/remove`,
      method: 'patch',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        const {msg} = res.data;
        if (isFocused()) {
          dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        }
        if (currentIndex === index) {
          dispatch(deliveryAction.setIndexOfEntry({currentIndex: index}));
        }
        refreshBasket();
      })
      .catch((err) => {
        if (isFocused()) {
          if (err.response) {
            const {msg} = err.response.data;
            dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
            return;
          }
          dispatch(
            feedbackAction.launch({open: true, severity: 'w', msg: `${err}`}),
          );
        }
      })
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
      });
  };

  const pickUp = async (item, index) => {
    dispatch(accountAction.setIconLoading({buttonIconLoading: index}));
    dispatch(
      deliveryAction.setDeliveryNavigation({
        pickUp: {
          latitude: item.pickupLatitude,
          longitude: item.pickupLongitude,
        },
      }),
    );
    await AsyncStorage.setItem('currentEntry', `${index}`);
    dispatch(deliveryAction.setCurrentPickupInfo({currentEntry: item}));
    dispatch(deliveryAction.setIndexOfEntry({currentIndex: index}));

    if (
      item?.entry?.status === 'arrivedAtPickup' &&
      item?.transaction?.status === 'pending'
    ) {
      push('Dashboard');
    } else if (item?.entry?.status === 'arrivedAtPickup') {
      push('ConfirmPickupCode');
    } else if (item?.status === 'arrivedAtDelivery') {
      navigate('ConfirmDeliveryCode');
    } else {
      push('Dashboard');
    }
    dispatch(accountAction.setIconLoading({buttonIconLoading: false}));
  };

  //console.log('resposne', response);
  const renderTasks = () => {
    if (!acceptedOrders || acceptedOrders.length < 1) {
      return null;
    }

    return acceptedOrders.map((v, i) => {
      console.log('item', v);
      return (
        <Task
          key={i}
          pickUpAddress={v?.pickupAddress}
          deliveryAddress={v?.deliveryAddress}
          estimatedCost={v?.estimatedCost}
          id={v?.orderId}
          pickUpAction={() => pickUp(v, i)}
          status={v?.status}
          serial={i}
          orderInfo={v}
          rejectOrder={() => rejectOrder(v, i)}
        />
      );
    });
  };

  return (
    <View style={classes.root}>
      <ScrollView
      
      contentContainerStyle={{backgroundColor: '#E5E5E5',  flexGrow: 1}}
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
    flex: 1
  },
});
