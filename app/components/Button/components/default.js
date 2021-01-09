import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Subheading, ActivityIndicator} from 'react-native-paper';
import {colors} from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DefaultButton = ({
  label,
  labelStyle,
  rootStyle,
  onPress,
  loading,
  loadingColor,
  disabled,
  error,
}) => {
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={onPress}
      style={[classes.root, rootStyle]}>
      {loading && (
        <View style={classes.preloader}>
          <ActivityIndicator
            size="small"
            animating={true}
            color={loadingColor}
          />
        </View>
      )}
      {error && <Icon name="reload" size={28} color={colors.white} />}
      <Subheading style={[classes.label, labelStyle]}>{label}</Subheading>
    </TouchableOpacity>
  );
};

DefaultButton.defaultProps = {
  loadingColor: colors.white,
  loading: false,
};

export default DefaultButton;

const classes = StyleSheet.create({
  root: {
    width: '100%',
    height: 53,
    backgroundColor: colors.red.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    color: '#FFF',
    // fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontWeight: '600',
  },
  preloader: {
    marginHorizontal: 5,
  },
});
