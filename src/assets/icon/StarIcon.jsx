import React from "react";
import { SvgXml } from "react-native-svg";

const StarIcon = () => {
  return (
    <SvgXml
      xml={`
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.8041 2.07496L8.08331 7.59163L1.99581 8.47913C0.904146 8.63746 0.466646 9.98329 1.25831 10.7541L5.66248 15.0458L4.62081 21.1083C4.43331 22.2041 5.58748 23.025 6.55415 22.5125L12 19.65L17.4458 22.5125C18.4125 23.0208 19.5666 22.2041 19.3791 21.1083L18.3375 15.0458L22.7416 10.7541C23.5333 9.98329 23.0958 8.63746 22.0041 8.47913L15.9166 7.59163L13.1958 2.07496C12.7083 1.09163 11.2958 1.07913 10.8041 2.07496Z" fill="yellow"/>
        </svg>
      `}
    />
  );
};

export default StarIcon;
