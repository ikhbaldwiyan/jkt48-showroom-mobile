import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { StyleSheet } from "react-native";
import useThemeStore from "../../../store/themeStore";

const CardGradient = ({ children, color, halfCard, isRounded = false }) => {
  const { theme } = useThemeStore();

  const light = ["#24A2B7", "#3B82F6"];
  const dark = ["#4A5568", "#282C34"];

  const colors = () => {
    if (color) {
      return color === "light" ? light : dark;
    } else {
      return theme;
    }
  };

  const styles = StyleSheet.create({
    linearGradient: {
      flex: halfCard ? 0 : 1,
      padding: 12,
      borderRadius: isRounded ? 6 : 0,
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.65,
      shadowRadius: 7.84,
      elevation: 5
    }
  });

  return (
    <LinearGradient colors={colors()} style={styles.linearGradient}>
      {children}
    </LinearGradient>
  );
};

export default CardGradient;
