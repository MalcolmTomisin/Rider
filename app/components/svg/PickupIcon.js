import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgIcPickup(props) {
  return (
    <Svg
      width={13}
      height={13}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M.75 6.417l11.083-5.25-5.25 11.083-1.166-4.667L.75 6.417z"
        stroke="#072D8F"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgIcPickup;
