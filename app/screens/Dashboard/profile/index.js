import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, Linking} from 'react-native';
import {Subheading, Avatar, Caption} from 'react-native-paper';
import {colors} from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {accountAction} from '../../../store/actions';
import {useSelector, useDispatch} from 'react-redux';
import img from '../../../image';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {setSignInToken} from '../../../store/actions/signUp';

const Profile = ({navigation: {navigate}}) => {
  const {dark} = useSelector(({theme}) => theme);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    (async () => {
      let stringifiedUserDetails = await AsyncStorage.getItem('userDetails');
      if (stringifiedUserDetails) {
        setUserDetails(JSON.parse(stringifiedUserDetails));
      }
      console.log('user', stringifiedUserDetails );
    })();
  }, []);
  return (
    <View style={classes.root}>
      <View style={classes.headerRoot}>
        <Avatar.Image
          source={
            userDetails?.img
              ? {uri: `https://df7sglzvhxylw.cloudfront.net/${userDetails.img}`}
              : img.securityImg
          }
          size={90}
        />
        <View style={classes.headerContent}>
          <Subheading
            style={classes.listTitle}>{`${userDetails?.name}`}</Subheading>

          {/* <View style={classes.headerLocation}>
            <Icon name="map-marker" size={15} color={colors.red.main} />
            <Caption style={classes.headerLocationTitle}>
              7 Hughes avenue, Lawal Road
            </Caption>
          </View> */}
        </View>
      </View>
      <ScrollView>
        <List name="Trips" onPress={() => navigate('Trips')} />
        <List name="Order Basket" onPress={() => navigate('OrderPool')} />
        <List name="Ratings" onPress={() => navigate('Rating')} />
        <List name="Settings" onPress={() => navigate('Settings')} />
        <List name="Help" onPress={() => Linking.openURL('mailto:support@exaltapp.com?subject=SendMail&body=Description')} />
        <List
          name="Logout"
          onPress={() => {
            AsyncStorage.clear();
            dispatch(setSignInToken({signedIn: false}));
            dispatch(accountAction.setToken({token: null}));
            navigate('Onboarding');
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Profile;

const List = ({name, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={classes.listRoot}>
      <Subheading style={classes.listTitle}>{name}</Subheading>
      <Icon
        name="chevron-right"
        size={30}
        color={colors.grey.main}
        style={{fontWeight: '100'}}
      />
    </TouchableOpacity>
  );
};

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerRoot: {
    height: 120,
    borderBottomColor: colors.hr.light,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    marginLeft: 20,
  },
  headerLocation: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerLocationTitle: {
    fontSize: 14,
    fontWeight: '300',
  },
  listRoot: {
    // flex: 5,
    marginLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomColor: colors.hr.light,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  listTitle: {
    fontWeight: '700',
    fontSize: 17,
  },
});
