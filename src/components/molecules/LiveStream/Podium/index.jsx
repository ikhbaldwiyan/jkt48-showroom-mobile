import { useRoute } from "@react-navigation/native";
import { Box, Center, Divider, HStack, Image, ScrollView, Text } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { STREAM } from "../../../../services";

export const Podium = ({ isIDNLive }) => {
  const route = useRoute();
  const { params } = route;
  const [podium, setPodium] = useState([]);

  useEffect(() => {
    try {
      async function getPodiumList() {
        const response = await STREAM.getLivePodium(
          params?.item?.live_id,
        );
        setPodium(response?.data)
      }
      
      async function getIDNPodiumList() {
        const response = await STREAM.getIDNLivePodium(
          params?.item?.slug,
        );
        setPodium(response?.data)
      }
      
      isIDNLive ? getIDNPodiumList() : getPodiumList()
    } catch (error) {
      console.log(error)
    }
  }, [])


  return (
    <LinearGradient colors={['#24A2B7', '#3B82F6']} style={styles.linearGradient}>
      <ScrollView>
        <Center>
          <Text fontWeight="bold">Podium - {podium?.liveData?.users} People are watching</Text>
        </Center>
        <Divider mt="3" />
        {podium?.activityLog?.watch?.map((item, idx) => (
          <HStack alignItems="center" p="3" key={idx}>
            <Image
              mr="3"
              alt={item.user.name}
              style={{ width: 50, height: 50 }}
              source={{ uri: item?.user?.avatar }}
            />
            <Text fontWeight="semibold">
              {item.user.name}
            </Text>
          </HStack>
        ))}
      </ScrollView>
    </LinearGradient>
  )
};

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
})