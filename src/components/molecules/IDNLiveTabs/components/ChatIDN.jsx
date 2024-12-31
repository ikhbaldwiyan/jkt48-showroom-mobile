import React, { useEffect, useRef, useState } from "react";
import CardGradient from "../../../atoms/CardGradient";
import { Box, Divider, HStack, Text, View } from "native-base";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import { useRefresh } from "../../../../utils/hooks/useRefresh";
import useIDNLiveStore from "../../../../store/idnLiveStore";
import { STREAM } from "../../../../services";

const ChatIDN = () => {
  const { profile } = useIDNLiveStore();
  const { refreshing, onRefresh } = useRefresh();
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);

  const generateRandomUsername = () => {
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `user_${randomPart}`;
  };

  const nickname = generateRandomUsername();

  const getChannelId = async () => {
    try {
      const response = await STREAM.getChatIDN(
        profile?.user?.username,
        profile?.slug
      );

      return response.data.chatId;
    } catch (error) {
      console.log("Failed to get channel ID:", error);
      throw error;
    }
  };

  const setupWebSocket = async () => {
    try {
      const id = await getChannelId();

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

              if (data?.chat) {
                const mappedMessage = {
                  user: data?.user,
                  comment: data?.chat?.message,
                  timestamp: data.timestamp || Date.now()
                };

                // Update the messages state with the mapped message
                setMessages((prevMessages) => {
                  if (Array.isArray(prevMessages)) {
                    return [mappedMessage, ...prevMessages];
                  } else {
                    return [mappedMessage];
                  }
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
  }, [profile]);

  return (
    <CardGradient>
      <FlashList
        data={messages?.length > 0 ? messages?.slice(0, 45) : []}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={50}
        renderItem={({ item }) => (
          <Box>
            <HStack alignItems="center" p="2">
              <View flexShrink="1">
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color={item?.user?.color_code}
                >
                  {item?.user?.name ?? item?.user?.username}
                </Text>
                <Text mt="1">{item?.comment}</Text>
              </View>
            </HStack>
            <Divider mb="1" />
          </Box>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </CardGradient>
  );
};

export default ChatIDN;
