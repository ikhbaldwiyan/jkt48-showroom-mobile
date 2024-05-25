import React, { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";
import Layout from "../../components/templates/Layout";
import { Box } from "native-base";
import {
  IDNLIve,
  ShowroomLive,
  PremiumLive,
  RecentLives,
  Schedule
} from "../../components/organisms";
import { useRefresh } from "../../utils/hooks/useRefresh";
import DeviceInfo from "react-native-device-info";
import { getCurrentVersion } from "../../services/versions";
import { firebase } from "@react-native-firebase/messaging";

const Home = ({ navigation }) => {
  const { refreshing, onRefresh } = useRefresh();
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
      Alert.alert(
        `Versi terbaru tersedia wots`,
        `Jangan lupa update versi APK ke versi ${latestVersion} di website untuk mendapatkan fitur baru!`,
        [
          {
            text: "Update APK",
            onPress: () => {
              Linking.openURL("https://www.jkt48showroom.com");
            }
          },
          {
            text: "Nanti"
          }
        ]
      );
      firebase.messaging().subscribeToTopic("update-reminder");
    }
  }, [latestVersion]);

  return (
    <Layout isHeader refreshing={refreshing} onRefresh={onRefresh}>
      <Box flex="1" mb="6">
        <PremiumLive refreshing={refreshing} />
        <ShowroomLive refreshing={refreshing} />
        <IDNLIve refreshing={refreshing} />
        <RecentLives refreshing={refreshing} />
        <Schedule refreshing={refreshing} navigation={navigation} isWeek />
      </Box>
    </Layout>
  );
};

export default Home;
