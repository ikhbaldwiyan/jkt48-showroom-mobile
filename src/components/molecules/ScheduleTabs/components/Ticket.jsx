import { Box, Button, ScrollView, Text, VStack } from "native-base";
import { Linking, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export const Ticket = ({ ticket }) => {
  return (
    <LinearGradient
      colors={["#0082A6", "#004A66"]}
      style={styles.linearGradient}
    >
      <ScrollView>
        <Box p="2">
          <VStack space={3}>
            {ticket?.ticketShowroom && (
              <>
                <Text>Live Stream Showroom:</Text>
                <Button
                  variant="solid"
                  bg="secondary"
                  borderRadius="12"
                  onPress={() => Linking.openURL(ticket?.ticketShowroom)}
                >
                  <Text fontWeight="semibold">
                    Buy at Showroom Official Web
                  </Text>
                </Button>
              </>
            )}
            <Text>Live Stream Youtube:</Text>
            <Button
              variant="solid"
              bg="secondary"
              borderRadius="12"
              onPress={() =>
                Linking.openURL(
                  "https://www.youtube.com/channel/UCadv-UfEyjjwOPcZHc2QvIQ/join"
                )
              }
            >
              <Text fontWeight="semibold">Buy membership JKT48 TV</Text>
            </Button>
            <Text>JKT48 Theater Ticket:</Text>
            <Button
              variant="solid"
              bg="secondary"
              borderRadius="12"
              onPress={() => Linking.openURL(ticket?.ticketTheater)}
            >
              <Text fontWeight="semibold">Buy at JKT48 Official Web</Text>
            </Button>
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
