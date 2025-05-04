import moment from "moment";
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Box,
  Button,
  ChevronRightIcon,
  Divider,
  HStack,
  Image,
  Text,
  VStack,
  Spinner
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Calendar,
  History,
  LoadingIcon,
  TimesFill,
  UsersFill
} from "../../../assets/icon";
import TimeAgo from "react-native-timeago";
import { useNavigation } from "@react-navigation/native";
import { useRefresh } from "../../../utils/hooks";
import { ROOMS } from "../../../services";
import { formatViews, getLiveDurationMinutes } from "../../../utils/helpers";

const HistoryLive = ({ liveType = "showroom" }) => {
  const [recentLives, setRecentLives] = useState([]);
  const { navigate } = useNavigation();
  const { refreshing } = useRefresh();
  const [type] = useState(liveType);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    loadLives();
  }, [refreshing, type, page]);

  const loadLives = async () => {
    try {
      if (loadingMore || allLoaded) return;

      setLoadingMore(true);
      const response = await ROOMS.getHistoryLives(type, "", page);

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

  const handleLoadMore = () => {
    if (!loadingMore && !allLoaded) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const resetLives = async () => {
      try {
        setPage(1);
        setAllLoaded(false);
        const response = await ROOMS.getHistoryLives(type, "", 1);
        setRecentLives(response.data.recents);
      } catch (error) {
        console.log(error);
      }
    };

    resetLives();
  }, [refreshing]);

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

  return (
    <>
      <Text fontSize="20" mb="3" fontWeight="semibold">
        {liveType === "idn" ? "History IDN Live" : "History Live Showroom"}
      </Text>

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

      {!allLoaded && !loadingMore && recentLives.length > 0 && (
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

      {loadingMore && (
        <HStack justifyContent="center" mt="5" my="4">
          <Spinner color="white" size="lg" />
        </HStack>
      )}
      <Box my="4" />
    </>
  );
};

export default HistoryLive;

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 6,
  },
});
