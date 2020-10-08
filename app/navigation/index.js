import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Dashboard from './Dashboard';
import Onboarding from './Onboarding';
import Rating from '../screens/Dashboard/profile/rating';
import TitleButton from './custom/TitleButton';
import BackButton from './custom/BackButton';
import Settings from '../screens/Dashboard/profile/settings';
import BankAccount from '../screens/Dashboard/profile/bankAccount';
import OrderPool from '../screens/Dashboard/order';
const Stack = createStackNavigator();


const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard" headerMode="float">
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
      <Stack.Screen
        name="Rating"
        options={({navigation: {goBack}}) => ({
          headerLeft: () => <Left goBack={goBack} name="Ratings" />,
          title: '',
          headerStyle: classes.header,
        })}
        component={Rating}
      />
      <Stack.Screen
        name="Settings"
        options={({navigation: {goBack}}) => ({
          headerLeft: () => <Left goBack={goBack} name="Settings" />,
          title: '',
          headerStyle: classes.header,
        })}
        component={Settings}
      />
      <Stack.Screen
        name="BankAccount"
        options={({navigation: {goBack}}) => ({
          headerLeft: () => <Left goBack={goBack} name="Bank details" />,
          title: '',
          headerStyle: classes.header,
        })}
        component={BankAccount}
      />
      <Stack.Screen
        name="OrderPool"
        options={({navigation: {goBack}}) => ({
          headerLeft: () => <Left goBack={goBack} name="Order Pool" />,
          title: '',
          headerStyle: classes.header,
        })}
        component={OrderPool}
      />
    </Stack.Navigator>
  );
};

export default Navigation;

const Left = ({ name, goBack, navigate }) => {
  return (
    <View style={classes.left}>
      <BackButton goBack={() => goBack()} />
      <TitleButton
        label={name}
        navigate={() => goBack()}
        rootStyle={{marginLeft: 0}}
      />
    </View>
  )
}

const classes = StyleSheet.create({
  left: {
    // marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
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