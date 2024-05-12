import React from "react";
import { SvgXml } from "react-native-svg";

const LoginIcon = ({ size = 20 }) => {
  return (
    <SvgXml
      xml={`
      <svg width=${size} height=${size} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0625 4.875C8.81386 4.875 8.5754 4.97377 8.39959 5.14959C8.22377 5.3254 8.125 5.56386 8.125 5.8125V7.375C8.125 7.72018 7.84518 8 7.5 8C7.15482 8 6.875 7.72018 6.875 7.375V5.8125C6.875 5.23234 7.10547 4.67594 7.5157 4.2657C7.92594 3.85547 8.48234 3.625 9.0625 3.625H15.3125C15.8927 3.625 16.4491 3.85547 16.8593 4.2657C17.2695 4.67594 17.5 5.23234 17.5 5.8125V15.1875C17.5 15.7677 17.2695 16.3241 16.8593 16.7343C16.4491 17.1445 15.8927 17.375 15.3125 17.375H9.375C8.78813 17.375 8.18633 17.1431 7.72845 16.7843C7.27296 16.4274 6.875 15.873 6.875 15.1875V13.625C6.875 13.2798 7.15482 13 7.5 13C7.84518 13 8.125 13.2798 8.125 13.625V15.1875C8.125 15.3649 8.2331 15.5917 8.49939 15.8004C8.76328 16.0071 9.09898 16.125 9.375 16.125H15.3125C15.5611 16.125 15.7996 16.0262 15.9754 15.8504C16.1512 15.6746 16.25 15.4361 16.25 15.1875V5.8125C16.25 5.56386 16.1512 5.3254 15.9754 5.14959C15.7996 4.97377 15.5611 4.875 15.3125 4.875H9.0625Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8081 6.93306C11.0521 6.68898 11.4479 6.68898 11.6919 6.93306L14.8169 10.0581C15.061 10.3021 15.061 10.6979 14.8169 10.9419L11.6919 14.0669C11.4479 14.311 11.0521 14.311 10.8081 14.0669C10.564 13.8229 10.564 13.4271 10.8081 13.1831L12.8661 11.125H3.125C2.77982 11.125 2.5 10.8452 2.5 10.5C2.5 10.1548 2.77982 9.875 3.125 9.875H12.8661L10.8081 7.81694C10.564 7.57286 10.564 7.17714 10.8081 6.93306Z" fill="white"/>
      </svg>
    `}
    />
  );
};

export default LoginIcon;
