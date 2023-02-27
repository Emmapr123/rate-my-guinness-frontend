import * as React from "react";
import Svg, { Path } from "react-native-svg";

function LocationSVG(props: any) {
  const { color = "black", height = 50, width = 50 } = props;
  
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 3a1 1 0 10-2 0v1.062A8.004 8.004 0 004.062 11H3a1 1 0 100 2h1.062A8.004 8.004 0 0011 19.938V21a1 1 0 102 0v-1.062A8.004 8.004 0 0019.938 13H21a1 1 0 100-2h-1.062A8.004 8.004 0 0013 4.062V3zm-3 9a2 2 0 114 0 2 2 0 01-4 0zm2-4a4 4 0 100 8 4 4 0 000-8z"
        fill={color}
      />
    </Svg>
  );
}

export default LocationSVG;
