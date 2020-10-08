import React from 'react'
import {View, StyleSheet } from 'react-native';
import { Button } from '../../../components/Button';
import { TextField } from '../../../components/TextField';

const ChangePassword = ({ navigation: { goBack, navigate } }) => {
  return (
    <View style={classes.root}>
      <View style={classes.bodyRoot}>
        <TextField label="Old Password" />
        <TextField label="New Password" />
        <TextField label="Confirm New Password" />
        <Button label="Change Password" />
      </View>
      <View style={classes.footerRoot} />
    </View>
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
  }
});