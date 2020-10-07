import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import { colors } from '../../../theme';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Caption } from 'react-native-paper';

const Switch = () => {
  return (
    <TouchableOpacity style={classes.root}>
      <Caption style={classes.title}>Online</Caption>
      <View style={classes.iconbg}>
        <Icon name="bike" size={20} />
      </View>
    </TouchableOpacity>
  );
}

export default Switch;

const classes = StyleSheet.create({
  root: {
    width: 90,
    height: 40,
    borderRadius: 30,
    backgroundColor: colors.red.main,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconbg: {
    backgroundColor: colors.white,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  title: {
    color: colors.white,
    marginLeft: 5,
  },
});