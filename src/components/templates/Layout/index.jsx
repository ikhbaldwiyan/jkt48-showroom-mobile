import React, { useEffect } from "react";
import { Box, HStack, ScrollView, Text, useToast } from "native-base";
import { RefreshControl } from "react-native";
import Header from "../Header";
import messaging from "@react-native-firebase/messaging";
import { LiveIcon } from "../../../assets/icon";

const Layout = ({ children, isHeader, refreshing, onRefresh }) => {
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const data = remoteMessage.data;

      toast.show({
        render: () => {
          return (
            <Box bg="purple.600" px="2" mt="10" m="3" py="2" rounded="sm" mb={5}>
              <HStack alignItems="center" space="2" >
                <LiveIcon size={14} />
                <Text>{`${data.name} lagi live ${data.type} nih  `}</Text>
              </HStack>
            </Box>
          );
        },
        placement: "top-right"
      });
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {isHeader && <Header />}
      <ScrollView
        flex="1"
        p="3"
        bg="secondary"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Box>{children}</Box>
      </ScrollView>
    </>
  );
};

export default Layout;
