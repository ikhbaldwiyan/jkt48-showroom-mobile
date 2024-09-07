import React, { useEffect } from "react";
import { Box, HStack, ScrollView, Text, useToast } from "native-base";
import { Linking, RefreshControl } from "react-native";
import Header from "../Header";
import messaging from "@react-native-firebase/messaging";
import { LiveIcon } from "../../../assets/icon";
import { useNavigation } from "@react-navigation/native";
import { PLAY_STORE_URL } from "@env";

const Layout = ({ children, isHeader, refreshing, onRefresh }) => {
  const toast = useToast();
  const { navigate } = useNavigation();

  const handleNotificationNavigation = (remoteMessage) => {
    const data = remoteMessage.data;

    if (data.type === "Showroom" || data.type === "IDN") {
      navigate(data.screen, {
        item: JSON.parse(data.profile),
      });
    } else if (data.type === "Schedule") {
      navigate(data.screen, {
        item: {
          _id: data.schedule_id,
          setlist: JSON.parse(data.setlist),
        },
      });
    } else if (data.type === "Premium Live") {
      navigate(data.screen, {
        item: {
          profile: JSON.parse(data.profile),
          theater: JSON.parse(data.theater),
        },
      });
    }
  };

  const openAppNavigate = () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      handleNotificationNavigation(remoteMessage);
      console.log("Open by click notif", remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          handleNotificationNavigation(remoteMessage);
          console.log("Open by exit state click notif", remoteMessage);
        }
      });
  };

  useEffect(() => {
    openAppNavigate();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const data = remoteMessage.data;

      if (data.type === "Showroom" || data.type === "IDN") {
        toast.show({
          render: () => {
            return (
              <Box
                px="2"
                mt="10"
                m="3"
                py="2"
                mb="5"
                bg="purple.600"
                rounded="sm"
              >
                <HStack alignItems="center" space="2">
                  <LiveIcon size={14} />
                  <Text>{`${data.name} lagi live ${data.type} cuy`}</Text>
                </HStack>
              </Box>
            );
          },
          placement: "top-right",
        });
      }
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
