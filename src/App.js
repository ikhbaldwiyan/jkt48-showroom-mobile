import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { theme } from "./config";
import Navigation from "./components/templates/Navigation";

import analytics from "@react-native-firebase/analytics";
import messaging, { firebase } from "@react-native-firebase/messaging";
import { PermissionsAndroid } from "react-native";
import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
          <Navigation />
        </NativeBaseProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
