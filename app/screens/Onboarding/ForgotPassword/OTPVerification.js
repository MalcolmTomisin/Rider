import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Title, Subheading, Caption, Paragraph} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from '../../../components/Button';
import BackButton from '../../../navigation/custom/BackButton';
import {makeNetworkCalls, validateEmail} from '../../../utils';
import {api} from '../../../api';
import {feedbackAction} from '../../../store/actions';
import {Loading} from '../../../components/Loading';
import constants from '../../../utils/constants';
import {colors} from '../../../theme';
import OTPTextInput from 'react-native-otp-textinput';
import CountDown from 'react-native-countdown-component';

const OTPVerification = ({
  navigation: {navigate, goBack},
  route: {
    params: {email},
  },
}) => {
  const [value, setValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [id, setId] = React.useState('1');
  const [running, setRunning] = React.useState(false);
  const dispatch = useDispatch();

  const handleTextChange = (value) => {
    setValue(value);
  };

  const sendForOTP = () => {
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
        setId(`${Math.random()}`);
        setRunning(true);
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

  const submit = () => {
    if (value.length !== 4) {
      dispatch(
        feedbackAction.launch({
          open: true,
          severity: 'w',
          msg: 'please fill the otp',
        }),
      );
      return;
    }
    setLoading(true);
    makeNetworkCalls({
      url: api.validateOTP,
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      data: {
        otp: value,
        email,
      },
    })
      .then((res) => {
        const {msg} = res.data;
        dispatch(feedbackAction.launch({open: true, severity: 's', msg}));
        navigate('reset');
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
        setLoading(false);
      });
  };

  return (
    <View style={classes.root}>
      <View style={classes.headerRoot}>
        <BackButton goBack={() => goBack()} />
      </View>
      <View style={classes.bodyRoot}>
        <View>
          <View>
            <Title style={classes.bodyTitle}>OTP Verification </Title>
            <Paragraph style={classes.bodyTitleDetails}>
              Enter the 4-digit code sent to you at
            </Paragraph>
          </View>

          <View style={classes.chnageNumberRoot}>
            <Subheading style={classes.chnageNumber}>{email}</Subheading>
          </View>
        </View>

        <OTPTextInput
          handleTextChange={handleTextChange}
          tintColor={colors.red.main}
          textInputStyle={classes.textStyle}
          containerStyle={classes.containerStyle}
          value={value}
        />
        <View>
          <Button label="Submit" onPress={submit} />

          <View style={classes.resendRoot}>
            <Subheading style={classes.resendRootText}>
              Resend Code in{' '}
            </Subheading>
            <TouchableOpacity disabled={disabled} onPress={sendForOTP}>
              <CountDown
                id={id}
                until={90}
                timeToShow={['M', 'S']}
                onFinish={() => {
                  setDisabled(!disabled);
                }}
                digitStyle={{backgroundColor: 'transparent'}}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: -10,
                }}
                timeLabels={{m: '', s: ''}}
                digitTxtStyle={{color: colors.red.main, fontSize: 18}}
                showSeparator
                separatorStyle={{color: colors.red.main}}
                running={running}
                //running={timerIsRunning}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={classes.footerRoot} />
      <Loading visible={loading} size="large" />
    </View>
  );
};

export default OTPVerification;

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bodyRoot: {
    flex: 5,
    marginHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  bodyTitle: {
    fontSize: 28,
  },
  bodyTitleDetails: {
    fontSize: 14,
    color: colors.grey.main,
    fontWeight: '300',
  },
  chnageNumberRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },
  chnageNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.grey.main,
  },
  chnageNumberButton: {
    fontSize: 20,
    fontWeight: '300',
    color: colors.red.main,
  },
  content: {
    fontWeight: '200',
  },
  contentRed: {
    fontWeight: '200',
    color: colors.red.main,
  },
  textStyle: {
    fontSize: 70,
    marginVertical: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    textAlign: 'center',
    width: 70,
    height: 90,
    fontWeight: '500',
  },
  containerStyle: {},
  resendRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  resendRootText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.grey.main,
  },
  resendRootCount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.red.main,
  },
  footerRoot: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});
