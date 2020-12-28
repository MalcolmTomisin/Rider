import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import constants from '../../../utils/constants';
import {useSelector} from 'react-redux';
import {colors} from '../../../theme';

const {DEVICE_WIDTH} = constants;
const Default = ({data, selectedValue, onValueChange, containerStyle}) => {
  const {dark} = useSelector(({theme}) => theme);
  return (
    <View
      style={[
        containerStyle,
        styles.border,
        {
          borderColor: dark ? colors.white : colors.black,
          padding: 10,
          backgroundColor: dark ? colors.grey.main : colors.white,
        },
      ]}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{height: 54, width: DEVICE_WIDTH * 0.9}}>
        {data.map((v, i) => (
          <Picker.Item key={i} label={v.name} value={v.code} />
        ))}
      </Picker>
    </View>
  );
};

export default Default;

const styles = StyleSheet.create({
  border: {
    borderWidth: 0.5,
    borderRadius: 6,
  },
});
