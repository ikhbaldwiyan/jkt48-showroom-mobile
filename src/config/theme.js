import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    primary: "#24A2B7",
    secondary: "#282C34",
    black: "#21252B",
  },
  components: {
    Text: {
      baseStyle: {
        color: "white"
      }
    }
  }
});
