import React,{useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '../../../components/Button';
import {TextField} from '../../../components/TextField';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {makeNetworkCalls} from '../../../utils';
import {} from 'react-redux';

const BankAccount = ({navigation: {goBack, navigate}}) => {
  useEffect(() => {

  }, []);
  return (
    <KeyboardAwareScrollView style={classes.root}>
      <TextField
        label="Bank Name"
        rootStyle={classes.margin}
        containerStyle={{height: 53}}
        placeholder="Guarantee Trust bank"
        placeholderTextColor="#a2a2a2"
      />
      <TextField
        label="Account Number"
        rootStyle={classes.margin}
        containerStyle={{height: 53}}
        placeholder="2933181931"
        placeholderTextColor="#a2a2a2"
      />
      <TextField
        label="Bank Sort Number"
        rootStyle={classes.margin}
        containerStyle={{height: 53}}
        placeholder="2123"
        placeholderTextColor="#a2a2a2"
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 40,
          marginHorizontal: 15,
        }}>
        <Button label="Add Bank Account" />
      </View>

      <View style={classes.footerRoot} />
    </KeyboardAwareScrollView>
  );
};

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
  },
  margin: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
});
