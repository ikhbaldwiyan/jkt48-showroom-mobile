import React from "react";
import { SvgXml } from "react-native-svg";

const HistoryFill = () => {
  return (
    <SvgXml
      xml={`
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 2C18.023 2 22.5 6.477 22.5 12C22.5 17.523 18.023 22 12.5 22C10.798 22 9.195 21.575 7.792 20.825L2.5 22L3.676 16.71C2.926 15.306 2.5 13.703 2.5 12C2.5 6.477 6.977 2 12.5 2ZM13.5 7H11.5V14H17.5V12H13.5V7Z" fill="#24A2B7"/>
        </svg>
      `}
    />
  );
};

export default HistoryFill;
