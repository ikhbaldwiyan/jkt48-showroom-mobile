import React from "react";
import { SvgXml } from "react-native-svg";

const GooglePlayIcon = () => {
  return (
    <SvgXml
      xml={`
        <svg width="62" height="62" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.2484 10.9828L4.9031 0.609375L18.0656 8.16562L15.2484 10.9828ZM2.2031 0C1.59373 0.31875 1.18591 0.9 1.18591 1.65469V22.3406C1.18591 23.0953 1.59373 23.6766 2.2031 23.9953L14.2312 11.9953L2.2031 0ZM22.1344 10.575L19.3734 8.97656L16.2937 12L19.3734 15.0234L22.1906 13.425C23.0344 12.7547 23.0344 11.2453 22.1344 10.575ZM4.9031 23.3906L18.0656 15.8344L15.2484 13.0172L4.9031 23.3906Z" fill="white"/>
        </svg>
      `}
    />
  );
};

export default GooglePlayIcon;
