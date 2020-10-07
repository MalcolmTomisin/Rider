import React from 'react';
import { View, StyleSheet } from "react-native";
import { colors } from '../../../theme';


const Indicator = ({ rootStyle }) => {
  return <View style={[classes.root, rootStyle]} />;
}

export default Indicator;


const classes = StyleSheet.create({
  root: {
    borderRadius: 20,
    width: 10,
    height: 10,
    backgroundColor: colors.red.main,
    position: "absolute",
    left: 20
  }
});