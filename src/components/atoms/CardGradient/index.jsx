import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { StyleSheet } from "react-native";

const CardGradient = ({ children }) => {
  return (
    <LinearGradient
      colors={["#24A2B7", "#3B82F6"]}
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
