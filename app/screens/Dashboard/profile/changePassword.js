import React from 'react'
import {View, StyleSheet } from 'react-native';
import { Button } from '../../../components/Button';
import { TextField } from '../../../components/TextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ChangePassword = ({ navigation: { goBack, navigate } }) => {
  return (
    <KeyboardAwareScrollView style={classes.root}>
      
        <TextField 
        label="Old Password" 
        rootStyle={classes.margin} 
        containerStyle={{height: 53}}
        placeholderTextColor="#a2a2a2" 
        placeholder="Enter password"
        secureTextEntry
        password 
        />
        <TextField 
        label="New Password" 
        rootStyle={classes.margin} 
        containerStyle={{height: 53}} 
        placeholder="Enter password"
        placeholderTextColor="#a2a2a2"
        secureTextEntry
        password
        />
        <TextField 
        label="Confirm New Password" 
        rootStyle={classes.margin} 
        containerStyle={{height: 53}} 
        placeholder="Enter password"
        placeholderTextColor="#a2a2a2"
        secureTextEntry
        password
        />
        <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 40, marginHorizontal: 15}}>
        <Button label="Change Password" />
        </View>
      
    </KeyboardAwareScrollView>
  );
}

export default ChangePassword;

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bodyRoot: {
    flex: 4,
    marginHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  bodyTitle: {
    fontSize: 28,
  },
  footerRoot: {
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  margin:{
    marginHorizontal: 15,
    marginVertical: 10
  }
});