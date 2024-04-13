import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Divider,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  useToast,
  Input,
  Button,
  Spinner,
} from "native-base";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { STREAM } from "../../../../services";
import { SendIcon } from "../../../../assets/icon";
import useUser from "../../../../utils/hooks/useUser";
import { formatName } from "../../../../utils/helpers";
import { activityLog } from "../../../../utils/activityLog";

export const Comment = () => {
  const route = useRoute();
  const toast = useToast();
  const { params } = route;
  const navigation = useNavigation();
  const { session, userProfile } = useUser();

  const [comments, setComments] = useState([]);
  const [socketKey, setSocketKey] = useState("");
  const [textComment, setTextComment] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    async function getComments() {
      const response = await STREAM.getStreamComments(
        params?.item?.room_id,
        session?.cookie_login_id ?? "cookies"
      );
      setComments(response?.data);
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
      created_at: msg.created_at
    };

    return comments;
  };

  const handleEndLive = () => {
    navigation.navigate("Main");
    const roomName = formatName(params.item.room_url_key);
    toast.show({
      render: () => {
        return (
          <Box bg="red" px="2" mt="10" m="3" py="1" rounded="sm" mb={5}>
            <Text>{roomName} Offline</Text>
          </Box>
        );
      },
      placement: "top-right"
    });
  };

  useEffect(() => {
    async function getWebsocketInfo() {
      const response = await STREAM.getStreamInfo(
        params?.item?.room_id,
        session?.cookie_login_id ?? "cookies"
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
        const newComments = formatCommentWebsocket(msg);
        setComments((prevMessages) => [newComments, ...prevMessages]);
      } else if (code === 101) {
        handleEndLive();
      }
    });

    newSocket.addEventListener("close", () => {
      // console.log("WebSocket closed");
    });

    // Cleanup function
    return () => {
      newSocket.close();
    };
  }, [socketKey, params.item]);

  const sendComment = async (e) => {
    e.preventDefault();
    setButtonLoading(true);

    try {
      await STREAM.sendCommentStream({
        room_id: params?.item?.room_id?.toString(),
        comment: textComment,
        csrf: session?.csrf_token,
        cookies_id: session?.cookie_login_id,
      });
      activityLog({
        logName: "Comment",
        userId: userProfile?._id,
        description: `Send Comment to ${formatName(params.item.room_url_key)}`,
        liveId: params?.item?.live_id
      });
      setTextComment("");
    } catch (error) {
      console.log("error", error);
      toast.show({
        render: () => (
          <Box bg="red" px="2" m="3" py="1" rounded="sm" mb={5}>
            <Text>Failed to send comment</Text>
          </Box>
        ),
        placement: "bottom",
      });
    } finally {
      setButtonLoading(false);
    }
  };

  const handleComment = (text) => {
    setTextComment(text);
  };

  return (
    <LinearGradient
      colors={["#24A2B7", "#3B82F6"]}
      style={styles.linearGradient}
    >
      <ScrollView>
        {comments?.length > 0 &&
          comments?.slice(0, 40)?.map((item, idx) => (
            <Box key={idx}>
              <HStack alignItems="center" p="2">
                <Image
                  mr="3"
                  alt={item.name}
                  style={{ width: 40, height: 40 }}
                  source={{
                    uri:
                      item?.avatar_url ??
                      `https://static.showroom-live.com/image/avatar/${item.avatar_id}.png?v=95`
                  }}
                />
                <View flexShrink="1">
                  <Text fontSize="md" fontWeight="bold">
                    {item.name}
                  </Text>
                  <Text mt="1">{item.comment}</Text>
                </View>
              </HStack>
              <Divider mb="1" />
            </Box>
          ))}
      </ScrollView>
      {session && (
        <HStack w="100%" ml="1.5" h={10} position="absolute" bottom="2">
          <Input
            bgColor="white"
            variant="filled"
            w="90%"
            fontSize="md"
            name="id"
            borderRadius="md"
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
            placeholder="Write Comment.."
            _input={{
              textAlign: "left",
            }}
            onChangeText={handleComment}
            value={textComment}
          />
          <Button
            height="10"
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            background="secondary"
            onPress={sendComment}
            disabled={textComment.length === 0 || buttonLoading}
          >
            {buttonLoading ? <Spinner color="white" /> : <SendIcon />}
          </Button>
        </HStack>
      )}
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
