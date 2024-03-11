import React from "react";
import { Box, Image, Text } from "native-base";
import Logo from "../../assets/icon/logo.png";

const SplashScreen = () => {
  return (
    <Box flex="1" bg="#282C34" justifyContent="center" alignItems="center">
      <Box py="3">
        <Image
          width="70"
          height="110"
          source={Logo}
          alt="JKT48 SHOWROOM LOGO"
        />
      </Box>
      <Text color="white" fontSize="2xl" fontWeight="bold">
        JKT48
      </Text>
      <Text color="#24A2B7" fontSize="2xl" fontWeight="bold">
        SHOWROOM
      </Text>
    </Box>
  );
};

export default SplashScreen;
