import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Title, Subheading, Paragraph} from 'react-native-paper';
import { Button } from '../../../components/Button';
import { colors } from '../../../theme';
import { useSelector } from "react-redux";
import OTPTextInput from "react-native-otp-textinput";

const ConfirmPickupCode = ({navigation: {goBack, navigate}}) => {
  const { dark } = useSelector(({ theme }) => theme);
  const [value, setValue] = React.useState("");

  const handleTextChange = (value) => {
    setValue(value);
  }

  return (
    <View style={classes.root}>
      <View style={classes.bodyRoot}>
        <Subheading style={classes.chnageNumber}>
          Enter Pickup code sent
        </Subheading>

        <OTPTextInput
          handleTextChange={handleTextChange}
          tintColor={colors.red.main}
          textInputStyle={[
            classes.textStyle,
            {color: dark ? colors.white : colors.black},
          ]}
          containerStyle={classes.containerStyle}
        />
        <View>
          <Button label="Confirm Code" onPress={() => navigate('Rate')} />
        </View>
      </View>
      <View style={classes.footerRoot} />
    </View>
  );
};

export default ConfirmPickupCode;

const classes = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bodyRoot: {
    flex: 3,
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

  footerRoot: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});