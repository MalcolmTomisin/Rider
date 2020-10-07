import React from 'react' 
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useSelector } from "react-redux";

const BackButton = ({goBack, color}) => {
  const theme = useSelector(({theme}) => theme);
  return (
    <TouchableOpacity style={classes.root} onPress={() => goBack()}>
      <Icon
        name="chevron-left"
        size={30}
        color={color ? color : theme.dark ? '#FFF' : 'black'}
      />
    </TouchableOpacity>
  );
};

BackButton.defaultProps = {
  color: null
}

export default BackButton



const classes = StyleSheet.create({
  root: {
    marginLeft: 20,
  },
  img: {
    height: 15,
    width: 9,
  },
});