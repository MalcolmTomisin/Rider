import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Home from '../../screens/Dashboard';
import {Avatar, Badge} from 'react-native-paper';
import {colors} from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Switch} from '../../components/Switch';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const Dashboard = () => {
  const {isOnline, acceptedOrders, user} = useSelector(({account}) => account);

  return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen
        name="Home"
        options={({navigation: {navigate}}) => ({
          headerLeft: () => (
            <View style={classes.left}>
              <Avatar.Text
                size={35}
                label={`${
                  user?.name.indexOf(' ') !== -1
                    ? `${user?.name.charAt(0)}${user?.name.charAt(
                        user?.name.indexOf(' ') + 1,
                      )}`
                    : `${user?.name.charAt(0)}`
                }`}
                color={colors.red.main}
              />
            </View>
          ),
          headerTitle: () => (
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={() => navigate('OrderPool')}>
              {isOnline &&
              acceptedOrders?.filter((v) => v.status !== 'cancelled').length >
                0 ? (
                <Badge style={classes.badge}>{`${
                  acceptedOrders.filter((v) => v.status !== 'cancelled').length
                }`}</Badge>
              ) : null}
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
    left: 120,
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
