import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Title, Subheading, Caption} from 'react-native-paper';
import {Button} from '../../components/Button';
import img from '../../image';
import {colors} from '../../theme';
import {TextField} from '../../components/TextField';
import BackButton from '../../navigation/custom/BackButton';
import {
  boundSignUpName,
  boundSetEmail,
  boundSetLastName,
  boundSetPassword,
} from '../../store';
import constants from '../../utils/constants';
import {connect} from 'react-redux';

const Register = (props) => {
  const {
    navigation: {goBack, navigate},
  } = props;
  let {signUp} = props;
  const handleLogin = () => {
    navigate('Login');
  };

  //handles text input for name field
  const handleInput = (type, input) => {
    if (type === 1) {
      boundSignUpName({firstName: input});
    }
    if (type === 2) {
      boundSetLastName({lastName: input});
    }
    if (type === 3) {
      boundSetEmail({email: input});
    }
    if (type === 4) {
      boundSetPassword({password: input});
    }
  };

  if (constants.IS_IOS) {
    return (
      <KeyboardAvoidingView enabled behavior="padding" style={{flex: 1}}>
        <View style={classes.headerRoot}>
          <BackButton goBack={() => goBack()} />
        </View>
        <View style={classes.bodyRoot}>
          <Title style={classes.bodyTitle}>Create Account</Title>
          <TextField
            label="First Name"
            onChangeText={(text) => handleInput(1, text)}
            value={signUp.firstName}
          />
          <TextField
            label="Last Name"
            onChangeText={(text) => handleInput(2, text)}
            value={signUp.lastName}
          />
          <TextField
            label="Email Address"
            onChangeText={(text) => handleInput(3, text)}
            value={signUp.email}
          />
          <TextField
            label="Password"
            onChangeText={(text) => handleInput(4, text)}
            value={signUp.password}
            password
          />
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
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <ScrollView
        contentContainerStyle={{flex: 1, height: constants.DEVICE_HEIGHT}}>
        <View style={classes.headerRoot}>
          <BackButton goBack={() => goBack()} />
        </View>
        <View style={classes.bodyRoot}>
          <Title style={classes.bodyTitle}>Create Account</Title>
          <TextField
            label="First Name"
            onChangeText={(text) => handleInput(1, text)}
          />
          <TextField
            label="Last Name"
            onChangeText={(text) => handleInput(2, text)}
          />
          <TextField
            label="Email Address"
            onChangeText={(text) => handleInput(3, text)}
          />
          <TextField
            label="Password"
            onChangeText={(text) => handleInput(4, text)}
          />
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
      </ScrollView>
    );
  }
};

const MapStateToProps = (state) => {
  return {signUp: state.signup};
};

export default connect(MapStateToProps, {
  boundSignUpName,
  boundSetEmail,
  boundSetLastName,
  boundSetPassword,
})(Register);

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
