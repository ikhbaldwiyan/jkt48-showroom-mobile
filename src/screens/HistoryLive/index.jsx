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
  useRef
} from "react";
import {
  Box,
  Button,
  ChevronRightIcon,
  Divider,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  Spinner,
  IconButton,
  CheckIcon
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Calendar,
  CloseIcon,
  History,
  LiveIcon,
  LoadingIcon,
  SearchMember,
  TimesFill,
  UsersFill
} from "../../assets/icon";
import Layout from "../../components/templates/Layout";
import TimeAgo from "react-native-timeago";

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
      headerTitle: "History Live",
      headerRight: () =>
        isSearch ? (
          <Input
            mt="1"
            mr="3"
            w="90%"
            autoFocus
            ref={inputRef}
            bgColor="white"
            variant="filled"
            fontSize="sm"
            name="id"
            height="35px"
            placeholderTextColor="secondary"
            placeholder="Cari member"
            value={search}
            onChangeText={handleSearch}
            borderRadius={6}
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
                color="secondary"
              >
                <CloseIcon />
              </Button>
            }
          />
        ) : (
          <IconButton
            icon={<SearchMember color="white" size={25} />}
            onPress={() => setIsSearch(true)}
            mt="2"
            mr="4"
          />
        )
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

  const handleDetail = (member, live_info, log) => {
    navigate("HistoryDetail", {
      url: `https://www.jkt48showroom.com/history/${member.url}/${log.data_id}`,
      title: member.is_official
        ? "JKT48 Official"
        : member.nickname +
          " - " +
          moment(live_info.date.start).format("DD MMMM YYYY")
    });
  };

  const TabButton = ({ type, currentType, label }) => {
    const isActive = type === currentType;

    return (
      <Button
        onPress={() => setType(type)}
        bg={isActive ? "blueLight" : "secondary"}
        borderRadius="full"
        variant={isActive ? "filled" : "outline"}
        borderColor="primary"
        size="md"
        py="1.5"
      >
        <HStack alignItems="center" space={1}>
          {isActive && <CheckIcon size="18px" color="primary" />}
          <Text
            fontWeight={isActive ? "bold" : "medium"}
            color={isActive ? "primary" : "white"}
          >
            {label}
          </Text>
        </HStack>
      </Button>
    );
  };

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <Box flex="1" mb="4">
        <HStack space={2} alignItems="center">
          <TabButton type="all" currentType={type} label="All Platform" />
          <TabButton type="showroom" currentType={type} label="Showroom" />
          <TabButton type="idn" currentType={type} label="IDN Live" />
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
                onPress={() => handleDetail(member, live_info, log)}
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
                            uri: "https://play-lh.googleusercontent.com/gf9vm7y3PgUGzGrt8pqJNtqb6x0AGzojrKlfntGvPyGQSjmPwAls35zZ-CXj_jryA8k"
                          }}
                          width="50"
                          height="50"
                          position="absolute"
                          zIndex="99"
                          bottom={0}
                          borderRightRadius={6}
                          borderBottomRightRadius={0}
                          borderBottomLeftRadius={6}
                        />
                      ) : log.type === "idn" ? (
                        <Image
                          size="md"
                          alt="idn live"
                          source={{
                            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/IDN_Live.svg/2560px-IDN_Live.svg.png"
                          }}
                          width="120"
                          left={2}
                          height="35"
                          position="absolute"
                          bg="rgba(0, 0, 0, 0.1)"
                          zIndex="99"
                          bottom={1}
                          borderRightRadius={6}
                          borderBottomRightRadius={0}
                          shadow="4"
                        />
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
                          <TouchableOpacity
                            onPress={() => handleDetail(member, live_info, log)}
                          >
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
          variant="filled"
          borderRadius="8"
          bg="teal"
          onPress={handleLoadMore}
        >
          <HStack alignItems="center" space={2}>
            <LoadingIcon />
            <Text fontWeight="bold" fontSize="14">
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
    borderRadius: 6
  }
});
