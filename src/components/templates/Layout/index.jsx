import React, { useEffect } from "react";
import { RefreshControl } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";

import Header from "../Header";
import { Box, ScrollView, useToast } from "native-base";
import FloatingNotif from "../../atoms/FloatingNotif";

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
              <FloatingNotif
                name={data?.name}
                image={data?.image}
                type={data?.type}
                item={data}
              />
            );
          },
          placement: "top-right",
          duration: 8000
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
