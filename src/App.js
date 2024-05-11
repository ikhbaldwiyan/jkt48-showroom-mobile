import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { theme } from "./config";
import Navigation from "./components/templates/Navigation";

import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid } from "react-native";
import { useEffect } from "react";

const App = () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log(token);
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
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
