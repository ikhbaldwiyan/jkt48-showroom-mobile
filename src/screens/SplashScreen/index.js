import React, { useEffect } from "react";
import { Box, Text } from "native-base";
import LogoIcon from "../../assets/icon/LogoIcon";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Main");
    }, 3000);
  }, []);

  return (
    <Box flex="1" bg="secondary" justifyContent="center" alignItems="center">
      <Box py="3">
        <LogoIcon width="70" height="110" />
      </Box>
      <Text color="white" fontSize="2xl" fontWeight="bold">
        JKT48
      </Text>
      <Text color="primary" fontSize="2xl" fontWeight="bold">
        SHOWROOM FANMADE
      </Text>
    </Box>
  );
};

export default SplashScreen;
