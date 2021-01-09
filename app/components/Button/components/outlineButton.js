import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';

const OutlineButton = ({
  onPress,
  text,
  active,
  textStyle,
  outlineStyle,
  outline,
  containerStyle
}) => (
  <TouchableOpacity onPress={onPress} style={[{height: 52}, containerStyle]}>
    <View style={[styles.border, outlineStyle]}>
      {text && (
        <Text
          style={[
            textStyle,
          ]}>{`${text}`}</Text>
      )}
    </View>
  </TouchableOpacity>
);

OutlineButton.defaultProps = {
  active: true,
  textStyle: {textAlign: 'center', fontSize: 14, fontWeight: 'bold'},
};
const styles = StyleSheet.create({
  border: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 9,
    justifyContent: 'center',
    padding: 3,
  },
});

export default OutlineButton;
