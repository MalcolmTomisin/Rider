import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FAB, Caption} from 'react-native-paper';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';



const MyTabBar = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableHighlight
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <View style={classes.rootTab}>
              {index === 2 && (
                <View style={classes.fabRoot}>
                  <FAB
                    style={classes.fab}
                    icon="home"
                    color="white"
                    // onPress={() => console.log('Pressed')}
                  />
                </View>
              )}

              <View style={classes.otherRoot}>
                {index !== 2 && (
                  <View style={classes.otherIcon}>
                    <Icon name="menu" size={20} />
                    <Caption style={classes.label}>{label}</Caption>
                  </View>
                )}
              </View>
            </View>
          </TouchableHighlight>
        );
      })}
    </View>
  );
}


export default MyTabBar;



const classes = StyleSheet.create({
  rootTab: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f8f4f4',
    borderTopColor: 'rgba(0,0,0,0.19)',
    // borderTopColor: '#E1E1E1',
    borderTopWidth: 1,
  },
  fabRoot: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // backgroundColor: '#F9F9F9',
    // backgroundColor: 'white',
    width: 90,
    height: 90,
    borderRadius: 45,
    bottom: 25,
    zIndex: 2,
  },
  fab: {
    position: 'absolute',
    margin: 15,
    right: 0,
    backgroundColor: '#4DC735',
    bottom: 0,
    width: 59,
    height: 59,
  },
  otherRoot: {
    position: 'absolute',
    backgroundColor: 'white',
    // backgroundColor: 'red',
    bottom: 0,
    zIndex: 1,
    // width: '100%',
    // height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // borderTopColor: 'rgba(0,0,0,0.19)',
    // // borderTopColor: '#E1E1E1',
    // borderTopWidth: 1,
    height: 70,
  },
  otherIcon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginHorizontal: -3,
  },
  label: {
    color: '#404040',
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: -0.11,
  },
});







































// import React from 'react';
// import PropTypes from 'prop-types';

// import { Dimensions } from 'react-native';
// import Svg, { G, Path, Rect } from 'react-native-svg';

// const AppbarBottomSVG = ({
//   paddingHorizontal,
//   width,
//   backgroundColor,
//   fabPosition,
// }) => {
//   if (!width) {
//     width = Dimensions.get('screen').width - paddingHorizontal;
//   }

//   const widthOfPath = 92;

//   let rectWidth = width / 2 - widthOfPath / 2;
//   let middlePosition = width / 2 - widthOfPath / 2;
//   let rightPosition = width / 2 + widthOfPath / 2;

//   if (fabPosition == 'end') {
//     rectWidth = width - widthOfPath;
//     middlePosition = width - widthOfPath;
//   }

//   return (
//     <Svg width={'100%'} height={56} style={{ position: 'absolute' }}>
//       <Rect
//         height={56}
//         width={rectWidth + 1}
//         fill={backgroundColor}
//         x={0}
//         y={0}
//       />
//       <G x={middlePosition}>
//         <Path
//           fill={backgroundColor}
//           d="M0 0v56h92V0h-7.125c-1.662 0-3 1.338-3 3h-.025C80.29 21.644 64.71 35.987 46 36c-18.711-.011-34.294-14.354-35.854-33h-.033c0-1.662-1.338-3-3-3H0z"
//           fillRule="evenodd"
//         />
//       </G>
//       {fabPosition == 'end' ? null : (
//         <Rect
//           height={56}
//           width={rectWidth + 1}
//           fill={backgroundColor}
//           x={rightPosition - 1}
//           y={0}
//         />
//       )}
//     </Svg>
//   );
// };

// AppbarBottomSVG.propTypes = {
//   paddingHorizontal: PropTypes.number,
//   width: PropTypes.number,
//   backgroundColor: PropTypes.string,
//   fabPosition: PropTypes.string,
// };

// export default AppbarBottomSVG;