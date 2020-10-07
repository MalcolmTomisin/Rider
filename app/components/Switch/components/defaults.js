import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import { colors } from '../../../theme';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Caption } from 'react-native-paper';

const Switch = () => {
  const [position, setPosition] = React.useState("");
  const [status, setStatus] = React.useState(false);

  return (
    <View style={[classes.root, !status && classes.offlineRoot]}>
      {status ? (
        <TouchableOpacity
          style={[classes.container]}
          onPress={() => setStatus(false)}>
          {/* <Animated.View style={[classes.container]}> */}
          <Caption style={classes.title}>Online</Caption>
          <View style={classes.iconbg}>
            <Icon name="bike" size={20} />
          </View>
          {/* </Animated.View> */}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[classes.container, classes.offline]}
          onPress={() => setStatus(true)}>
          {/* <Animated.View style={[classes.container, classes.offline]}> */}
            <View style={classes.iconbg}>
              <Icon name="bike" size={20} />
            </View>
            <Caption style={[classes.offlineText]}>Offline</Caption>
          {/* </Animated.View> */}
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Switch;

const classes = StyleSheet.create({
  root: {
    width: 90,
    height: 35,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderColor: colors.red.main,
    borderWidth: 2,
    justifyContent: 'center',
  },
  container: {
    width: 87,
    height: 33,
    borderRadius: 30,
    backgroundColor: colors.red.main,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconbg: {
    backgroundColor: colors.white,
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  title: {
    color: colors.white,
    marginLeft: 5,
  },
  offlineRoot: {
    borderColor: colors.grey.main,
    borderWidth: 2,
  },
  offline: {
    backgroundColor: colors.grey.main,
  },
  offlineText: {
    color: colors.black,
    marginRight: 5,
  },
});