import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgDelivery(props) {
  return (
    <Svg
      width={13}
      height={13}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M.75 6.583l11.083 5.25L6.583.75 5.417 5.417.75 6.583z"
        stroke="#1E9B0E"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgDelivery;
