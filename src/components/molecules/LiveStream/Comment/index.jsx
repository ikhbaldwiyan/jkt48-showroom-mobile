import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Box, Divider, HStack, Image, ScrollView, Text } from "native-base";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { STREAM } from "../../../../services";

export const Comment = () => {
  const route = useRoute();
  const { params } = route;
  const [liveInfo, setLiveInfo] = useState()
  const [comments, setComments] = useState()
  const [cookies, setCookies] = useState("sr_id=TxF6THI72vEMzNyW1PUewa6FO8H1IgQUtMiT6MX6zQHecs0sXTQ63JW33tO_DAbI")

  useEffect(() => {
    async function getLiveInfo() {
      const info = await STREAM.getStreamInfo(
        params?.item?.room_id,
        cookies
      );
      setLiveInfo(info?.data)
    }

    getLiveInfo();
  }, []);

  useEffect(() => {
    async function getComments() {
      const response = await STREAM.getStreamComments(
        params?.item?.room_id,
        cookies
      );
      setComments(response?.data)
    }

    getComments();
  }, []);


  return (
    <LinearGradient colors={['#24A2B7', '#3B82F6']} style={styles.linearGradient}>
      <ScrollView>
        {comments?.map((item, idx) => (
          <Box key={idx}>
            <HStack alignItems="center" p="2">
              <Image
                mr="3"
                style={{ width: 40, height: 40 }}
                source={{ uri: item?.avatar_url }} alt="avatar"
              />
              <Box>
                <Text fontSize="md" fontWeight="bold">
                  {item.name}
                </Text>
                <Text mt="1">
                  {item.comment}
                </Text>
              </Box>
            </HStack>
            <Divider mb="1" />
          </Box>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
})