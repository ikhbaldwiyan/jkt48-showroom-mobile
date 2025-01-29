import { Box } from "native-base";
import React from "react";
import { Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const GradientButton = ({ onPress, children, size }) => {
  const styles = StyleSheet.create({
    buttonContainer: {
      flex: 1,
      borderRadius: 8,
      overflow: "hidden"
    },
    gradient: {
      paddingVertical: size == "sm" ? 3.5 : 8,
      paddingHorizontal: 6,
      borderRadius: 6
    },
    text: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 16
    }
  });

  return (
    <Box onPress={onPress} style={styles.buttonContainer}>
      <LinearGradient
        colors={["#004a66", "#009fcb"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{children}</Text>
      </LinearGradient>
    </Box>
  );
};

export default GradientButton;
