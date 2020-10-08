import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { colors } from "../../theme";
import TitleButton from "../custom/TitleButton";
import Earnings from '../../screens/Dashboard/earnings';
const Stack = createStackNavigator();

const EarningStack = () => {
  return (
    <Stack.Navigator initialRouteName="Earnings" headerMode="screen">
      <Stack.Screen
        name="Earnings"
        options={({navigation: {navigate}}) => ({
          headerLeft: () => (
            <View style={classes.left}>
              <TitleButton label="My Earnings" />
            </View>
          ),
          title: '',
          headerStyle: {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        })}
        component={Earnings}
      />
    </Stack.Navigator>
  );
};

export default EarningStack;

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
