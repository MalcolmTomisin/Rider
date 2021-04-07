import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgPhoneOutline(props) {
  return (
    <Svg
      width={22}
      height={22}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M21 15.92v3a2.002 2.002 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.499 19.499 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 013.11 1h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a15.999 15.999 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0121 15.92z"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgPhoneOutline;
