import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { StyleSheet } from "react-native";
import useThemeStore from "../../../store/themeStore";

const CardGradient = ({ children, color }) => {
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

  return (
    <LinearGradient
      colors={colors()}
      style={styles.linearGradient}
    >
      {children}
    </LinearGradient>
  );
};

export default CardGradient;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  }
});
