import React from 'react'
import {View, StyleSheet} from 'react-native';
import { Task } from '../../../components/Card'
import {useSelector} from 'react-redux';


const OrderPool = () => {
  const {message} = useSelector(({account}) => account);
  const {data} = message;
  const renderTasks = orders => {
    return orders.map((v, i) => (
      <Task 
      pickUpAddress={data?.pickupAddress} 
      deliveryAddress={v?.deliveryAddress}
      estimatedCost={v?.estimatedCost}
      id={v?.orderId}
      />
    ))
  }

  return (
    <View style={classes.root}>
      {
        !data && !message.accept ? null : renderTasks(data)
      }
    </View>
  );
}

export default OrderPool

const classes = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-evenly'
  },
});
