import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
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
  FlatList,
  Spinner
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Calendar, History, TimesFill, UsersFill } from "../../assets/icon";
import { ROOMS } from "../../services";
import { formatViews, getLiveDurationMinutes } from "../../utils/helpers";
import TimeAgo from "react-native-timeago";
import { useNavigation } from "@react-navigation/native";
import Layout from "../../components/templates/Layout";
import { useRefresh } from "../../utils/hooks/useRefresh";

const HistoryLive = () => {
  const [recentLives, setRecentLives] = useState([]);
  const { navigate, setOptions } = useNavigation();
  const { refreshing, onRefresh } = useRefresh();
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      headerTitle: "History Live"
    });
  }, [setOptions]);

  useEffect(() => {
    loadLives();
  }, [refreshing, type, search, page]);

  const loadLives = async () => {
    try {
      if (loadingMore || allLoaded) return;

      setLoadingMore(true);
      const response = await ROOMS.getHistoryLives(type, search, page);

      if (response.data.recents.length > 0) {
        setRecentLives((prevLives) => [...prevLives, ...response.data.recents]);
      } else {
        setAllLoaded(true); // No more items to load
      }

      setLoadingMore(false);
    } catch (error) {
      console.log(error);
      setLoadingMore(false);
    }
  };

  const handleSearch = (query) => {
    setSearch(query);
    setPage(1); // Reset page
    setRecentLives([]); // Clear current list
    setAllLoaded(false); // Reset allLoaded status
  };

  const handleLoadMore = () => {
    if (!loadingMore && !allLoaded) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Reset the lives data when the `type` changes
  useEffect(() => {
    const resetLives = async () => {
      try {
        setPage(1);
        setAllLoaded(false);
        const response = await ROOMS.getHistoryLives(type, search, 1);
        setRecentLives(response.data.recents);
      } catch (error) {
        console.log(error);
      }
    };

    resetLives();
  }, [type, refreshing]);

  const MemoizedItem = React.memo(({ log, index, recentLives, navigate }) => {
    const { member, live_info } = log;
    const isLastItem = index === recentLives.length - 1;

    return (
      <Box
        w="100%"
        my={index !== 0 ? "3" : "1"}
        mb={isLastItem ? "5" : "0"}
        mr="3"
        key={index}
      >
        <LinearGradient
          start={{ x: -0, y: 0 }}
          end={{ x: 1, y: 2 }}
          colors={["#004A66", "#009FCB"]}
          style={styles.linearGradient}
        >
          <HStack>
            {log.type === "showroom" ? (
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
            ) : (
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
            )}
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
                  onPress={() =>
                    navigate("HistoryDetail", {
                      url: `https://www.jkt48showroom.com/history/${member.url}/${log.data_id}`,
                      title: member.is_official
                        ? "JKT48 Official"
                        : member.nickname +
                          " - " +
                          moment(live_info.date.start).format("DD MMMM YYYY")
                    })
                  }
                >
                  <VStack space={1}>
                    <HStack alignItems="center" justifyContent="space-between">
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
                  </VStack>
                </TouchableOpacity>
                <Divider />
                <HStack alignItems="center" space={2}>
                  <Calendar size={20} />
                  <Text fontSize="15">
                    {moment(live_info?.date?.start).format("dddd, D MMMM")}
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
                    <TimeAgo time={live_info?.date?.end} interval={20000} />
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </HStack>
        </LinearGradient>
      </Box>
    );
  });

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <Box flex="1" mb="4">
        <HStack space={1.5} alignItems="center">
          <Input
            bgColor="white"
            variant="filled"
            flex={2}
            fontSize="sm"
            name="id"
            height="36px"
            placeholderTextColor="secondary"
            placeholder="Cari member"
            value={search}
            onChangeText={handleSearch}
            borderRadius={6}
          />
          <Button
            p="2"
            height="36px"
            borderRadius={6}
            bg={type === "all" ? "teal" : "blueGray.500"}
            onPress={() => setType("all")}
          >
            <HStack space={1} alignItems="center" justifyContent="center">
              <Text fontWeight="semibold">All</Text>
            </HStack>
          </Button>
          <Button
            p="2"
            height="36px"
            borderRadius={6}
            bg={type === "showroom" ? "teal" : "blueGray.500"}
            onPress={() => setType("showroom")}
          >
            <HStack space={1} alignItems="center" justifyContent="center">
              <Text fontWeight="semibold">Showroom</Text>
            </HStack>
          </Button>
          <Button
            flex={1}
            p="2"
            height="36px"
            borderRadius={6}
            bg={type === "idn" ? "teal" : "blueGray.500"}
            onPress={() => setType("idn")}
          >
            <HStack space={1} alignItems="center" justifyContent="center">
              <Text fontWeight="semibold">IDN Live</Text>
            </HStack>
          </Button>
        </HStack>
      </Box>

      {recentLives.length > 0 ? (
        <FlatList
          data={recentLives}
          renderItem={({ item, index }) => (
            <MemoizedItem
              log={item}
              index={index}
              recentLives={recentLives}
              navigate={navigate}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            loadingMore ? (
              <Spinner my="6" color="blueGray.400" size="lg" />
            ) : null
          }
          initialNumToRender={8} // Number of items rendered initially
          maxToRenderPerBatch={5} // Number of items rendered in each batch
          removeClippedSubviews={true} // Improves memory usage by removing off-screen items
          windowSize={8} // Number of items rendered outside the viewable area
        />
      ) : (
        <Text>No history available</Text>
      )}
    </Layout>
  );
};

export default HistoryLive;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 6
  }
});
