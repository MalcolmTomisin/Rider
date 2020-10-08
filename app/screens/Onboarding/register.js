import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Title, Subheading, Caption} from 'react-native-paper';
import { Button } from '../../components/Button';
import img from '../../image';
import { colors } from '../../theme';
import { TextField } from '../../components/TextField';
import BackButton from '../../navigation/custom/BackButton';

const Register = ({navigation: {goBack, navigate}}) => {
  const handleLogin = () => {
navigate('Login')
  }
  return (
    <View style={classes.root}>
      <View style={classes.headerRoot}>
        <BackButton goBack={() => goBack()} />
      </View>
      <View style={classes.bodyRoot}>
        <Title style={classes.bodyTitle}>Create Account</Title>
        <TextField label="First Name" />
        <TextField label="Last Name" />
        <TextField label="Email Address" />
        <TextField label="Password" />
        <View>
          <Button
            label="Create Account"
            onPress={() => navigate('CompleteRegister')}
          />
          <Caption style={classes.content}>
            By continuing, I confirm that I have read & agree to the{' '}
            <Caption style={classes.contentRed}> Terms & conditions </Caption>{' '}
            and
            <Caption style={classes.contentRed}> Privacy Policy</Caption>
          </Caption>
        </View>
      </View>
      <View style={classes.footerRoot}>
        <View style={{flexGrow: 1}} />
        <View style={classes.signupRoot}>
          <Subheading style={classes.signupLeft}>
            Already Have An Account?
            <TouchableOpacity onPress={handleLogin}>
              <Subheading style={classes.signupRight}> Login.</Subheading>
            </TouchableOpacity>
          </Subheading>
        </View>
      </View>
    </View>
  );
};

export default Register;

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bodyRoot: {
    flex: 6,
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
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  hr: {
    borderBottomColor: colors.hr.light,
    borderBottomWidth: 1,
    height: 10,
  },
  signupRoot: {
    height: 120,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopColor: colors.hr.light,
    borderTopWidth: 1,
    width: '100%',
    paddingVertical: 20,
  },
  signupRight: {
    color: colors.red.main,
  },
  signupLeft: {
    color: colors.grey.main,
  },
});