import React from "react";
import { Box, Text } from "native-base";
import LogoIcon from "../../../assets/icon/LogoIcon";

const Logo = ({ isHeader }) => {
  return (
    <Box flexDirection="row" alignItems="center">
      <Box mr="2">
        <LogoIcon
          width={23}
          height={36}
        />
      </Box>
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
