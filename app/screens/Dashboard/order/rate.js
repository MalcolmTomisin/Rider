import React from 'react';
import { View, StyleSheet } from "react-native";
import {Rating} from 'react-native-rating-element';
import { Title } from 'react-native-paper';
import { Button } from "../../../components/Button"


const Rate = ({ navigation: { navigate } }) => {
  return (
    <View style={classes.root}>
      <Title style={classes.text}>Leonard Elizabeth</Title>
      <Rating
        rated={4.5}
        totalCount={5}
        ratingColor="#f1c644"
        ratingBackgroundColor="#d4d4d4"
        size={30}
        icon="ios-star"
        direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
      />

      <Button
        label="Rate Client"
        rootStyle={classes.buttonRoot}
        onPress={() => navigate("Home")}
      />
    </View>
  );
}

export default Rate

const classes = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 40,
    alignItems: 'center',
  },
  text: {
    marginVertical: 20,
  },
  buttonRoot: {
    marginVertical: 40,
  },
});