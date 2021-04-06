import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Home from './home';
import {colors} from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EarningStack from './earning';
import TripStack from './trip';
import ProfileStack from './profile';
import OrderPoolStack from './order';
import {BasketIcon} from '../../image';

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: {
          height: 60,
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconStyle = {};
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Earnings') {
            iconName = 'credit-card';
            iconStyle.marginRight = 40;
          } else if (route.name === 'Trips') {
            iconName = 'navigation';
            iconStyle.marginLeft = 40;
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              // size={size}
              size={!focused ? 19 : 19}
              color={focused ? colors.red.main : colors.black}
              style={iconStyle}
            />
          );
        },
        tabBarLabel: ({focused, color, position}) => {
          let labelStyle = {};
          if (route.name === 'Earnings') {
            labelStyle.marginRight = 40;
          } else if (route.name === 'Trips') {
            labelStyle.marginLeft = 40;
          }

          return (
            <Text
              style={{...labelStyle, fontFamily: 'Manrope-Light', fontSize: 8, marginBottom: 8, color: focused ? colors.red.main : colors.black}}>
              {route.name}
            </Text>
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
        name="Basket"
        component={OrderPoolStack}
        options={({navigation}) => ({
          tabBarButton: () => (
            <BasketIcon style={{height: 55, width: 55}} onPress={() => navigation.navigate('OrderPool')} />
          ),
        })}
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
