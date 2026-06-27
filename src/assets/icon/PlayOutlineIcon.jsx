import React from "react";
import { SvgXml } from "react-native-svg";

const PlayOutlineIcon = () => {
  return (
    <SvgXml
      xml={`
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          width="28"
          height="28"
        >
          <!-- Border circle -->
          <circle
            cx="320"
            cy="320"
            r="240"
            fill="none"
            stroke="white"
            stroke-width="30"
          />

          <!-- Play icon -->
          <path
            fill="white"
            d="M250 240L410 320L250 400V240Z"
           />
        </svg>
      `}
    />
  );
};

export default PlayOutlineIcon;
