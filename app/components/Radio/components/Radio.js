import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {colors} from '../../../theme';

const Radio = ({selected}) => {
  return (
    <View style={classes.radioRoot}>
      {selected && <View style={classes.radioSelected} />}
    </View>
  );
};

Radio.defaultProps = {
  selected: false,
};

export default Radio;

const classes = StyleSheet.create({
  radioRoot: {
    width: 35,
    height: 35,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.grey.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    width: 20,
    height: 20,
    backgroundColor: colors.red.main,
    borderRadius: 15,
  },
});
