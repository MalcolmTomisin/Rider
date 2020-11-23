import React from 'react'
import {View, StyleSheet, ScrollView} from 'react-native';
import { Task } from '../../../components/Card'
import {useSelector} from 'react-redux';


const OrderPool = () => {
  const {message} = useSelector(({account}) => account);
  const {data} = message;
  console.log('data', data);
  const renderTasks = orders => {
    if (!orders){
      return null;
    }
    
    return orders.map((v, i) => (
      <Task
      key={i} 
      pickUpAddress={data?.pickupAddress} 
      deliveryAddress={v?.deliveryAddress}
      estimatedCost={v?.estimatedCost}
      id={v?.orderId}
      />
    ))
  }

  return (
    <View style={classes.root}>
      <ScrollView>
      {
        !data && !message.accept ? null : renderTasks(data?.orders)
      }
      </ScrollView>
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
