import { AppState } from "react-native";
import { useEffect, useState } from "react";

const useAppStateChange = (callback) => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        callback(); // Trigger the callback when the app comes to the foreground
      }
      setAppState(nextAppState);
    };

    // Listen to app state changes
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // Clean up the event listener on component unmount
    return () => {
      subscription.remove();
    };
  }, [appState, callback]);
};

export default useAppStateChange;
