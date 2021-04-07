import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {TouchableOpacity} from 'react-native';

function SvgMapPin(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 13a3 3 0 100-6 3 3 0 000 6z"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    </TouchableOpacity>
  );
}

export default SvgMapPin;
