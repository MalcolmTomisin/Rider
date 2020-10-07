import React from 'react';
import {View, StyleSheet, TouchableHighlight, Animated} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default class AddButton extends React.Component {
  mode = new Animated.Value(0);
  buttonSize = new Animated.Value(1);

  render() {
    return (
      <View style={{position: 'absolute', alignItems: 'center'}}>
        <Animated.View style={[styles.button]}>
          <TouchableHighlight underlayColor="#7F58FF">
            <Animated.View>
              <Feather name="user" size={34} color="#FFF" />
            </Animated.View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'red',
    position: 'absolute',
    marginTop: -60,
    shadowColor: 'gray',
    shadowRadius: 5,
    shadowOffset: {height: 10},
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  secondaryButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7F58FF',
  },
});
