import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import { Button, Text, Box, Modal, VStack, Divider } from "native-base";
import firestore from "@react-native-firebase/firestore";
import DeviceInfo from "react-native-device-info";
import { firebase } from "@react-native-firebase/messaging";
import trackAnalytics from "../../../utils/trackAnalytics";
import useUser from "../../../utils/hooks/useUser";
import { PLAY_STORE_URL } from "@env";
import { useChangeLogVersion } from "../../../services/hooks/useChangeLog";

const UpdateApp = () => {
  const { profile } = useUser();
  const [updateApp, setUpdateApp] = useState(false);
  const [latestVersion, setLatestVersion] = useState("");

  const { data } = useChangeLogVersion();

  useEffect(() => {
    const fetchLatestVersion = async () => {
      try {
        const doc = await firestore().collection("app_config").doc("env").get();

        if (doc.exists) {
          const data = doc.data();
          setLatestVersion(data.APP_VERSION);

          const currentVersion = DeviceInfo.getVersion();
          if (data.APP_VERSION > currentVersion) {
            setUpdateApp(true);
            firebase.messaging().subscribeToTopic("update-reminder");
          }
        }
      } catch (error) {
        console.error("Error fetching version:", error);
      }
    };

    fetchLatestVersion();
  }, []);

  const handleUpdateApp = () => {
    trackAnalytics("update_apk", {
      username: profile?.name,
      version: latestVersion
    });
    Linking.openURL(PLAY_STORE_URL);
    setUpdateApp(false);
  };

  const closeUpdateApp = () => {
    trackAnalytics("close_update_apk", {
      username: profile?.name,
      version: latestVersion
    });
    setUpdateApp(false);
  };

  return (
    <Modal
      size="full"
      isOpen={updateApp}
      onClose={closeUpdateApp}
      avoidKeyboard
    >
      <Box bg="secondary" rounded="xl" shadow={3} width="90%">
        <Box
          bg="primary"
          borderRadius="xl"
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
          p="2.5"
        >
          <Text fontWeight="semibold" textAlign="center" fontSize="15">
            Versi baru tersedia, jangan lupa update APK ke versi{" "}
            <Text color="gray.300" fontWeight="bold">
              {data?.version}
            </Text>{" "}
            Di Play Store!
          </Text>
        </Box>
        <Divider />
        <Box pt="3" p="4">
          <Text fontSize="md" mb="2" fontWeight="semibold">
            What's New?
          </Text>

          <VStack space={3}>
            {data?.description?.slice(0, 8)?.map?.((item, idx) => (
              <Text key={idx}>- {item}</Text>
            ))}
          </VStack>
          <Divider my="4" />
          <Button
            borderRadius="xl"
            onPress={handleUpdateApp}
            mb={2}
            colorScheme="cyan"
          >
            <Text fontWeight="semibold">Update Sekarang</Text>
          </Button>
          <Button variant="ghost" onPress={closeUpdateApp} colorScheme="gray">
            <Text>Nanti aja deh</Text>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateApp;
