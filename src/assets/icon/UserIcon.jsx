import React from "react";
import { SvgXml } from "react-native-svg";

const UserIcon = ({ size = 14, color = "white" }) => {
  return (
    <SvgXml
      xml={`
      <svg width=${size} height=${size} viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 8.375C9.17383 8.375 10.9375 6.61133 10.9375 4.4375C10.9375 2.26367 9.17383 0.5 7 0.5C4.82617 0.5 3.0625 2.26367 3.0625 4.4375C3.0625 6.61133 4.82617 8.375 7 8.375ZM10.5 9.25H8.99336C8.38633 9.52891 7.71094 9.6875 7 9.6875C6.28906 9.6875 5.61641 9.52891 5.00664 9.25H3.5C1.5668 9.25 0 10.8168 0 12.75V13.1875C0 13.9121 0.587891 14.5 1.3125 14.5H12.6875C13.4121 14.5 14 13.9121 14 13.1875V12.75C14 10.8168 12.4332 9.25 10.5 9.25Z" fill=${color}/>
      </svg>
    `}
    />
  );
};

export default UserIcon;
