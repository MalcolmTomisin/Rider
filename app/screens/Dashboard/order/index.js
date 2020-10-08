import React from 'react'
import {View, StyleSheet} from 'react-native';
import { Task } from '../../../components/Card'

const OrderPool = () => {
  return (
    <View style={classes.root}>
      <Task />
    </View>
  );
}

export default OrderPool

const classes = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 20
  },
});
