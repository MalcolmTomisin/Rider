import React from 'react';
import {View, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {Subheading, Avatar, Switch} from 'react-native-paper';
import {colors} from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {themeAction} from '../../../store/actions';
import {setSignInToken} from '../../../store/actions/signUp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({navigation: {navigate}}) => {
  const {dark} = useSelector(({theme}) => theme);
  const dispatch = useDispatch();
  return (
    <View style={classes.root}>
      <List name="Bank details" onPress={() => navigate('BankAccount')} />
      <List
        name="Change Password"
        onPress={() => navigate('Change Password')}
      />
      <List
        name="Dark Mode"
        // onPress={null}
        component={
          <Switch
            value={dark}
            color={colors.red.main}
            onValueChange={() => dispatch(themeAction.setAppTheme(!dark))}
          />
        }
      />
      <List name="Terms & Conditions" onPress={() => navigate('Rating')} />
      <List name="Privacy Policy" onPress={() => navigate('Settings')} />
      <List
        name="Help"
        onPress={() =>
          Linking.openURL(
            'mailto:support@exaltapp.com?subject=SendMail&body=Description',
          )
        }
      />
      <List
        name="Logout"
        onPress={async () => {
          await AsyncStorage.clear();
          dispatch(setSignInToken({signedIn: false}));
          navigate('Onboarding');
        }}
      />
    </View>
  );
};

export default Settings;

const List = ({name, onPress, component}) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={() => onPress()}
      style={classes.listRoot}>
      <Subheading style={classes.listTitle}>{name}</Subheading>
      {component ? (
        component
      ) : (
        <Icon
          name="chevron-right"
          size={30}
          color={colors.grey.main}
          style={{fontWeight: '100'}}
        />
      )}
    </TouchableOpacity>
  );
};

List.defaultProps = {
  component: null,
  onPress: null,
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
