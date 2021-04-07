import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {TouchableOpacity} from 'react-native';

function SvgInfo(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 16v-4M12 8h.01"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    </TouchableOpacity>
  );
}

export default SvgInfo;
