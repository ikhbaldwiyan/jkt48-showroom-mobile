import React, { useEffect } from "react";
import { Box, Text } from "native-base";
import { LogoNormal } from "../../assets/icon";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Main");
    }, 3000);
  }, []);

  return (
    <Box flex="1" bg="secondary" justifyContent="center" alignItems="center">
      <Box py="4">
        <LogoNormal width="100" height="150" />
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
