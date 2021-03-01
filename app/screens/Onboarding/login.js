import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {Title, Subheading} from 'react-native-paper';
import {Button} from '../../components/Button';
import {colors} from '../../theme';
import {TextField} from '../../components/TextField';
import BackButton from '../../navigation/custom/BackButton';
import {useSelector, useDispatch} from 'react-redux';
import {setSignInToken} from '../../store/actions/signUp';
import {validateEmail} from '../../utils';
import {api} from '../../api';
import feedbackAction from '../../store/actions/feedback';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from '../../components/Loading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import constants from '../../utils/constants';
import {accountAction} from '../../store/actions';
import {makeNetworkCalls} from '../../utils';
import ReactNativeCallBack from '../../utils/nativeModule';
import Geolocation from 'react-native-geolocation-service';
var SharedPreferences = require('react-native-shared-preferences');

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

  useEffect(() => {
    SharedPreferences.setName('rider');
  }, []);

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

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
    await handleLocation();
  };

  const handleLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        //console.log('position', position);
        const {latitude, longitude} = position.coords;
        dispatch(accountAction.setLocation(position));
        dispatch(
          accountAction.setNewLocationCoords({
            coordinates: {latitude, longitude},
          }),
        );
        getAddressFromCoordinates(position);
      },
      (error) => {
        // See error code charts below.
        //console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  //reverse geocode coordinates of rider to set address of rider
  const getAddressFromCoordinates = (location) => {
    const {longitude, latitude} = location.coords;
    fetch(
      `${api.reverseGeocode}latlng=${latitude},${longitude}&result_type=street_address&key=${constants.GOOGLE_MAPS_APIKEY}`,
    )
      .then((res) => res.json())
      .then((res) => {
        dispatch(
          accountAction.setAddress({address: res.results[0].formatted_address}),
        );
      })
      .catch((err) => {
        //console.log(err, 'err');
      });
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
          await requestLocationPermission();
          const {msg, data} = res.data;
          // #@api.userAuthKey controls routing based on sign in status on the app,
          // later can be refactored to use token from REST API
          await AsyncStorage.multiSet([
            ['x-auth-token', res.headers['x-auth-token']],
            [api.userAuthKey, JSON.stringify(true)],
            ['userDetails', JSON.stringify(data)],
          ]);
          //passing token to java layer
          if (constants.IS_ANDROID){
            SharedPreferences.setItem(
              'x-auth-token',
              res.headers['x-auth-token'],
            );
            ReactNativeCallBack.startService(res.headers['x-auth-token']);
          }
          dispatch(setSignInToken({signedIn: true}));
          dispatch(
            accountAction.setToken({token: res.headers['x-auth-token']}),
          );
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
      contentContainerStyle={{paddingVertical: 10}}>
      <SafeAreaView style={classes.headerRoot}>
        <BackButton goBack={() => goBack()} />
      </SafeAreaView>
      <View style={classes.bodyRoot}>
        <Title style={classes.bodyTitle}>Login</Title>
        <TextField
          label="Email"
          value={mobileNumber}
          placeholder="yourmail@email.com"
          placeholderTextColor="grey"
          onChangeText={(input) => {
            handleInput(1, input);
          }}
          keyboardType="email-address"
        />
        <View style={{marginVertical: 10}}>
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
            rootStyle={{marginVertical: 10}}
          />
          <Text
            onPress={() => {
              navigate('ForgotPassword');
            }}
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

        <Button
          label="Sign In"
          onPress={() => {
            Alert.alert(
              'Exalt Rider Uses Location Data',
              'This app collects location data to enable Riders and Drivers to be tracked even when the app is closed or not in use, This is important to provide Exalt Courier customers the best experience in getting their package delivered.',
              [
                {text: 'Proceed', onPress: submit},
                {text: 'Cancel', onPress: () => {}},
              ],
              {cancelable: false},
            );
          }}
          rootStyle={{marginTop: 10}}
        />
      </View>
      {/* <View style={classes.footerRoot}>
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
      </View> */}
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
    marginLeft: -8,
  },
  bodyRoot: {
    flex: 4,
    marginHorizontal: 20,
    justifyContent: 'space-evenly',
    marginTop: constants.DEVICE_HEIGHT * 0.1,
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
