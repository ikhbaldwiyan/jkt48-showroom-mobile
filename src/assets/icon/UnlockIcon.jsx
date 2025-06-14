import React from "react";
import { SvgXml } from "react-native-svg";

const UnlockIcon = ({ size = 22 }) => {
  return (
    <SvgXml
      xml={`
        <svg width=${size} height=${size} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 7H13.25V4.75C13.25 2.13125 11.1188 0 8.5 0C5.88125 0 3.75 2.13125 3.75 4.75V7H3C2.17188 7 1.5 7.67188 1.5 8.5V14.5C1.5 15.3281 2.17188 16 3 16H14C14.8281 16 15.5 15.3281 15.5 14.5V8.5C15.5 7.67188 14.8281 7 14 7ZM10.75 7H6.25V4.75C6.25 3.50937 7.25937 2.5 8.5 2.5C9.74063 2.5 10.75 3.50937 10.75 4.75V7Z" fill="white"/>
        </svg>
      `}
    />
  );
};

export default UnlockIcon;
