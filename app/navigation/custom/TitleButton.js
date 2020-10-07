import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { Subheading } from 'react-native-paper';

const TitleButton = ({navigate=null, label, labelStyle}) => {
  return navigate ? (
    <TouchableOpacity style={classes.root} onPress={() => navigate()}>
      <Subheading style={classes.label}>{label}</Subheading>
    </TouchableOpacity>
  ) : (
    <Subheading style={[classes.label, labelStyle]}>{label}</Subheading>
  );
};

export default TitleButton;

const classes = StyleSheet.create({
  root: {
    marginRight: 20,
  },
  label: {
    fontSize: 16,
    lineHeight: 22,
    // color: '#31991C',
  },
});
