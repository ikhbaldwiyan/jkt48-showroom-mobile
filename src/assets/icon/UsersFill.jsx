import React from "react";
import { SvgXml } from "react-native-svg";

const UsersFill = ({ size = 16 }) => {
  return (
    <SvgXml
      xml={`
      <svg width=${size} height=${size} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.8 8.50002C6.3475 8.50002 7.6 7.24752 7.6 5.70002C7.6 4.15252 6.3475 2.90002 4.8 2.90002C3.2525 2.90002 2 4.15252 2 5.70002C2 7.24752 3.2525 8.50002 4.8 8.50002ZM6.72 9.30002H6.5125C5.9925 9.55002 5.415 9.70003 4.8 9.70003C4.185 9.70003 3.61 9.55002 3.0875 9.30002H2.88C1.29 9.30002 0 10.59 0 12.18V12.9C0 13.5625 0.5375 14.1 1.2 14.1H8.4C9.0625 14.1 9.6 13.5625 9.6 12.9V12.18C9.6 10.59 8.31 9.30002 6.72 9.30002ZM12 8.50002C13.325 8.50002 14.4 7.42502 14.4 6.10002C14.4 4.77502 13.325 3.70002 12 3.70002C10.675 3.70002 9.6 4.77502 9.6 6.10002C9.6 7.42502 10.675 8.50002 12 8.50002ZM13.2 9.30002H13.105C12.7575 9.42002 12.39 9.50002 12 9.50002C11.61 9.50002 11.2425 9.42002 10.895 9.30002H10.8C10.29 9.30002 9.82 9.44753 9.4075 9.68502C10.0175 10.3425 10.4 11.215 10.4 12.18V13.14C10.4 13.195 10.3875 13.2475 10.385 13.3H14.8C15.4625 13.3 16 12.7625 16 12.1C16 10.5525 14.7475 9.30002 13.2 9.30002Z" fill="white"/>
      </svg>
    `}
    />
  );
};

export default UsersFill;
