import React, { useEffect } from "react";
import { Box, Text } from "native-base";
import LogoIcon from "../../assets/icon/LogoIcon";
import { getStorage } from "../../utils/storage";

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    getStorage("session").then((isLogin) => {
      setTimeout(() => {
        navigation.replace(isLogin ? "Main" : "Login");
      }, 3000);
    })
  }, []);

  return (
    <Box flex="1" bg="#282C34" justifyContent="center" alignItems="center">
      <Box py="3">
        <LogoIcon width="70" height="110" />
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
