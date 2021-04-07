import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgMarkerOutline(props) {
  return (
    <Svg
      width={10}
      height={10}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M1.25 5.417l7.917 3.75-3.75-7.917-.834 3.333-3.333.834z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgMarkerOutline;
