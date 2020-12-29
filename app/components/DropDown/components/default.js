import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import constants from '../../../utils/constants';
import {useSelector} from 'react-redux';
import {colors} from '../../../theme';
import {Caption, Subheading} from 'react-native-paper';

const {DEVICE_WIDTH} = constants;
const Default = ({
  data,
  selectedValue,
  onValueChange,
  containerStyle,
  label,
  rootStyle,
}) => {
  const {dark} = useSelector(({theme}) => theme);
  return (
    <View style={[rootStyle]}>
      <Subheading style={styles.label}>{label}</Subheading>
      <View
        style={[
          containerStyle,
          styles.border,
          {
            borderColor: dark ? colors.white : colors.black,
            padding: 10,
          },
        ]}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          dropdownIconColor={dark ? colors.white : colors.grey.dark}
          style={{
            height: 54,
            width: DEVICE_WIDTH * 0.9,
            color: dark ? colors.white : colors.grey.dark,
            
          }}>
          {data.map((v, i) => (
            <Picker.Item key={i} label={v.name} value={v.code} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default Default;

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderRadius: 6,
  },
  label: {
    fontSize: 16,
    padding: 0,
    margin: 0,
    fontWeight: '400',
  },
});
