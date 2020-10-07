import React from 'react';
import { View, Image, StyleSheet } from "react-native";
import img from "../../../image";

const Star = ({ size, number }) => {
  const sizeRoot = {height: size, width: size, marginRight: size / 3};
  return (
    <View style={classes.root}>
      {Array(number)
        .fill(6)
        .map((n, i) => (
          <Image key={i} source={img.star} style={[classes.star, sizeRoot]} />
        ))}
    </View>
  );
}

Star.defaultProps = {
  size: 10,
  number: 5,
};

export default Star


const classes = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    height: 10,
    width: 10,
    marginRight: 2,
  },
});