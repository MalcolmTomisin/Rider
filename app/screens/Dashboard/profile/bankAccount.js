import React from 'react'
import {View, StyleSheet } from 'react-native';
import { Button } from '../../../components/Button';
import { TextField } from '../../../components/TextField';

const BankAccount = ({ navigation: { goBack, navigate } }) => {
  return (
    <View style={classes.root}>
      <View style={classes.bodyRoot}>
        <TextField label="Bank Name" />
        <TextField label="Account Number" />
        <TextField label="Bank Sort Number" />
        <Button label="Add Bank Account" />
      </View>
      <View style={classes.footerRoot} />
    </View>
  );
}

export default BankAccount;

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