import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import { Button, Text, Center, Box, Modal } from "native-base";
import { PLAY_STORE_URL } from "@env";
import { LogoNormal } from "../../../assets/icon";
import trackAnalytics from "../../../utils/trackAnalytics";
import useUser from "../../../utils/hooks/useUser";
import { getCurrentVersion } from "../../../services/versions";
import DeviceInfo from "react-native-device-info";
import { firebase } from "@react-native-firebase/messaging";

const UpdateApp = () => {
  const { profile } = useUser();
  const [updateApp, setUpdateApp] = useState(false);
  const [latestVersion, setLatestVersion] = useState("");

  const getVersionAndroid = async () => {
    try {
      const response = await getCurrentVersion();
      setLatestVersion(response.data.version);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVersionAndroid();
    const currentVersion = DeviceInfo.getVersion();

    if (latestVersion > currentVersion) {
      setUpdateApp(true);
      firebase.messaging().subscribeToTopic("update-reminder");
    }
  }, [latestVersion]);

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
      <Box bg="secondary" p={5} rounded="xl" shadow={3} width="80%">
        <Text fontWeight="bold" textAlign="center" fontSize="18" mb={4}>
          Versi Baru Tersedia Wots
        </Text>
        <Center>
          <LogoNormal width={100} height={100} />
        </Center>
        <Text mt="4" textAlign="center" mb={2}>
          Jangan lupa update APK ke versi{" "}
          <Text color="primary" fontWeight="bold">
            {latestVersion}
          </Text>{" "}
          di Play Store untuk menggunakan fitur baru!
        </Text>

        <Button
          mt="3"
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
    </Modal>
  );
};

export default UpdateApp;
