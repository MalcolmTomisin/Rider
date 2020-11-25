import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';

const AddressBanner = ({}) => {
  const {currentEntry} = useSelector(({delivery}) => delivery);
  const {dark} = useSelector(({theme}) => theme);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: dark ? '#000000' : '#ffffff'},
      ]}>
      <Icon
        name="location-arrow"
        size={15}
        style={{margin: 5}}
        color="#707070"
      />
      <Text style={styles.text}>{`${currentEntry?.pickupAddress}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    zIndex: 6,
    width: 335,
    height: 47,
    borderRadius: 24,
    elevation: 8,
    top: 20,
    left: 20,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#707070',
  },
});

export default AddressBanner;
