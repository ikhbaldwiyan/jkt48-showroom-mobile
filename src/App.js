import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { theme } from "./config";
import Navigation from "./components/templates/Navigation";

import analytics from "@react-native-firebase/analytics";
import messaging, { firebase } from "@react-native-firebase/messaging";
import { LogBox, PermissionsAndroid } from "react-native";
import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import fetchApiConfig from "./utils/fetchApiConfig";
import InternetStatusInfo from "./components/atoms/InternetStatus";

const App = () => {
  async function requestUserPermission() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

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
    fetchApiConfig()
    LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
  }, []);

  const routeNameRef = useRef();
  const navigationRef = useRef();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName =
            navigationRef.current.getCurrentRoute()?.name;

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName
            });
          }
          routeNameRef.current = currentRouteName;
        }}
      >
        <NativeBaseProvider theme={theme}>
          <InternetStatusInfo />
          <Navigation />
        </NativeBaseProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
