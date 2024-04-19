import moment from "moment";
import React, { useEffect, useState } from "react";
import { Box, Divider, HStack, Image, Text, VStack } from "native-base";
import { ScrollView, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Calendar,
  GiftFill,
  History,
  TimesFill,
  UsersFill
} from "../../../assets/icon";
import { ROOMS } from "../../../services";
import { formatViews, getLiveDurationMinutes } from "../../../utils/helpers";
import TimeAgo from "react-native-timeago";

const RecentLives = ({ refreshing }) => {
  const [recentLives, setRecentLives] = useState([]);

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

  return recentLives.length > 0 && (
    <View>
      <Text fontSize="2xl" mb="3" fontWeight="semibold">
        Recent Lives
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {recentLives?.map((log, idx) => {
          const { member, live_info } = log;
          return (
            <Box w="265" mr="3" key={idx}>
              <LinearGradient
                colors={["#24A2B7", "#4724B7"]}
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
                              "dddd, D MMMM"
                            )}
                          </Text>
                        </HStack>
                        <HStack alignItems="center" space={2}>
                          <UsersFill />
                          <Text fontWeight="semibold">
                            {formatViews(live_info?.viewers?.num)} Views
                          </Text>
                        </HStack>
                        <HStack alignItems="center" space={2}>
                          <TimesFill />
                          <Text fontWeight="semibold">
                            {getLiveDurationMinutes(live_info?.duration)}
                          </Text>
                        </HStack>
                        <HStack alignItems="center" space={2}>
                          <GiftFill />
                          <Text fontWeight="semibold">
                            {formatViews(log.points)} Gold
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
                  <Text fontWeight="bold">
                    {member.url === "jkt48" ? (
                      "JKT48 Ofiicial"
                    ) : (
                      member?.nickname + " JKT48"
                    )}
                  </Text>
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
  );
};

export default RecentLives;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 6
  }
});
