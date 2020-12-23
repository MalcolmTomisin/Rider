import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Title, Subheading, Caption, Paragraph} from 'react-native-paper';
import { Button } from '../../components/Button';
import img from '../../image';
import { colors } from '../../theme';
import { TextField } from '../../components/TextField';
import BackButton from '../../navigation/custom/BackButton';
import OTPTextInput from "react-native-otp-textinput";

const Verification = ({navigation: {goBack, navigate}}) => {
  const [value, setValue] = React.useState("");


  const handleTextChange = (value) => {
    setValue(value);
  }

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
            <Subheading style={classes.chnageNumber}>
              +234 812 178 4611{' '}
            </Subheading>
            <TouchableOpacity>
              <Subheading style={classes.chnageNumberButton}>Change</Subheading>
            </TouchableOpacity>
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
          <Button
            label="Submit"
            onPress={() => navigate('VerificationCompleted')}
          />

          <View style={classes.resendRoot}>
            <Subheading style={classes.resendRootText}>
              Resend Code in{' '}
            </Subheading>
            <TouchableOpacity>
              <Subheading style={classes.resendRootCount}>01:05</Subheading>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={classes.footerRoot} />
    </View>
  );
};

export default Verification;

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