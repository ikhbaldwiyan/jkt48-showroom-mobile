import React from "react";
import { Box, Text } from "native-base";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export const Profile = () => {
  return (
    <LinearGradient colors={['#24A2B7', '#3B82F6']} style={styles.linearGradient}>
      <Box>
        <Text>Profile Tab</Text>
      </Box>
    </LinearGradient>
  )
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
})