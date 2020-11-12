import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Home from '../../screens/Dashboard';
import {Avatar, Badge} from 'react-native-paper';
import {colors} from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Indicator} from '../../components/Feedback';
import {Switch} from '../../components/Switch';
const Stack = createStackNavigator();

const Dashboard = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen
        name="Home"
        options={({navigation: {navigate}}) => ({
          headerLeft: () => (
            <View style={classes.left}>
              <Avatar.Text size={35} label="XD" color={colors.red.main} />
            </View>
          ),
          headerTitle: () => (
            <TouchableOpacity onPress={() => navigate('OrderPool')}>
              <Badge style={classes.badge}>3</Badge>
              <Icon size={35} name="basket" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={classes.right}>
              <Switch />
            </View>
          ),
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
        component={Home}
      />
    </Stack.Navigator>
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
    backgroundColor: colors.red.main,
  },
  left: {
    paddingLeft: 20,
  },
  right: {
    paddingRight: 20,
  },
});
