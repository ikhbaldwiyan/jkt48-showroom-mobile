import React from "react";
import { Box, Image, Text } from "native-base";
import LogoShowroom from "../../../assets/icon/logo.png";

const Logo = () => {
  return (
    <Box flexDirection="row" alignItems="center">
      <Image source={LogoShowroom} mr="2" width={23} height={36} />
      <Text fontSize="24" fontWeight="bold" color="white" mr="1">
        JKT48
      </Text>
      <Text fontSize="24" fontWeight="bold" color="primary">
        SHOWROOM
      </Text>
    </Box>
  );
};

export default Logo;
