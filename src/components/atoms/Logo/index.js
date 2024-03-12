import React from "react";
import { Box, Image, Text } from "native-base";
import LogoShowroom from "../../../assets/icon/logo.png";

const Logo = ({ isHeader }) => {
  return (
    <Box flexDirection="row" alignItems="center">
      <Image
        mr="2"
        width={23}
        height={36}
        source={LogoShowroom}
        alt="Showroom Image"
      />
      <Text
        fontSize={isHeader ? "16" : "24"}
        fontWeight="bold"
        color="white"
        mr="1"
      >
        JKT48
      </Text>
      <Text fontSize={isHeader ? "16" : "24"} fontWeight="bold" color="primary">
        SHOWROOM
      </Text>
    </Box>
  );
};

export default Logo;
