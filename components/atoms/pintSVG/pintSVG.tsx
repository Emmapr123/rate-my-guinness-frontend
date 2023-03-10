import * as React from "react";
import Svg, { Path } from "react-native-svg";

function PintSVG(props: any) {
  const { height = 20, width = 20, color = "gold" } = props;
  
  return (
    <Svg
      width={height}
      height={width}
      viewBox="0 0 76 76"
      xmlns="http://www.w3.org/2000/svg"
      baseProfile="full"
      {...props}
    >
      <Path
        fill={color}
        d="M43.542 56.208l.791-.791H31.667l.791.791h11.084zM38 37.604c1.749 0 2.77-1.376 2.77-3.562 0-2.187-1.021-3.563-2.77-3.563s-2.77 1.377-2.77 3.563 1.021 3.562 2.77 3.562zm0-12.27h7.917c0-1.584-1.188-3.167-1.188-3.167H31.27s-1.187 1.583-1.187 3.166H38zm0-4.75h9.5c1.583 3.166 1.583 7.916 1.583 9.5 0 12.666-3.166 12.666-3.562 19L45.917 57c0 1.583-1.584 1.583-1.584 1.583H31.667s-1.584 0-1.584-1.583l.396-7.917c-.396-6.333-3.562-6.333-3.562-19 0-1.583 0-6.333 1.583-9.5H38zm7.125 12.666h-1.583c-.438 0-1.188.354-1.188.792 0 .437.75.791 1.188.791h1.583a.792.792 0 100-1.583zm-14.25 0a.792.792 0 100 1.583h1.583c.438 0 1.188-.354 1.188-.791 0-.438-.75-.792-1.188-.792h-1.583z"
      />
    </Svg>
  );
}

export default PintSVG;
