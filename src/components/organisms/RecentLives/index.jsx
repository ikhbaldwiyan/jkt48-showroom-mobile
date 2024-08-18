import moment from "moment";
import React, { useEffect, useState } from "react";
import { Box, Divider, HStack, Image, Text, VStack } from "native-base";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Calendar,
  GiftFill,
  History,
  LiveIcon,
  TimesFill,
  UsersFill
} from "../../../assets/icon";
import { ROOMS } from "../../../services";
import { formatViews, getLiveDurationMinutes } from "../../../utils/helpers";
import TimeAgo from "react-native-timeago";
import { useNavigation } from "@react-navigation/native";

const RecentLives = ({ refreshing }) => {
  const [recentLives, setRecentLives] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    async function getRecentLive() {
      try {
        const response = await ROOMS.getRecentLives();
        setRecentLives(response.data.recents);
      } catch (error) {
        console.log(error);
      }
    }
    getRecentLive();
  }, [refreshing]);

  return (
    recentLives.length > 0 && (
      <View>
        <Text fontSize="2xl" mb="3" fontWeight="semibold">
          Live Terakhir
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {recentLives?.map((log, idx) => {
            const { member, live_info } = log;
            return (
              <Box w="265" mr="3" key={idx}>
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
                              {formatViews(live_info?.viewers?.num)} views
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
                            <Text>
                              {log.type === "showroom" ? "Showroom" : "IDN Live"}
                            </Text>
                          </HStack>
                        </VStack>
                      </Box>
                    </HStack>
                  </Box>
                </LinearGradient>
                <HStack space={3}>
                  <Box
                    mt="3"
                    py="1"
                    borderRadius="md"
                    px="2"
                    w="45%"
                    background="teal"
                  >
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => {
                        navigate("RoomDetail", {
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
                    borderRadius="md"
                    px="1"
                    w="50%"
                    background="red"
                  >
                    <HStack alignItems="center">
                      <History />
                      <Text ml="0.5" fontSize="13" fontWeight="semibold">
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
