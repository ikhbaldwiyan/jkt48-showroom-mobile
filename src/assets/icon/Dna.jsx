import React from "react";
import { SvgXml } from "react-native-svg";

const Dna = () => {
  return (
    <SvgXml
      xml={`
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.50472 23.161C1.45316 23.6063 1.80003 23.9954 2.25003 23.9954L3.7641 24.0001C4.14378 24.0001 4.46253 23.7235 4.5141 23.3485C4.54691 23.1188 4.59847 22.8282 4.67347 22.5001H19.3125C19.3875 22.8235 19.4485 23.1188 19.4766 23.3485C19.5282 23.7235 19.8469 24.0047 20.2266 24.0001L21.7407 23.9954C22.1907 23.9954 22.5422 23.6063 22.486 23.161C22.2703 21.3844 21.286 17.1141 16.9125 13.4251C16.0875 14.0063 15.1735 14.5594 14.1703 15.0844C14.461 15.3001 14.7047 15.5251 14.9672 15.7501H8.98597C9.98441 14.9016 11.1891 14.0813 12.675 13.3407C20.7422 9.33287 22.2235 3.08443 22.4953 0.83912C22.5469 0.393808 22.2 0.00474524 21.75 0.00474524L20.2313 5.77395e-05C19.8516 5.77395e-05 19.5328 0.27662 19.4813 0.65162C19.4485 0.881308 19.3969 1.17193 19.3219 1.50006H4.67816C4.60316 1.17193 4.5516 0.885995 4.51878 0.65162C4.46722 0.27662 4.14847 -0.00462976 3.76878 5.77395e-05L2.25472 0.00474524C1.80472 0.00474524 1.45316 0.393808 1.50472 0.83912C1.74847 2.85006 2.97191 8.05318 9.00003 12.0001C2.9766 15.9469 1.74847 21.1501 1.50472 23.161ZM12 10.2938C10.8235 9.65162 9.82503 8.96256 8.98597 8.25006H15.0094C14.175 8.96256 13.1766 9.65631 12 10.2938ZM18.1453 4.50006C17.8735 4.98756 17.5453 5.48912 17.161 6.00006H6.84378C6.45472 5.48912 6.1266 4.98756 5.85941 4.50006H18.1453ZM5.85472 19.5001C6.1266 19.0126 6.45472 18.511 6.8391 18.0001H17.1235C17.5125 18.511 17.8453 19.0126 18.1172 19.5001H5.85472Z" fill="white"/>
      </svg>
    `}
    />
  );
};

export default Dna;
