import React, { useEffect, useRef, useState } from "react";
import CardGradient from "../../../atoms/CardGradient";
import {
  Center,
  Divider,
  HStack,
  Image,
  Text,
  View,
  VStack
} from "native-base";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import { useRefresh } from "../../../../utils/hooks/useRefresh";
import useIDNLiveStore from "../../../../store/idnLiveStore";
import { RefreshIcon } from "../../../../assets/icon";
import Loading from "../../../atoms/Loading";

const ChatIDN = () => {
  const { profile, url, setGifts } = useIDNLiveStore();
  const { refreshing, onRefresh } = useRefresh();
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);

  const generateRandomUsername = () => {
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `user_${randomPart}`;
  };

  const nickname = generateRandomUsername();

  const setupWebSocket = async () => {
    try {
      const id = profile?.chat_room_id;

      const ws = new WebSocket(`wss://chat.idn.app`);
      wsRef.current = ws;

      let registered = false;
      let joined = false;

      ws.onopen = () => {
        console.log("WebSocket connected");
        ws.send(`NICK ${nickname}`);
        ws.send("USER websocket 0 * :WebSocket User");
      };

      ws.onmessage = (event) => {
        const rawMessage = event.data;

        if (rawMessage.startsWith("PING")) {
          ws.send("PONG" + rawMessage.substring(4));
          return;
        }

        if (rawMessage.includes("001") && !registered) {
          registered = true;
          console.log("Connected, joining channel...");
          ws.send(`JOIN #${id}`);
          return;
        }

        if (rawMessage.includes("JOIN") && !joined) {
          joined = true;
          console.log("Joined channel, waiting for messages...\n");
          return;
        }

        if (rawMessage.includes("PRIVMSG")) {
          const jsonMatch = rawMessage.match(/PRIVMSG #[^ ]+ :(.*)/);
          if (jsonMatch) {
            try {
              const data = JSON.parse(jsonMatch[1]);

              if (data?.gift) {
                setGifts(data);
              }

              if (data?.chat) {
                const mappedMessage = {
                  user: data?.user,
                  comment: data?.chat?.message,
                  timestamp: data.timestamp || Date.now()
                };

                setMessages((prevMessages) => {
                  if (
                    prevMessages.some(
                      (msg) =>
                        msg.user?.username === data?.user?.username &&
                        msg.comment === data?.chat?.message
                    )
                  ) {
                    return prevMessages; // Skip adding duplicate message
                  }
                  return [mappedMessage, ...prevMessages];
                });
              }
            } catch (error) {
              console.error("Failed to parse message:", error);
            }
          }
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        wsRef.current = null;
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Failed to set up WebSocket:", error);
    }
  };

  useEffect(() => {
    setupWebSocket();

    if (wsRef.current) {
      wsRef.current.close();
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [profile, refreshing]);

  useEffect(() => {
    setGifts([])
  }, [profile]);

  return (
    <CardGradient>
      <FlashList
        data={messages?.length > 0 ? messages?.slice(0, 45) : []}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={50}
        renderItem={({ item, index }) => (
          <>
            <HStack alignItems="center" space={1} flexWrap="wrap">
              <Image
                borderRadius="lg"
                alt={item?.user?.name}
                style={{ width: 45, height: 45 }}
                source={{ uri: item?.user?.avatar_url }}
              />
              <View flex={1} pt={index === 0 ? "0" : "2"} p="2">
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color={
                    item?.user?.color_code === "#ED2227" ||
                    item?.user?.color_code === null
                      ? "primary"
                      : item?.user?.color_code
                  }
                  flexShrink={1}
                  flexWrap="wrap"
                >
                  {item?.user?.name ?? "User"}
                </Text>
                <Text mt="1" flexShrink={1} flexWrap="wrap">
                  {item?.comment}
                </Text>
              </View>
            </HStack>
            <Divider mb="1" />
          </>
        )}
        ListEmptyComponent={() =>
          !url ? (
            <Center p="10">
              <Loading color="white" />
            </Center>
          ) : !profile?.chat_room_id ? (
            <Center p="10">
              <VStack
                flex={1}
                space={4}
                justifyContent="center"
                alignItems="center"
              >
                <RefreshIcon size={24} />
                <Text textAlign="center" fontSize="sm">
                  Klik icon refresh jika live chat tidak muncul
                </Text>
              </VStack>
            </Center>
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </CardGradient>
  );
};

export default ChatIDN;
