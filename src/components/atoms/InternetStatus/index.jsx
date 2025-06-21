import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { Slide, Alert, Text, VStack } from "native-base";
import { OfflineIcon } from "../../../assets/icon";

const InternetStatusInfo = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected && state.isInternetReachable !== false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Slide in={!isConnected} placement="top" mt="280" mx="6">
      <Alert
        bg="blueGray.800"
        borderColor="white"
        borderWidth={2}
        status="error"
        borderRadius="xl"
        safeAreaTop
      >
        <VStack
          alignItems="center"
          justifyContent="center"
          space={3}
          px="3"
          py="2"
          textAlign="center"
        >
          <OfflineIcon size={55} />
          <Text fontSize="md" textAlign="center" fontWeight="medium">
            Tidak ada koneksi internet, Silakan periksa sambungan internet kamu.
          </Text>
        </VStack>
      </Alert>
    </Slide>
  );
};

export default InternetStatusInfo;
