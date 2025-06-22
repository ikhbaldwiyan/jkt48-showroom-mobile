import { useEffect } from 'react';
import { AppState, NativeModules } from 'react-native';
import trackAnalytics from "../trackAnalytics";
import useUser from "./useUser";
import usePipStore from "../../store/usePipStore";

const usePipMode = () => {
  const { user } = useUser();
  const { PipModule } = NativeModules;
  const { isPipMode, setIsPipMode } = usePipStore();

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background') {
        setIsPipMode(true);
      } else {
        setIsPipMode(false);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const enterPipMode = (width = 9, height = 16) => {
    PipModule.EnterPipMode(width, height);
    setIsPipMode(true);
    trackAnalytics("open_pip_mode", {
      username: user?.account_id ?? "Guest",
    })
  };

  return { isPipMode, enterPipMode };
};

export default usePipMode;
