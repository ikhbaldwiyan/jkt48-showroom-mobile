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
import useThemeStore from "../../../../store/themeStore";

const ChatIDN = () => {
  const { profile, url, setGifts } = useIDNLiveStore();
  const { refreshing, onRefresh } = useRefresh();
  const { mode: theme } = useThemeStore();
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);

  const generateRandomUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  const generateRandomUsername = () => {
    const uuid = generateRandomUUID();
    const timestamp = Date.now();
    return `idn-${uuid}-${timestamp}`;
  };

  const nickname = generateRandomUsername();

  const getTextColor = (userColorCode, theme) => {
    if (theme === "light") {
      return "white";
    }

    if (userColorCode === "#ED2227" || userColorCode === null) {
      return "primary";
    }

    return userColorCode;
  };

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
        ws.send(`USER ${nickname} 0 * null`);
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
    setGifts([]);
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
                  color={getTextColor(item?.user?.color_code, theme)}
                  flexShrink={1}
                  flexWrap="wrap"
                >
                  {item?.user?.name ?? "User"}
                </Text>
                <Text mt="0.5" flexShrink={1} flexWrap="wrap">
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
