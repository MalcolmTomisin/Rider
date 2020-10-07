import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Dashboard from './Dashboard';
import Onboarding from './Onboarding';
const Stack = createStackNavigator();


const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard" headerMode="screen">
      <Stack.Screen
        name="Onboarding"
        options={{headerShown: false}}
        component={Onboarding}
      />
      <Stack.Screen
        name="Dashboard"
        options={{headerShown: false}}
        component={Dashboard}
      />
    </Stack.Navigator>
  );
};

export default Navigation;


const classes = StyleSheet.create({
  label: {
    fontSize: 18,
    lineHeight: 25,
    // color: '#000',
  },
});