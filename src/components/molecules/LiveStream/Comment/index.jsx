import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Divider,
  HStack,
  Image,
  Text,
  View,
  useToast,
  Input,
  Button,
  Spinner,
  ArrowUpIcon,
  ArrowDownIcon
} from "native-base";
import { RefreshControl } from "react-native";
import { STREAM } from "../../../../services";
import { SendIcon } from "../../../../assets/icon";
import useUser from "../../../../utils/hooks/useUser";
import { formatName } from "../../../../utils/helpers";
import { activityLog } from "../../../../utils/activityLog";
import useLiveStreamStore from "../../../../store/liveStreamStore";
import { useRefresh } from "../../../../utils/hooks/useRefresh";
import CardGradient from "../../../atoms/CardGradient";
import useThemeStore from "../../../../store/themeStore";
import { FlashList } from "@shopify/flash-list";

export const Comment = () => {
  const route = useRoute();
  const toast = useToast();
  const { params } = route;
  const navigation = useNavigation();
  const { user, session, userProfile } = useUser();
  const { profile, token, hideComment } = useLiveStreamStore();

  const [comments, setComments] = useState([]);
  const [socketKey, setSocketKey] = useState("");
  const [textComment, setTextComment] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(true);
  const { refreshing, onRefresh } = useRefresh();
  const roomId = profile?.room_id;
  const { mode } = useThemeStore();
  const isLightMode = mode === "light";

  useEffect(() => {
    async function getComments() {
      try {
        const response = await STREAM.getStreamComments(
          roomId,
          token ?? session?.cookie_login_id ?? "cookies"
        );
        setComments(response?.data);
      } catch (error) {
        console.log(error);
      }
    }

    getComments();
  }, [profile, refreshing]);

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
    navigation.replace("RoomDetail", {
      room: {
        room_id: profile?.room_id
      }
    });

    const roomName =
      profile?.room_url_key === "officialJKT48"
        ? "JKT48"
        : formatName(profile?.room_url_key);
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
        roomId,
        token ?? session?.cookie_login_id ?? "cookies"
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

        setComments((prevComments) => {
          if (
            Array.isArray(prevComments) &&
            prevComments?.some(
              (data) => data?.name === msg?.ac && data?.comment === msg?.cm
            )
          ) {
            return prevComments;
          }
          if (Array.isArray(prevComments)) {
            return [newComments, ...prevComments];
          } else {
            return [newComments];
          }
        });
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
  }, [socketKey, profile]);

  const sendComment = async (e) => {
    e.preventDefault();
    setButtonLoading(true);

    try {
      await STREAM.sendCommentStream({
        room_id: roomId?.toString(),
        comment: textComment,
        csrf: session?.csrf_token,
        cookies_id: session?.cookie_login_id
      });
      activityLog({
        logName: "Comment",
        userId: userProfile?._id,
        description: `Send Comment to ${formatName(profile?.room_url_key)}`,
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
        placement: "bottom"
      });
    } finally {
      setButtonLoading(false);
    }
  };

  const handleComment = (text) => {
    setTextComment(text);
  };

  const toggleCommentBox = () => {
    setIsCommentBoxVisible(!isCommentBoxVisible);
  };

  return (
    <CardGradient>
      <FlashList
        data={comments?.length > 0 ? comments?.slice(0, 45) : []}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={50}
        renderItem={({ item }) =>
          item.comment.length > 2 && (
            <Box>
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
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    color={
                      item.user_id == user?.user_id
                        ? mode === "dark"
                          ? "primary"
                          : "secondary"
                        : "white"
                    }
                  >
                    {item.name}
                  </Text>
                  <Text mt="1">{item.comment}</Text>
                </View>
              </HStack>
              <Divider mb="1" />
            </Box>
          )
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {session && !hideComment && isCommentBoxVisible && (
        <HStack w="100%" ml="1.5" h={10} position="absolute" bottom="2">
          <Input
            variant="filled"
            w="90%"
            fontSize="md"
            name="comment"
            bgColor={isLightMode ? "white" : "#282C34"}
            color={isLightMode ? "black" : "white"}
            borderColor={isLightMode ? "black" : "primary"}
            borderRightWidth={0}
            borderRadius="lg"
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
            placeholder="Kirim komentar.."
            _focus={{
              borderColor: "primary",
              backgroundColor: "secondary"
            }}
            _input={{
              textAlign: "left",
              color: "white",
              selectionColor: "white",
              cursorColor: "white"
            }}
            onChangeText={handleComment}
            value={textComment}
          />
          <Button
            height="10"
            borderColor="primary"
            borderTopLeftRadius="0"
            borderLeftWidth={0}
            borderBottomLeftRadius="0"
            borderWidth={isLightMode ? "0" : "1"}
            background={isLightMode ? "secondary" : "primary"}
            onPress={sendComment}
            disabled={textComment.length === 0 || buttonLoading}
          >
            {buttonLoading ? <Spinner color="white" /> : <SendIcon />}
          </Button>
        </HStack>
      )}

      {/* Toggle Button */}
      {session && !hideComment && (
        <Button
          position="absolute"
          bottom={isCommentBoxVisible ? "12" : "2"}
          right="2"
          size="sm"
          mb="2"
          p="2.5"
          borderRadius="full"
          background={isCommentBoxVisible ? "gray.500" : "primary"}
          onPress={toggleCommentBox}
          _pressed={{
            opacity: 0.7
          }}
        >
          {isCommentBoxVisible ? (
            <ArrowDownIcon color="white" />
          ) : (
            <ArrowUpIcon color="white" />
          )}
        </Button>
      )}

      {!session && isCommentBoxVisible && (
        <HStack w="100%" ml="1.5" h={10} position="absolute" bottom="2">
          <Input
            variant="filled"
            w="85%"
            fontSize="md"
            name="comment"
            bgColor={isLightMode ? "white" : "#282C34"}
            color={isLightMode ? "black" : "white"}
            borderColor={isLightMode ? "black" : "primary"}
            borderRightWidth={0}
            borderRadius="md"
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
            placeholder="Silakan login untuk kirim komentar"
            _input={{
              textAlign: "left"
            }}
            _disabled={{
              opacity: 1
            }}
            onChangeText={handleComment}
            value={textComment}
            isDisabled
          />
          <Button
            w="20%"
            borderColor="primary"
            borderTopLeftRadius="0"
            borderLeftWidth={0}
            borderBottomLeftRadius="0"
            borderWidth={isLightMode ? "0" : "1"}
            background={isLightMode ? "secondary" : "primary"}
            onPress={() => {
              navigation.replace("Login");
            }}
          >
            <Text fontSize="xs">Login</Text>
          </Button>
        </HStack>
      )}
    </CardGradient>
  );
};
