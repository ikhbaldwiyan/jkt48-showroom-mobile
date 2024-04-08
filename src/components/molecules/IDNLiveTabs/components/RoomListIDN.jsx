import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Button, Divider, HStack, Image, PlayIcon, Text, View, Pressable } from "native-base";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { ROOMS } from "../../../../services";
import { useRefresh } from "../../../../utils/hooks/useRefresh";

export const RoomListIDN = () => {
  const route = useRoute();
  const { params } = route;
  const { navigate } = useNavigation();
  const [roomLives, setRoomLives] = useState([]);
  const { refreshing, onRefresh } = useRefresh();

  useEffect(() => {
    async function getIDNLIve() {
      const response = await ROOMS.getIDNLIveRoom();
      setRoomLives(response.data)
    }
    getIDNLIve();
  }, [refreshing]);

  return (
    <LinearGradient colors={['#24A2B7', '#3B82F6']} style={styles.linearGradient}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {roomLives?.map((item, idx) => (
          <Box key={idx}>
            <HStack py="2" alignItems="center" justifyItems="center" justifyContent="space-around">
              <Image
                mr="3"
                alt={item.title}
                style={{ width: 80, height: 80 }}
                source={{ uri: item?.user?.avatar }}
                rounded="lg"
              />
              <View justifyContent="center" alignItems="center">
                <Text fontSize="16" fontWeight="bold">
                  {item?.user?.name.replace("JKT48", "")}
                </Text>
                <Box bg="red" mt="2" rounded="lg" p="1" px="4">
                  <Text fontWeight="semibold">
                    Live
                  </Text>
                </Box>
              </View>
              <Button
                mt="8"
                colorScheme="success"
                bg={item.user.username === params.item.user.username ? "success.800" : "secondary"}
              >
                <Pressable
                  onPress={() => {
                    navigate("IDNStream", { item })
                  }}
                >
                  <PlayIcon size={14} color="white" />
                </Pressable>
              </Button>
            </HStack>
            {roomLives.length > 1 && (
              <Divider mt="2" />
            )}
          </Box>
        ))}
      </ScrollView>
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