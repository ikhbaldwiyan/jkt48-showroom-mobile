import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";
import {
  Box,
  HStack,
  Text,
  VStack,
  Skeleton,
  Button,
  IconButton,
  CloseIcon,
  SearchIcon,
} from "native-base";
import { useRoute, useNavigation } from "@react-navigation/native";
import YoutubeIframe from "react-native-youtube-iframe";
import { FlashList } from "@shopify/flash-list";
import Layout from "../../components/templates/Layout";
import { useReplayDetail } from "../../services/hooks/useReplay";
import { parseSRT } from "../../utils/srtParser";
import FormInput from "../../components/atoms/FormInput";
import { ChatIcon } from "../../assets/icon";
import { formatViews } from "../../utils/helpers";

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
  const { item } = route.params || {};

  const videoId = item?.youtube_id ?? item?.id;

  const headerTitle = useMemo(() => {
    if (!item?.title) return "Replay Live";
    let formatted = item?.title?.includes("|")
      ? item?.title?.split(" - ")?.slice(0, -1)?.join(" - ")?.trim()?.replace("JKT48", "")
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
      headerRight: () =>
        isSearch ? (
          <FormInput
            mt="1"
            w="250"
            mb={0}
            autoFocus
            ref={inputRef}
            placeholder="Cari chat..."
            value={searchQuery}
            onChange={setSearchQuery}
            InputRightElement={
              <Button
                onPress={() => {
                  searchQuery.length > 0 && setSearchQuery("");
                  setIsSearch(false);
                }}
                variant="unstyled"
                p="0"
              >
                <CloseIcon color="secondary" />
              </Button>
            }
          />
        ) : (
          <IconButton
            icon={<SearchIcon color="white" size={25} />}
            onPress={() => setIsSearch(true)}
            mt="1"
          />
        ),
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
    <Layout isScrollView={false}>
      <Box flex={1} bg="secondary">
        {videoId ? (
          <Box width="100%" bg="secondary" borderRadius="md" zIndex={10}>
            <YoutubeIframe
              ref={playerRef}
              height={220}
              play={playing}
              videoId={videoId}
              onChangeState={(event) => {
                if (event === "playing") {
                  setPlaying(true);
                } else if (event === "paused" || event === "ended") {
                  setPlaying(false);
                }
              }}
            />
          </Box>
        ) : (
          <Box
            width="100%"
            height={220}
            bg="black"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="white">Video Not Available</Text>
          </Box>
        )}

        <Box
          flex={1}
          p="4"
          bg="black"
          mb="10"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.800"
        >
          <HStack justifyContent="space-between" alignItems="center" mb="4">
            <HStack alignItems="center" space={2}>
              <ChatIcon size={20} color="white" />
              <Text color="gray.100" fontWeight="bold" fontSize="sm">
                CHAT LIST
              </Text>
            </HStack>
            <Text color="gray.500" fontSize="xs" fontWeight="medium">
              {formatViews(parsedChat.length)} MESSAGES
            </Text>
          </HStack>

          {isLoading ? (
            <VStack space={3} mt="2">
              <Skeleton
                h="4"
                w="80%"
                rounded="md"
                bg="gray.700"
                startColor="gray.700"
              />
              <Skeleton
                h="4"
                w="60%"
                rounded="md"
                bg="gray.700"
                startColor="gray.700"
              />
              <Skeleton
                h="4"
                w="90%"
                rounded="md"
                bg="gray.700"
                startColor="gray.700"
              />
            </VStack>
          ) : (
            <Box flex={1}>
              <FlashList
                ref={listRef}
                data={visibleMessages}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => (
                  <Box mt={20} justifyContent="center" alignItems="center">
                    <Text color="gray.200" textAlign="center">
                      {(isLoading || playing)
                        ? "Loading replay chat..."
                        : "Play video untuk lihat replay chat"}
                    </Text>
                  </Box>
                )}
                renderItem={renderChatItem}
                estimatedItemSize={50}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default ReplayDetail;
