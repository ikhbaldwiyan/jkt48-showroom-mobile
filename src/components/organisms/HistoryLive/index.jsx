import moment from "moment";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRefresh } from "../../../utils/hooks";
import { useHistoryLive } from "../../../services/hooks/useHistoryLive";
import { formatViews, getLiveDurationMinutes } from "../../../utils/helpers";

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


const HistoryLive = ({ liveType = "all" }) => {
  const { navigate } = useNavigation();
  const { refreshing } = useRefresh();
  const [page, setPage] = useState(1);
  const [allLives, setAllLives] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data: historyData, isLoading } = useHistoryLive(liveType, "", page);

  useEffect(() => {
    if (historyData?.recents) {
      if (page === 1) {
        setAllLives(historyData.recents);
      } else {
        setAllLives(prev => [...prev, ...historyData.recents]);
      }
      setHasMore(historyData.recents.length > 0);
    }
  }, [historyData]);

  useEffect(() => {
    if (refreshing) {
      setPage(1);
      setAllLives([]);
      setHasMore(true);
    }
  }, [refreshing]);

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      setPage(prev => prev + 1);
      setIsLoadingMore(false);
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

  return (
    <>
      <Text fontSize="20" mb="4" fontWeight="semibold">
        {liveType === "idn"
          ? "History IDN Live"
          : liveType === "all"
            ? "Live Stream Terakhir"
            : "History Live Showroom"}
      </Text>

      {allLives?.length > 0 && (
        <VStack space={3}>
          {allLives?.map((log, idx) => {
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
                      {liveType === "all" && log.type === "showroom" && !member.is_official ? (
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
                      ) : liveType === "all" && log.type === "idn" ? (
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
                              {formatViews(live_info?.viewers?.num ?? 0)} views
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

      {hasMore && !isLoading && allLives?.length > 0 && (
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
