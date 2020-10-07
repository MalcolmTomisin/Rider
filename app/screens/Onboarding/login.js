import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Title, Subheading} from 'react-native-paper';
import { Button } from '../../components/Button';
import img from '../../image';
import { colors } from '../../theme';
import { TextField } from '../../components/TextField';
import BackButton from '../../navigation/custom/BackButton';

const Login = ({ navigation: { goBack, navigate } }) => {
  return (
    <View style={classes.root}>
      <View style={classes.headerRoot}>
        <BackButton goBack={() => goBack()} />
      </View>
      <View style={classes.bodyRoot}>
        <Title style={classes.bodyTitle}>Login</Title>
        <TextField label="Mobile Number" />
        <TextField label="Password" />
        <Button label="Sign In" />
      </View>
      <View style={classes.footerRoot}>
        <View style={{flexGrow: 1}} />
        <View style={classes.signupRoot}>
          <Subheading style={classes.signupLeft}>
            Don't Have An Account Yet?
            <TouchableOpacity onPress={() => navigate("Register")} >
              <Subheading style={classes.signupRight}> Sign Up.</Subheading>
            </TouchableOpacity>
          </Subheading>
        </View>
      </View>
    </View>
  );
}

export default Login;

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
    // borderTopColor: colors.hr,
    // borderTopWidth: 1,
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  hr: {
    borderBottomColor: colors.hr,
    borderBottomWidth: 1,
    height: 10,
  },
  signupRoot: {
    height: 120,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopColor: colors.hr,
    borderTopWidth: 1,
    width: "100%",
    paddingVertical: 20
  },
  signupRight: {
    color: colors.red.main,
  },
  signupLeft: {
    color: colors.grey.main,
  },
});