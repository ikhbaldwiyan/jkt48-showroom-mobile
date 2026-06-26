import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, Text, VStack } from "native-base";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import WebView from "react-native-webview";
import Loading from "../../components/atoms/Loading";
import { useReplayDetail } from "../../services/hooks/useReplay";
import { parseSRT } from "../../utils/srtParser";
import { JKT48_SHOWROOM_WEB } from "@env";

const getUsernameColor = (username) => {
  const colors = [
    "#FACC15", // yellow
    "#22D3EE", // cyan
    "#4ADE80", // green
    "#60A5FA", // blue
    "#C084FC", // purple
    "#FB923C", // orange
    "#F472B6", // pink
    "#2DD4BF", // teal
    "#F87171", // red
    "#A78BFA", // violet
  ];
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const ReplayDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route?.params || {};
  const videoId = item?.youtube_id ?? item?.id;

  const headerTitle = useMemo(() => {
    if (!item?.title) return "Replay Live";
    let formatted = item?.title?.includes("|")
      ? item?.title
          ?.split(" - ")
          ?.slice(0, -1)
          ?.join(" - ")
          ?.trim()
          ?.replace("JKT48", "")
      : item?.title;
    return `Replay ${formatted
      .replace("LIVE IDN ", "")
      .replace("LIVE SHOWROOM ", "")}`;
  }, [item]);

  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearch) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isSearch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isSearch ? "" : headerTitle,
    });
  }, [navigation, headerTitle, isSearch, searchQuery]);

  const { data: srtData, isLoading } = useReplayDetail(videoId);
  const [parsedChat, setParsedChat] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (srtData && typeof srtData === "string") {
      setParsedChat(parseSRT(srtData));
    }
  }, [srtData]);

  useEffect(() => {
    let interval = null;
    if (playing) {
      interval = setInterval(async () => {
        if (playerRef.current) {
          const time = await playerRef.current.getCurrentTime();
          setCurrentTime(time);
        }
      }, 500);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playing]);

  const visibleMessages = useMemo(() => {
    let messages = parsedChat.filter((msg) => msg.timeInSeconds <= currentTime);

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      messages = messages.filter(
        (msg) =>
          msg.username.toLowerCase().includes(lowerQuery) ||
          msg.message.toLowerCase().includes(lowerQuery)
      );
    }

    // Reverse so newest message appears at index 0
    return [...messages].reverse();
  }, [parsedChat, currentTime, searchQuery]);

  // Track whether user has manually scrolled away from top
  const userScrolledRef = useRef(false);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    userScrolledRef.current = offsetY > 20;
  };

  const prevLengthRef = useRef(0);
  useEffect(() => {
    const newLength = visibleMessages.length;
    if (
      newLength > prevLengthRef.current &&
      !searchQuery &&
      !userScrolledRef.current
    ) {
      // Small timeout lets FlashList finish rendering the new item first
      setTimeout(() => {
        listRef.current?.scrollToIndex({ index: 0, animated: true });
      }, 50);
    }
    prevLengthRef.current = newLength;
  }, [visibleMessages.length, searchQuery, parsedChat]);

  const renderChatItem = ({ item: chatItem, index }) => {
    const userColor = getUsernameColor(chatItem.username || "User");
    return (
      <Box mb="2.5" pt={index === 0 ? "0" : "2"}>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <VStack flex={1} pr="3">
            <HStack flexWrap="wrap">
              <Text
                color={userColor}
                fontWeight="bold"
                fontSize="13px"
                mr="1.5"
              >
                {chatItem.username}
              </Text>
              <Text color="gray.200" fontSize="13px">
                {chatItem.message}
              </Text>
            </HStack>
          </VStack>
          <Text
            color="gray.500"
            fontSize="11px"
            alignSelf="flex-start"
            mt="0.5"
          >
            {chatItem.timeStr}
          </Text>
        </HStack>
      </Box>
    );
  };

  return (
    <Box bg="secondary" flex={1}>
      {isLoading ? (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          justifyContent="center"
          alignItems="center"
          bg="secondary"
        >
          <Loading color="white" />
        </Box>
      ) : videoId ? (
        <WebView
          source={{
            uri: `${JKT48_SHOWROOM_WEB}/replay/${item?.name?.toLowerCase()}/${videoId}?view_type=android`,
          }}
          style={{ flex: 1, backgroundColor: "#282C34" }}
        />
      ) : null}
    </Box>
  );
};

export default ReplayDetail;
