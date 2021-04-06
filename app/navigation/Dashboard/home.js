import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Home from '../../screens/Dashboard';
import { Avatar, Badge } from 'react-native-paper';
import { colors } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Switch } from '../../components/Switch';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../utils/constants';
import {cloudURL} from '../../api';

const Stack = createStackNavigator();

console.log(constants.DEVICE_WIDTH / 20);

const Dashboard = () => {
  const { isOnline, acceptedOrders, user } = useSelector(({ account }) => account);
  const { dark } = useSelector(({ theme }) => theme);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    (async () => {
      let stringifiedUserDetails = await AsyncStorage.getItem('userDetails');
      if (stringifiedUserDetails) {
        setUserDetails(JSON.parse(stringifiedUserDetails));
      }
    })();
  }, []);

  return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen
        name="Home"
        options={({ navigation: { navigate } }) => ({
          headerLeft: () => (
            <View style={classes.left}>
              <Avatar.Image
                size={35}
                // label={`${
                //   user?.name.indexOf(' ') !== -1
                //     ? `${user?.name.charAt(0)}${user?.name.charAt(
                //         user?.name.indexOf(' ') + 1,
                //       )}`
                //     : `${user?.name.charAt(0)}`
                // }`}
                //color={colors.red.main}
                source={
                  userDetails?.img
                    ? {
                      uri: `${cloudURL}${userDetails.img}`,
                    }
                    : null
                }
              />
            </View>
          ),
          headerTitle: null,
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
    left: constants.IS_IOS ? constants.DEVICE_WIDTH / 40 - 10 : 120,
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
