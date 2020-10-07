import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Title, Subheading, Caption} from 'react-native-paper';
import { Button } from '../../components/Button';
import img from '../../image';
import { colors } from '../../theme';
import { TextField } from '../../components/TextField';
import BackButton from '../../navigation/custom/BackButton';

const CompleteRegisteration = ({navigation: {goBack, navigate}}) => {

  return (
    <View style={classes.root}>
      <View style={classes.headerRoot}>
        <BackButton goBack={() => goBack()} />
      </View>
      <View style={classes.bodyRoot}>
        <Title style={classes.bodyTitle}>Create Account</Title>
        <TextField label="Select Courier Company" />
        <TextField label="Mobile Number" />
        <TextField label="Home Address" />
        <Button
          label="Complete Registeration"
          onPress={() => navigate('Verification')}
        />
      </View>
      <View style={classes.footerRoot} />
    </View>
  );
};

export default CompleteRegisteration;

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
  content: {
    fontWeight: '200',
  },
  contentRed: {
    fontWeight: '200',
    color: colors.red.main,
  },
  footerRoot: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});