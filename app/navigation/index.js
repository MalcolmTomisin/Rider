import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Dashboard from './Dashboard';
import Onboarding from './Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Rating from '../screens/Dashboard/profile/rating';
import TitleButton from './custom/TitleButton';
import BackButton from './custom/BackButton';
import Settings from '../screens/Dashboard/profile/settings';
import BankAccount from '../screens/Dashboard/profile/bankAccount';
import OrderPoolStack from './Dashboard/order';
import ConfirmPickupCode from '../screens/Dashboard/order/confirmPickupCode';
import ConfirmDeliveryCode from '../screens/Dashboard/order/confirmDeliveryCode';
import Rate from '../screens/Dashboard/order/rate';
import {api} from '../api';
import {connect} from 'react-redux';
import {boundSetSignInToken} from '../store';

const Stack = createStackNavigator();

const Navigation = ({signedIn}) => {
  useEffect(() => {
    GetAuth().then((result) => {
      boundSetSignInToken({signedIn: result});
    });
  }, []);
  return (
    <Stack.Navigator
      headerMode="float">
      {signedIn ? (
        <>
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
            component={OrderPoolStack}
          />
          <Stack.Screen
            name="ConfirmPickupCode"
            options={({navigation: {goBack}}) => ({
              headerLeft: () => (
                <Left goBack={goBack} name="Confirm Pickup Code" />
              ),
              title: '',
              headerStyle: classes.header,
            })}
            component={ConfirmPickupCode}
          />
          <Stack.Screen
            name="ConfirmDeliveryCode"
            options={({navigation: {goBack}}) => ({
              headerLeft: () => (
                <Left goBack={goBack} name="Confirm Delivery Code" />
              ),
              title: '',
              headerStyle: classes.header,
            })}
            component={ConfirmDeliveryCode}
          />
          <Stack.Screen
            name="Rate"
            options={({navigation: {goBack}}) => ({
              headerLeft: () => (
                <Left goBack={goBack} name="How was your client?" />
              ),
              title: '',
              headerStyle: classes.header,
            })}
            component={Rate}
          />
        </>
      ) : (
        <Stack.Screen
          name="Onboarding"
          options={{headerShown: false}}
          component={Onboarding}
        />
      )}
    </Stack.Navigator>
  );
};

const MapStateToProps = (state) => {
  console.log('state', state);
  const {signup} = state;
  return {signedIn: signup.signedIn};
};

export default connect(MapStateToProps, {boundSetSignInToken})(Navigation);

const Left = ({name, goBack, navigate}) => {
  return (
    <View style={classes.left}>
      <BackButton goBack={() => goBack()} />
      <TitleButton
        label={name}
        navigate={() => goBack()}
        rootStyle={{marginLeft: 0}}
      />
    </View>
  );
};



const GetAuth = async () => {
  //check if token exists
  try {
    const value = await AsyncStorage.getItem(api.userAuthKey);
    return value != null ? JSON.parse(value) : false;
  } catch (e) {
    //failure
  }
  return false;
};

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
