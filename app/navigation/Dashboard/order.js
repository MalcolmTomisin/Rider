import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OrderPool from '../../screens/Dashboard/order';
import CompletedOrder from '../../screens/Dashboard/order/completed';
const Tab = createMaterialTopTabNavigator();

const OrderPoolStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Assigned" component={OrderPool} />
      <Tab.Screen name="Completed" component={CompletedOrder} />
    </Tab.Navigator>
  );
}

export default OrderPoolStack;