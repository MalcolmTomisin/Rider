import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgPhone(props) {
  return (
    <Svg
      width={18}
      height={18}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M3.62 7.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V17c0 .55-.45 1-1 1C7.61 18 0 10.39 0 1c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill="#131313"
      />
    </Svg>
  );
}

export default SvgPhone;
