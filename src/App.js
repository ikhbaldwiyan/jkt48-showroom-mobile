import { NativeBaseProvider } from "native-base";
import { SplashScreen } from "./screens";

const App = () => {
  return (
    <NativeBaseProvider>
      <SplashScreen />
    </NativeBaseProvider>
  );
};

export default App;
