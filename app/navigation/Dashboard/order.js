import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OrderPool from '../../screens/Dashboard/order';
const Tab = createMaterialTopTabNavigator();

const OrderPoolStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Assigned" component={OrderPool} />
      <Tab.Screen name="Completed" component={OrderPool} />
    </Tab.Navigator>
  );
}

export default OrderPoolStack;