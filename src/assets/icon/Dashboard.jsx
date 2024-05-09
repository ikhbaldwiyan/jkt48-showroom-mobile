import React from "react";
import { SvgXml } from "react-native-svg";

const Dashboard = () => {
  return (
    <SvgXml
      xml={`
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.375 10.2917H8.70833V2.375H2.375V10.2917ZM2.375 16.625H8.70833V11.875H2.375V16.625ZM10.2917 16.625H16.625V8.70833H10.2917V16.625ZM10.2917 2.375V7.125H16.625V2.375H10.2917Z" fill="white"/>
      </svg>
    `}
    />
  );
};

export default Dashboard;
