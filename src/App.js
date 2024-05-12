import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { theme } from "./config";
import Navigation from "./components/templates/Navigation";

import messaging, { firebase } from "@react-native-firebase/messaging";
import { PermissionsAndroid } from "react-native";
import { useEffect } from "react";

const App = () => {
  async function requestUserPermission() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }

    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
  }

  const subscribeNotif = async () => {
    firebase.messaging().subscribeToTopic("showroom");
  };

  useEffect(() => {
    requestUserPermission();
    subscribeNotif();
  }, []);

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Navigation />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
