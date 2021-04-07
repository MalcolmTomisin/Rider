import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgStopwatch(props) {
  return (
    <Svg
      width={10}
      height={11}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6.5.5h-3v1h3v-1zM4.5 7h1V4h-1v3zm4.015-3.305l.71-.71a5.524 5.524 0 00-.705-.705l-.71.71A4.48 4.48 0 005 2a4.5 4.5 0 104.5 4.5c0-1.06-.37-2.035-.985-2.805zM5 10a3.497 3.497 0 01-3.5-3.5C1.5 4.565 3.065 3 5 3s3.5 1.565 3.5 3.5S6.935 10 5 10z"
        fill="#131313"
      />
    </Svg>
  );
}

export default SvgStopwatch;
