import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { StyleSheet } from "react-native";
import useThemeStore from "../../../store/themeStore";

const CardGradient = ({ children }) => {
  const { theme } = useThemeStore();

  return (
    <LinearGradient colors={theme} style={styles.linearGradient}>
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
