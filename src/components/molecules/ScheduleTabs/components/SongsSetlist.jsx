import { Box, HStack, ScrollView, Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export const SongsSetlist = ({ songs }) => {
  return (
    <LinearGradient
      colors={["#24A2B7", "#3B82F6"]}
      style={styles.linearGradient}
    >
      <ScrollView>
        <Box p="2">
          <VStack space={2}>
            {songs?.map((item, idx) => (
              <HStack space={3}>
                <Text fontWeight="semibold" fontSize="md">
                  {idx + 1}.
                </Text>
                <Text fontWeight="semibold" fontSize="md">
                  {item?.title}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  }
});
