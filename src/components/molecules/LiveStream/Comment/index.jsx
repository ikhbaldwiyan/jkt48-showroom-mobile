import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Divider, HStack, Image, ScrollView, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { STREAM } from "../../../../services";

export const Comment = () => {
  const route = useRoute();
  const { params } = route;
  const [comments, setComments] = useState()
  const [cookies, setCookies] = useState("sr_id=TxF6THI72vEMzNyW1PUewa6FO8H1IgQUtMiT6MX6zQHecs0sXTQ63JW33tO_DAbI")
  const [socketKey, setSocketKey] = useState("");
  const { navigate } = useNavigation();

  useEffect(() => {
    async function getComments() {
      const response = await STREAM.getStreamComments(
        params?.item?.room_id,
        cookies
      );
      setComments(response?.data)
    }

    getComments();
  }, [params.item]);

  const formatCommentWebsocket = (msg) => {
    const comments = {
      id: String(msg.u) + String(msg.created_at),
      user_id: msg.u,
      name: msg.ac,
      avatar_id: msg.av,
      comment: msg.cm,
      created_at: msg.created_at,
    };

    return comments
  }

  useEffect(() => {
    async function getWebsocketInfo() {
      const response = await STREAM.getStreamInfo(
        params?.item?.room_id,
        cookies
      );
      setSocketKey(response?.data?.websocket?.key);
    }
    getWebsocketInfo();

    const newSocket = new WebSocket("wss://online.showroom-live.com/");

    newSocket.addEventListener("open", () => {
      newSocket.send(`SUB\t${socketKey}`);
    });

    newSocket.addEventListener("message", (event) => {
      const message = event.data;
      const msg = JSON.parse(message.split("\t")[2]);
      const code = parseInt(msg.t, 10);

      if (code === 1) {
        if (!Number.isNaN(msg.cm) && parseInt(msg.cm) <= 50) return;
        const newComments = formatCommentWebsocket(msg)
        setComments((prevMessages) => [newComments, ...prevMessages]);
      } else if (code === 101) {
        navigate.replace("Main");
      }
    });

    newSocket.addEventListener("close", () => {
      console.log('WebSocket closed');
    });

    // Cleanup function
    return () => {
      newSocket.close();
    };

  }, [socketKey]);

  return (
    <LinearGradient colors={['#24A2B7', '#3B82F6']} style={styles.linearGradient}>
      <ScrollView>
        {comments?.map((item, idx) => (
          <Box key={idx}>
            <HStack alignItems="center" p="2">
              <Image
                mr="3"
                alt={item.name}
                style={{ width: 40, height: 40 }}
                source={{ uri: item?.avatar_url ?? `https://static.showroom-live.com/image/avatar/${item.avatar_id}.png?v=95` }}
              />
              <View flexShrink="1">
                <Text fontSize="md" fontWeight="bold">
                  {item.name}
                </Text>
                <Text mt="1">
                  {item.comment}
                </Text>
              </View>
            </HStack>
            <Divider mb="1" />
          </Box>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
})