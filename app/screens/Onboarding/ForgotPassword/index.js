import React from 'react';
import {TextField} from '../../../components/TextField';
import {View, StyleSheet} from 'react-native';
import {Caption} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from '../../../components/Button';
import BackButton from '../../../navigation/custom/BackButton';
import {makeNetworkCalls, validateEmail} from '../../../utils';
import {api} from '../../../api';
import {feedbackAction} from '../../../store/actions';
import {Loading} from '../../../components/Loading';

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
      <View>
        <BackButton />
      </View>
      <View>
        <Caption>Forgot Password?</Caption>

        <TextField
          label="Enter Email Address"
          value={email}
          placeholder=""
          keyboardType="email-address"
          placeholderTextColor="grey"
          onChangeText={(input) => {
            setEmail(input);
          }}
        />
      </View>
      <Button label="Recover Account" onPress={submit} />
      <Loading visible={loading} size="large" />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
