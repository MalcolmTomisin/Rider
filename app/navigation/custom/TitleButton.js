import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { Subheading, Title } from 'react-native-paper';

const TitleButton = ({navigate = null, label, labelStyle, rootStyle}) => {
  return navigate ? (
    <TouchableOpacity
      style={[classes.root, rootStyle]}
      onPress={() => navigate()}>
      <Title style={classes.label}>{label}</Title>
    </TouchableOpacity>
  ) : (
    <Subheading style={[classes.label, labelStyle]}>{label}</Subheading>
  );
};

export default TitleButton;

const classes = StyleSheet.create({
  root: {
    marginLeft: 20,
  },
  label: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700"
    // color: '#31991C',
  },
});
