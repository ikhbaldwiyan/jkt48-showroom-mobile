import React from "react";
import { SvgXml } from "react-native-svg";

const WebIcon = ({ size = 65 }) => {
  return (
    <SvgXml
      xml={`
      <svg xmlns="http://www.w3.org/2000/svg" width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
    `}
    />
  );
};

export default WebIcon;
