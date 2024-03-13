import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { theme } from "./config/theme";
import Navigation from "./components/templates/Navigation";

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Navigation />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
