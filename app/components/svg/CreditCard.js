import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgCreditCard(props) {
  return (
    <Svg
      width={14}
      height={14}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12.25 2.333H1.75c-.644 0-1.167.523-1.167 1.167v7c0 .644.523 1.167 1.167 1.167h10.5c.644 0 1.167-.523 1.167-1.167v-7c0-.644-.523-1.167-1.167-1.167zM.583 5.833h12.834"
        stroke="red"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgCreditCard;
