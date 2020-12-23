import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Welcome from '../../screens/Onboarding';
import Login from '../../screens/Onboarding/login';
import Register from '../../screens/Onboarding/register';
import CompleteRegister from '../../screens/Onboarding/completeRegister';
import Verification from '../../screens/Onboarding/verification';
import VerificationCompleted from '../../screens/Onboarding/verificationCompleted';
import ForgotPassword from '../../screens/Onboarding/ForgotPassword';
import OTPVerification from '../../screens/Onboarding/ForgotPassword/OTPVerification';
import ResetPassword from '../../screens/Onboarding/ForgotPassword/resetPassword';

const Stack = createStackNavigator();

const Onboarding = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" headerMode="screen">
      <Stack.Screen
        name="Welcome"
        options={{headerShown: false}}
        component={Welcome}
      />
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={Login}
      />
      <Stack.Screen
        name="Register"
        options={{headerShown: false}}
        component={Register}
      />
      <Stack.Screen
        name="CompleteRegister"
        options={{headerShown: false}}
        component={CompleteRegister}
      />
      <Stack.Screen
        name="Verification"
        options={{headerShown: false}}
        component={Verification}
      />
      <Stack.Screen
        name="VerificationCompleted"
        options={{headerShown: false}}
        component={VerificationCompleted}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{headerShown: false}}
        component={ForgotPassword}
      />
      <Stack.Screen
        name="OTP"
        options={{headerShown: false}}
        component={OTPVerification}
      />
      <Stack.Screen
        name="Reset"
        options={{headerShown: false}}
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};

export default Onboarding;

const classes = StyleSheet.create({
  label: {
    fontSize: 18,
    lineHeight: 25,
    // color: '#000',
  },
});
