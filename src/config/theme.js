import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    primary: "#24A2B7",
    secondary: "#282C34",
    black: "#21252B",
    red: "#DC3545",
    teal: "#008080",
    disabled: "#495057",
    blueLight: "#ECFAFC",
  },
  components: {
    Text: {
      baseStyle: {
        color: "white"
      }
    },
    Input: {
      baseStyle: {
        _input: {
          fontSize: 14
        }
      },
    }
  }
});
