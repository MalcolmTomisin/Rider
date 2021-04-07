import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={30}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M14.528.944A10.037 10.037 0 004.49 10.98c0 5.543 10.037 17.531 10.037 17.531s10.036-11.988 10.036-17.53A10.037 10.037 0 0014.528.943z"
        fill="#0BD236"
      />
      <Path
        d="M14.528 28.714a.204.204 0 01-.156-.072C13.96 28.15 4.288 16.532 4.288 10.98a10.24 10.24 0 0120.479 0c0 5.555-9.672 17.17-10.084 17.662a.202.202 0 01-.155.072zm0-27.568a9.845 9.845 0 00-9.834 9.834c0 5.032 8.565 15.666 9.834 17.213 1.268-1.547 9.834-12.18 9.834-17.213a9.845 9.845 0 00-9.834-9.834z"
        fill="#323C6B"
      />
      <Path
        d="M19.87 15.17a6.786 6.786 0 01-10.686 0 4.074 4.074 0 013.576-2.814 2.646 2.646 0 003.535 0 4.074 4.074 0 013.576 2.813z"
        fill="#072D8F"
      />
      <Path
        d="M14.528 17.975a6.945 6.945 0 01-5.503-2.68.202.202 0 01-.033-.19 4.297 4.297 0 013.744-2.95.203.203 0 01.16.05 2.443 2.443 0 003.263 0 .203.203 0 01.16-.05 4.297 4.297 0 013.744 2.95.204.204 0 01-.033.19 6.942 6.942 0 01-5.502 2.68zM9.413 15.13a6.582 6.582 0 0010.23 0 3.845 3.845 0 00-3.284-2.562 2.85 2.85 0 01-3.665 0 3.845 3.845 0 00-3.281 2.563z"
        fill="#323C6B"
      />
      <Path
        d="M21.324 10.982a6.742 6.742 0 01-1.451 4.188 4.074 4.074 0 00-3.576-2.814 2.645 2.645 0 01-3.535 0 4.074 4.074 0 00-3.576 2.813 6.792 6.792 0 1112.138-4.187z"
        fill="#fff"
      />
      <Path
        d="M19.871 15.372c-.012 0-.023 0-.035-.003a.202.202 0 01-.158-.136 3.846 3.846 0 00-3.318-2.665 2.85 2.85 0 01-3.665 0 3.845 3.845 0 00-3.318 2.665.203.203 0 01-.351.061 6.901 6.901 0 01-1.496-4.313 6.997 6.997 0 0113.995 0 6.901 6.901 0 01-1.495 4.313.203.203 0 01-.159.078zm-3.576-3.219h.024a4.308 4.308 0 013.61 2.598 6.493 6.493 0 001.19-3.77 6.592 6.592 0 00-13.183 0 6.493 6.493 0 001.19 3.77 4.309 4.309 0 013.61-2.598.202.202 0 01.16.051 2.443 2.443 0 003.264 0 .202.202 0 01.137-.05h-.002z"
        fill="#323C6B"
      />
      <Path
        d="M14.528 11.826a2.675 2.675 0 100-5.35 2.675 2.675 0 000 5.35z"
        fill="#072D8F"
      />
      <Path
        d="M14.528 12.03a2.879 2.879 0 110-5.758 2.879 2.879 0 010 5.757zm0-5.352a2.473 2.473 0 100 4.943 2.473 2.473 0 000-4.942v-.001zM6.649 19.846a.202.202 0 01-.174-.098 40.26 40.26 0 01-1.756-3.21.202.202 0 11.365-.176c.474.98 1.059 2.05 1.738 3.177a.203.203 0 01-.173.307zM4.512 15.817a.203.203 0 01-.185-.121c-.076-.172-.147-.342-.217-.511a.203.203 0 01.374-.156c.069.167.139.334.213.502a.203.203 0 01-.185.284v.002zM25.745 10.344a.202.202 0 01-.202-.187A10.946 10.946 0 0024.388 6a.203.203 0 01.362-.183 11.35 11.35 0 011.198 4.308.203.203 0 01-.187.217l-.016.002zM25.681 12.295c-.01 0-.022 0-.033-.003a.203.203 0 01-.167-.232c.029-.176.052-.35.068-.519a.204.204 0 01.405.038c-.016.178-.04.361-.072.546a.203.203 0 01-.2.17z"
        fill="#323C6B"
      />
      <Path
        d="M7.005 7.493a.264.264 0 01-.235-.381 8.701 8.701 0 012.105-2.7.263.263 0 11.344.399A8.182 8.182 0 007.24 7.348a.263.263 0 01-.236.145zM10.262 4.002a.263.263 0 01-.135-.49c.137-.081.277-.156.418-.23a.264.264 0 11.243.467c-.133.07-.264.14-.393.216a.264.264 0 01-.133.037z"
        fill="#fff"
      />
    </Svg>
  );
}
