import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Title, Subheading} from 'react-native-paper';
import {Button} from '../../components/Button';
import img from '../../image';
import {colors} from '../../theme';
import {TextField} from '../../components/TextField';
import BackButton from '../../navigation/custom/BackButton';
import {useSelector, useDispatch} from 'react-redux';
import {setSignInToken} from '../../store/actions/signUp';
import {validateEmail} from '../../utils';
import {api} from '../../api';
import feedbackAction from '../../store/actions/feedback';
import {FeedBack} from '../../components/Feedback';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from '../../components/Loading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import constants from '../../utils/constants';
import {accountAction} from '../../store/actions';
import {makeNetworkCalls} from '../../utils';

const Login = ({navigation: {goBack, navigate}}) => {
  const dispatch = useDispatch();
  const {signedIn} = useSelector(({signup}) => signup);
  const {loading} = useSelector(({account}) => account);
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({mobileNumber: '', password: ''});

  const handleInput = (type, input) => {
    if (type === 1) {
      setError({...error, mobileNumber: null});
      setMobileNumber(input);
    }
    if (type === 2) {
      setError({...error, password: null});
      setPassword(input);
    }
  };

  const handleErrors = (type) => {
    if (type === 1) {
      if (!validateEmail(mobileNumber) && mobileNumber.length !== 11) {
        setError({...error, mobileNumber: 'Invalid input'});
      }
    }
    if (type === 2) {
      if (password.length < 6) {
        setError({
          ...error,
          password: 'Password must be at least 6 characters',
        });
      }
    }
  };

  const submit = () => {
    if (!error.mobileNumber && !error.password) {
      dispatch(accountAction.setLoadingStatus({loading: true}));
      makeNetworkCalls({
        url: api.login,
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        data: {email: mobileNumber.trim(), password: password.trim()},
      })
        .then(async (res) => {
          const {msg, data} = res.data;
          await AsyncStorage.multiSet([
            ['x-auth-token', res.headers['x-auth-token']],
            [api.userAuthKey, JSON.stringify(true)],
            ['userDetails', JSON.stringify(data)],
          ]);
          dispatch(setSignInToken({signedIn: true}));
          dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
          dispatch(accountAction.setUserData({user: data}));
          dispatch(accountAction.setOnline({isOnline: data.onlineStatus}));
          navigate('Dashboard', {screen: 'Home'});
        })
        .catch((err) => {
          if (err.response) {
            const {msg} = err.response.data;
            dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
            return;
          }
          dispatch(
            feedbackAction.launch({open: true, severity: 'w', msg: `${err}`}),
          );
        })
        .finally(() => {
          dispatch(accountAction.setLoadingStatus({loading: false}));
        });
    }
  };

  return (
    <KeyboardAwareScrollView
      style={classes.root}
      contentContainerStyle={{marginTop: constants.DEVICE_HEIGHT * 0.1}}>
      <View style={classes.headerRoot}>
        <BackButton goBack={() => goBack()} />
      </View>
      <View style={classes.bodyRoot}>
        <Title style={classes.bodyTitle}>Login</Title>
        <TextField
          label="Mobile Number"
          value={mobileNumber}
          placeholder="+234"
          placeholderTextColor="grey"
          onChangeText={(input) => {
            handleInput(1, input);
          }}
        />
        <View>
          <TextField
            label="Password"
            value={password}
            secureTextEntry
            placeholder="Enter password"
            placeholderTextColor="grey"
            onChangeText={(input) => {
              handleInput(2, input);
            }}
            password
            rootStyle={{marginBottom: 10}}
          />
          <Text
            style={{
              position: 'absolute',
              top: 8,
              right: 0,
              fontSize: 12,
              color: colors.red.main,
            }}>
            Forgot Password?
          </Text>
        </View>

        <Button label="Sign In" onPress={submit} />
      </View>
      <View style={classes.footerRoot}>
        <View style={{flexGrow: 1}} />
        <View style={classes.signupRoot}>
          <Subheading style={classes.signupLeft}>
            Don't Have An Account Yet?
            <Subheading
              style={classes.signupRight}
              onPress={() => navigate('Register')}>
              {' '}
              Sign Up.
            </Subheading>
          </Subheading>
        </View>
      </View>
      <FeedBack />
      <Loading visible={loading} size="large" />
    </KeyboardAwareScrollView>
  );
};

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
