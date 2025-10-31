import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Box,
  ChevronRightIcon,
  Divider,
  HStack,
  Image,
  Text,
  VStack,
} from "native-base";
import React, { useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import TimeAgo from "react-native-timeago";
import {
  GiftOutline,
  IDNLiveIcon,
  TimesIcon,
  UserIconOutline,
} from "../../../assets/icon";
import { useHistoryLive } from "../../../services/hooks/useHistoryLive";
import {
  estimateIDNGift,
  estimateSRGift,
  formatViews,
} from "../../../utils/helpers";
import { useAppStateChange } from "../../../utils/hooks";

const RecentLives = ({ refreshing }) => {
  const navigation = useNavigation();
  const { data: historyLive = [], refetch } = useHistoryLive("all", "", 1);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    refetch();
  }, [refreshing]);

  // Handle app state changes (background -> foreground)
  useAppStateChange(refetch);

  return (
    historyLive?.recents?.length > 0 && (
      <View>
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="2xl" mb="3" fontWeight="semibold">
            Live Terakhir
          </Text>
          <TouchableOpacity
            onPress={() => navigation.replace("Main", { screen: "History" })}
          >
            <HStack alignItems="center" mb="1" space={1.5}>
              <Text fontSize="sm" color="gray.400">
                Lihat semua
              </Text>
              <ChevronRightIcon />
            </HStack>
          </TouchableOpacity>
        </HStack>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#64748B", "#21252B"]}
          style={styles.linearGradient}
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {historyLive?.recents?.map((log, idx) => {
              const { member, live_info } = log;
              return (
                <Box w="100" mr="3" key={idx}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate("HistoryDetail", {
                        liveId: log.data_id,
                      })
                    }
                  >
                    <Box>
                      <HStack>
                        <Image
                          source={{ uri: member.img_alt }}
                          size="md"
                          alt="image"
                          w="100"
                          h="130"
                          borderRadius="md"
                        />
                        <Box
                          position="absolute"
                          top={1.5}
                          left={1.5}
                          zIndex={99}
                        >
                          {log?.type === "showroom" ? (
                            <Image
                              size="sm"
                              alt="showroom"
                              source={{
                                uri: "https://play-lh.googleusercontent.com/gf9vm7y3PgUGzGrt8pqJNtqb6x0AGzojrKlfntGvPyGQSjmPwAls35zZ-CXj_jryA8k",
                              }}
                              width="6"
                              height="6"
                              rounded="md"
                            />
                          ) : (
                            <IDNLiveIcon />
                          )}
                        </Box>
                      </HStack>
                      <VStack space={1} mt="2">
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() =>
                            navigation.navigate("RoomDetail", {
                              room: {
                                room_id: log.room_id
                              },
                            })
                          }
                        >
                          <Text fontWeight="medium" fontSize="md">
                            {member.url === "jkt48"
                              ? "JKT48"
                              : member?.nickname}
                          </Text>
                        </TouchableOpacity>
                        <HStack space={1.5} alignItems="center">
                          <TimesIcon color="#A3A3A3" size={16} />
                          <Text color="#A3A3A3" fontSize={12.5}>
                            <TimeAgo
                              time={live_info?.date?.end}
                              interval={20000}
                              hideAgo
                            />
                            {" lalu"}
                          </Text>
                        </HStack>
                        <HStack alignItems="center" space={1.5}>
                          <UserIconOutline size="16" color="#A3A3A3" />
                          <Text color="#A3A3A3" fontSize={12.5}>
                            {formatViews(live_info?.viewers?.num ?? 0)} views
                          </Text>
                        </HStack>
                        <HStack space={1.5} alignItems="center">
                          <GiftOutline size="17" color="#A3A3A3" />
                          <Text color="gray.400" fontSize={12.5}>
                            {log?.type === "showroom"
                              ? `Rp${formatViews(estimateSRGift(log?.points))}`
                              : `Rp${formatViews(
                                  estimateIDNGift(log?.points)
                                )}`}
                          </Text>
                        </HStack>
                      </VStack>
                    </Box>
                  </TouchableOpacity>
                </Box>
              );
            })}
          </ScrollView>
        </LinearGradient>
        <Divider my="4" />
      </View>
    )
  );
};

export default RecentLives;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
  },
});
