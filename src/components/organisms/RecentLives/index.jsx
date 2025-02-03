import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { Box, Divider, HStack, Image, Text, VStack } from "native-base";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Calendar,
  History,
  LiveIcon,
  RightArrow,
  TimesFill,
  UsersFill
} from "../../../assets/icon";
import { ROOMS } from "../../../services";
import { formatViews, getLiveDurationMinutes } from "../../../utils/helpers";
import TimeAgo from "react-native-timeago";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useAppStateChange } from "../../../utils/hooks";

const RecentLives = ({ refreshing }) => {
  const navigation = useNavigation();

  const fetchRecentLive = async () => {
    const response = await ROOMS.getRecentLives();
    return response?.data?.recents;
  };

  const { data: recentLives = [], refetch } = useQuery({
    queryKey: ["recentLives"],
    queryFn: fetchRecentLive
  });

  // Refetch when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    refetch();
  }, [refreshing]);

  const isMinuteTime = (endDate) => {
    const currentTime = new Date();
    const diffMinutes = Math.floor((currentTime - new Date(endDate)) / 60000);

    return diffMinutes < 60 ? true : false;
  };

  // Handle app state changes (background -> foreground)
  useAppStateChange(refetch);

  return (
    recentLives.length > 0 && (
      <View>
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="2xl" mb="3" fontWeight="semibold">
            Live Terakhir
          </Text>
          <TouchableOpacity
            onPress={() => navigation.replace("Main", { screen: "History" })}
          >
            <HStack alignItems="center" mb="1" space={2}>
              <Text fontSize="sm">Lihat semua</Text>
              <RightArrow />
            </HStack>
          </TouchableOpacity>
        </HStack>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {recentLives?.map((log, idx) => {
            const { member, live_info } = log;
            return (
              <Box w="265" mr="3" key={idx}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("HistoryDetail", {
                      url: `https://www.jkt48showroom.com/history/${member.url}/${log.data_id}`,
                      title: member?.is_official
                        ? "JKT48 Official"
                        : member?.nickname +
                          " - " +
                          moment(live_info?.date.start).format("DD MMMM YYYY")
                    })
                  }
                >
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#004A66", "#009FCB"]}
                    style={styles.linearGradient}
                  >
                    <Box>
                      <HStack>
                        <Image
                          source={{ uri: member.img_alt }}
                          size="md"
                          alt="image"
                          w="100"
                          h="auto"
                          borderTopLeftRadius={6}
                          borderBottomLeftRadius={6}
                        />
                        <Box>
                          <VStack space={2} p="3">
                            <HStack alignItems="center" space={2}>
                              <Calendar />
                              <Text fontWeight="semibold">
                                {moment(live_info?.date?.start).format(
                                  "dddd, D MMM"
                                )}
                              </Text>
                            </HStack>
                            <HStack alignItems="center" space={2}>
                              <UsersFill />
                              <Text>
                                {formatViews(live_info?.viewers?.num ?? 0)} views
                              </Text>
                            </HStack>
                            <HStack alignItems="center" space={2}>
                              <TimesFill />
                              <Text>
                                {getLiveDurationMinutes(live_info?.duration)}
                              </Text>
                            </HStack>
                            <HStack alignItems="center" space={2}>
                              <LiveIcon size={16} />
                              <Text fontWeight="semibold">
                                {log.type === "showroom"
                                  ? "Showroom"
                                  : "IDN Live"}
                              </Text>
                            </HStack>
                          </VStack>
                        </Box>
                      </HStack>
                    </Box>
                  </LinearGradient>
                </TouchableOpacity>
                <HStack space={3}>
                  <Box
                    mt="3"
                    py="1"
                    px="2"
                    w="45%"
                    borderRadius="md"
                    background="blueGray.600"
                  >
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => {
                        navigation.navigate("RoomDetail", {
                          room: log
                        });
                      }}
                    >
                      <Text fontWeight="bold">
                        {member.url === "jkt48"
                          ? "JKT48 Ofiicial"
                          : member?.nickname + " JKT48"}
                      </Text>
                    </TouchableOpacity>
                  </Box>
                  <Box
                    mt="3"
                    py="1"
                    px="1"
                    w="50%"
                    background="red"
                    borderRadius="md"
                  >
                    <HStack space="1" alignItems="center">
                      <History />
                      <Text
                        fontSize={
                          isMinuteTime(live_info?.date?.end) ? "12.3" : "13"
                        }
                        fontWeight="semibold"
                      >
                        <TimeAgo time={live_info?.date?.end} interval={20000} />
                      </Text>
                    </HStack>
                  </Box>
                </HStack>
              </Box>
            );
          })}
        </ScrollView>
        <Divider my="4" />
      </View>
    )
  );
};

export default RecentLives;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 6
  }
});
