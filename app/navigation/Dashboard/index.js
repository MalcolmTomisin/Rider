import React from 'react';
import { StyleSheet} from 'react-native';
import Home from './home';
import { colors } from "../../theme";
import Icon from "react-native-vector-icons/Feather";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EarningStack from "./earning"
import TripStack from './trip';
import ProfileStack from './profile';
const Tab = createBottomTabNavigator();



const Dashboard = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
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
              // size={size}
              size={!focused ? 15 : 30}
              color={focused ? colors.red.main : color}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.red.main,
        // inactiveTintColor: 'gray',
        style: classes.root,
      }}>
      <Tab.Screen name="Home" component={Home} options={{title: 'Home'}} />
      <Tab.Screen
        name="Earnings"
        component={EarningStack}
        options={{title: 'Earnings'}}
      />
      <Tab.Screen
        name="Trips"
        component={TripStack}
        options={{title: 'Trips'}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{title: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default Dashboard;

const classes = StyleSheet.create({
  root: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
