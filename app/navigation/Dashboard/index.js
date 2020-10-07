import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Home from './home';
import {Avatar, Badge} from 'react-native-paper';
import { colors } from "../../theme";
import Icon from "react-native-vector-icons/Feather"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();


const Dashboard = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          // console.log('{ focused, color, size }', focused, color, size);

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Earnings') {
            iconName = 'credit-card';
          } else if (route.name === 'Trips') {
            iconName = 'navigation';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              size={size}
              // size={!focused ? 15 : 35}
              color={focused ? colors.red.main : color}
            />
          );
        },
      })}
      tabBarOptions={
        {
          // activeTintColor: '#4DC735',
          // inactiveTintColor: 'gray',
          // style: {
          //   backgroundColor: "#000"
          // }
        }
      }>
      <Tab.Screen name="Home" component={Home} options={{title: 'Home'}} />
      <Tab.Screen
        name="Earnings"
        component={Home}
        options={{title: 'Earnings'}}
      />
      <Tab.Screen name="Trips" component={Home} options={{title: 'Trips'}} />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{title: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default Dashboard;

const classes = StyleSheet.create({
  label: {
    fontSize: 18,
    lineHeight: 25,
    // color: '#000',
  },
  badge: {
    position: 'absolute',
    left: 25,
    bottom: 18,
    zIndex: 5,
  },
  left: {
    paddingLeft: 20,
  },
  right: {
    paddingRight: 20,
  },
});
