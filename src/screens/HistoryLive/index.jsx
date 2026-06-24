import moment from "moment";
import debounce from "lodash/debounce";
import { useNavigation } from "@react-navigation/native";
import { useRefresh } from "../../utils/hooks/useRefresh";
import { useHistoryLiveInfinite } from "../../services/hooks/useHistoryLive";
import { formatViews, getLiveDurationMinutes } from "../../utils/helpers";

import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  Box,
  Button,
  ChevronRightIcon,
  Divider,
  HStack,
  Image,
  Text,
  VStack,
  Spinner,
  IconButton,
  SearchIcon,
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Calendar,
  CloseIcon,
  History,
  IDNLiveIcon,
  LoadingIcon,
  SearchMember,
  TimesFill,
  UsersFill,
} from "../../assets/icon";
import Layout from "../../components/templates/Layout";
import TimeAgo from "react-native-timeago";
import TabButton from "../../components/atoms/TabButton";
import FormInput from "../../components/atoms/FormInput";

const HistoryLive = () => {
  const { navigate, setOptions } = useNavigation();
  const { refreshing, onRefresh } = useRefresh();
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const inputRef = useRef(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useHistoryLiveInfinite(type, debouncedSearch);

  const recentLives = data?.pages?.flatMap((page) => page.recents) || [];

  useLayoutEffect(() => {
    setOptions({
      headerTitle: isSearch ? "" : "History Live",
      headerRight: () =>
        isSearch ? (
          <FormInput
            mt="1"
            mr="3"
            w="90%"
            mb={0}
            autoFocus
            ref={inputRef}
            placeholder="Cari member"
            value={search}
            onChange={handleSearch}
            InputLeftElement={
              <Box ml="2">
                <SearchMember />
              </Box>
            }
            InputRightElement={
              <Button
                onPress={() => {
                  search.length > 0 && handleSearch("");
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
            mt="2"
          />
        ),
    });
  }, [search, isSearch]);

  useEffect(() => {
    if (isSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearch]);

  const debouncedChangeHandler = useCallback(
    debounce((value) => {
      setDebouncedSearch(value);
    }, 400),
    []
  );

  const handleSearch = (query) => {
    setSearch(query);
    debouncedChangeHandler(query);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleDetail = (log) => {
    navigate("HistoryDetail", {
      liveId: log.data_id,
    });
  };

  const handleProfile = (log) => {
    navigate("RoomDetail", {
      room: {
        room_id: log.room_id
      },
    });
  };

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <Box flex="1" mb="4">
        <HStack space={2} alignItems="center">
          <TabButton
            onPress={() => setType("all")}
            type="all"
            currentType={type}
            label="All Platform"
          />
          <TabButton
            onPress={() => setType("showroom")}
            type="showroom"
            currentType={type}
            label="Showroom"
          />
          <TabButton
            onPress={() => setType("idn")}
            type="idn"
            currentType={type}
            label="IDN Live"
          />
        </HStack>
      </Box>

      {recentLives.length > 0 && (
        <VStack space={3}>
          {recentLives?.map((log, idx) => {
            const { member, live_info } = log;
            return (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.7}
                onPress={() => handleDetail(log)}
              >
                <Box w="100%" mr="3">
                  <LinearGradient
                    start={{ x: -0, y: 0 }}
                    end={{ x: 1, y: 2 }}
                    colors={["#004A66", "#009FCB"]}
                    style={styles.linearGradient}
                  >
                    <HStack>
                      {log.type === "showroom" && !member.is_official ? (
                        <Image
                          size="md"
                          alt="showroom"
                          source={{
                            uri: "https://play-lh.googleusercontent.com/gf9vm7y3PgUGzGrt8pqJNtqb6x0AGzojrKlfntGvPyGQSjmPwAls35zZ-CXj_jryA8k",
                          }}
                          width="38"
                          height="38"
                          position="absolute"
                          zIndex="99"
                          bottom={0}
                          borderRightRadius={6}
                          borderBottomRightRadius={0}
                          borderBottomLeftRadius={6}
                        />
                      ) : log.type === "idn" ? (
                        <Box
                          position="absolute"
                          bg="rgba(0, 0, 0, 0.1)"
                          zIndex="99"
                          bottom="1"
                          left="2"
                        >
                          <IDNLiveIcon />
                        </Box>
                      ) : null}
                      <Image
                        source={{ uri: member.img_alt }}
                        size="md"
                        alt="image"
                        w="130"
                        h="auto"
                        borderTopLeftRadius={6}
                        borderBottomLeftRadius={6}
                      />
                      <Box px="2" flex={1}>
                        <VStack space={2} p="3">
                          <TouchableOpacity onPress={() => handleProfile(log)}>
                            <HStack
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Text
                                color="blueGray.100"
                                fontSize="xl"
                                fontWeight="bold"
                              >
                                {member.url === "jkt48"
                                  ? "JKT48 Official"
                                  : member?.nickname}
                              </Text>
                              <ChevronRightIcon color="white" />
                            </HStack>
                          </TouchableOpacity>
                          <Divider />
                          <HStack alignItems="center" space={2}>
                            <Calendar size={20} />
                            <Text fontSize="15">
                              {moment(live_info?.date?.start).format(
                                "dddd, D MMMM"
                              )}
                            </Text>
                          </HStack>
                          <HStack alignItems="center" space={2}>
                            <UsersFill size={20} />
                            <Text fontSize="15">
                              {formatViews(live_info?.viewers?.num)} views
                            </Text>
                          </HStack>
                          <HStack alignItems="center" space={2}>
                            <TimesFill size={20} />
                            <Text fontSize="15">
                              {getLiveDurationMinutes(live_info?.duration)}
                            </Text>
                          </HStack>
                          <HStack space={2} alignItems="center">
                            <History size={20} />
                            <Text fontSize="15" fontWeight="semibold">
                              <TimeAgo
                                time={live_info?.date?.end}
                                interval={20000}
                              />
                            </Text>
                          </HStack>
                        </VStack>
                      </Box>
                    </HStack>
                  </LinearGradient>
                </Box>
              </TouchableOpacity>
            );
          })}
        </VStack>
      )}

      {isLoading && (
        <HStack justifyContent="center" mt="5" my="4">
          <Spinner color="white" size="lg" />
        </HStack>
      )}

      {hasNextPage && !isFetchingNextPage && recentLives.length > 0 && (
        <Button
          mt="4"
          variant="outline"
          borderRadius="xl"
          borderColor="primary"
          onPress={handleLoadMore}
        >
          <HStack alignItems="center" space={2}>
            <LoadingIcon />
            <Text fontWeight="semibold" fontSize="14">
              Lihat History Live Lainnya
            </Text>
          </HStack>
        </Button>
      )}

      {isFetchingNextPage && (
        <HStack justifyContent="center" mt="5" my="4">
          <Spinner color="white" size="lg" />
        </HStack>
      )}
      <Box my="4" />
    </Layout>
  );
};

export default HistoryLive;

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 6,
  },
});
