import React from 'react';
import {TextField} from '../../../components/TextField';
import {View, StyleSheet, Text} from 'react-native';
import {Caption} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from '../../../components/Button';
import BackButton from '../../../navigation/custom/BackButton';
import {makeNetworkCalls, validateEmail} from '../../../utils';
import {api} from '../../../api';
import {feedbackAction} from '../../../store/actions';
import {Loading} from '../../../components/Loading';
import constants from '../../../utils/constants';
import {colors} from '../../../theme';
import {FeedBack} from '../../../components/Feedback';
const {DEVICE_HEIGHT} = constants;

const ForgotPassword = ({navigation: {navigate}}) => {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const submit = () => {
    if (!validateEmail(email)) {
      dispatch(
        feedbackAction.launch({
          open: true,
          severity: 'w',
          msg: 'invalid email',
        }),
      );
      return;
    }
    setLoading(true);
    makeNetworkCalls({
      url: api.validateEmail,
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      data: {
        email,
      },
    })
      .then((res) => {
        const {msg} = res.data;
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        navigate("OTP", {email});
      })
      .catch((err) => {
        if (err.response) {
          const {msg} = err.response;
          dispatch(feedbackAction.launch({open: true, severity: 'w', msg}));
          return;
        }
        dispatch(
          feedbackAction.launch({open: true, severity: 'w', msg: `${err}`}),
        );
      })
      .finally(() => setLoading(false));
  };
  return (
    <View style={styles.container}>
      <View style={styles.backbutton}>
        <BackButton />
      </View>
      <View style={styles.body}>
        <Caption style={styles.header}>Forgot Password?</Caption>

        <TextField
          label="Enter Email Address"
          value={email}
          placeholder=""
          keyboardType="email-address"
          placeholderTextColor="grey"
          onChangeText={(input) => {
            setEmail(input);
          }}
          rootStyle={{marginHorizontal: 20}}
          TextFieldStyle={{
            height: 54,
          }}
        />
      </View>
      <View style={{marginHorizontal: 20}}>
        <Button label="Recover Account" onPress={submit} />
      </View>

      <Loading visible={loading} size="large" />
      <FeedBack />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  header: {
    fontSize: 26,
    lineHeight: 35,
    color: colors.white,
    marginLeft: 20,
  },
  body: {
    justifyContent: 'space-evenly',
    height: DEVICE_HEIGHT * 0.4,
  },
  backbutton: {
    marginLeft: -10,
    marginTop: 20,
  },
});
