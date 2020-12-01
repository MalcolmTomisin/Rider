import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Animated,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../theme';

const mode = new Animated.Value(0);
const buttonSize = new Animated.Value(1);

const NavButton = ({onPress}) => {
  //console.log('onPress', onPress);

  return (
    <TouchableOpacity
      // underlayColor="#7F58FF"
      onPress={onPress}
      style={{position: 'absolute', alignItems: 'center'}}>
      <Animated.View style={[styles.button]}>
        <Animated.View>
          <Icon name="home-outline" size={34} color="#FFF" />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};
export default NavButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.green,
    position: 'absolute',
    marginTop: -50,
    shadowColor: 'gray',
    shadowRadius: 5,
    shadowOffset: {height: 10},
    shadowOpacity: 0.3,
    // borderWidth: 3,
    // borderColor: '#FFFFFF',
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
