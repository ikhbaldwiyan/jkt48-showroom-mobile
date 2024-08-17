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
  VStack
} from "native-base";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Calendar, History, TimesFill, UsersFill } from "../../assets/icon";
import { ROOMS } from "../../services";
import { formatViews, getLiveDurationMinutes } from "../../utils/helpers";
import TimeAgo from "react-native-timeago";
import { useNavigation } from "@react-navigation/native";
import Layout from "../../components/templates/Layout";

const RecentLives = ({ refreshing }) => {
  const [recentLives, setRecentLives] = useState([]);
  const { navigate, setOptions } = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: "History Live Streaming"
    });
  }, [setOptions]);

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
    <Layout>
      {recentLives.length > 0 && (
        <VStack space={4}>
          <Box flex="1" mb="1">
            <HStack space={1.5}>
              <Input
                bgColor="white"
                variant="filled"
                w="50%"
                fontSize="sm"
                name="id"
                height="36px"
                placeholderTextColor="secondary"
                placeholder="Cari History Live"
                // value={searchQuery}
                // onChangeText={handleSearch}
              />
              <Button
                p="2"
                height="36px"
                bg={"primary"}
                // onPress={() => setActiveTab("regular")}
              >
                <HStack space={1} alignItems="center">
                  <Text fontWeight="semibold">Showroom</Text>
                </HStack>
              </Button>
              <Button
                p="2"
                height="36px"
                bg={"blueGray.500"}
                // onPress={() => setActiveTab("trainee")}
              >
                <HStack space={1} alignItems="center">
                  <Text fontWeight="semibold">IDN Live</Text>
                </HStack>
              </Button>
            </HStack>
          </Box>
          {recentLives?.map((log, idx) => {
            const { member, live_info } = log;
            return (
              <Box w="100%" mr="3" key={idx}>
                <LinearGradient
                  start={{ x: -0, y: 0 }}
                  end={{ x: 1, y: 2 }}
                  colors={["#004A66", "#009FCB"]}
                  style={styles.linearGradient}
                >
                  <Box>
                    <HStack>
                      <Image
                        size="md"
                        alt="showroom"
                        source={{
                          uri: "https://res.cloudinary.com/dqkx0epzw/image/fetch/f_auto,q_80/https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/SHOWROOM_logo.svg/500px-SHOWROOM_logo.svg.png"
                        }}
                        width="20"
                        height="20"
                        position="absolute"
                        top={0}
                      />
                      <Image
                        source={{ uri: member.img_alt }}
                        size="md"
                        alt="image"
                        w="130"
                        h="auto"
                        borderTopLeftRadius={6}
                        borderBottomLeftRadius={6}
                      />
                      <Box px="2.5">
                        <VStack space={2} p="3">
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
                                ? "JKT48 Ofiicial"
                                : member?.nickname}
                            </Text>
                            <ChevronRightIcon color="white" />
                          </HStack>
                          <Divider />
                          <HStack alignItems="center" space={2}>
                            <Calendar size={20} />
                            <Text fontSize="15" fontWeight="semibold">
                              {moment(live_info?.date?.start).format(
                                "dddd, D MMMM"
                              )}
                            </Text>
                          </HStack>
                          <HStack alignItems="center" space={2}>
                            <UsersFill size={20} />
                            <Text fontSize="15" fontWeight="semibold">
                              {formatViews(live_info?.viewers?.num)} views
                            </Text>
                          </HStack>
                          <HStack alignItems="center" space={2}>
                            <TimesFill size={20} />
                            <Text fontSize="15" fontWeight="semibold">
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
                  </Box>
                </LinearGradient>
              </Box>
            );
          })}
          <Divider my="4" />
        </VStack>
      )}
    </Layout>
  );
};

export default RecentLives;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 6
  }
});
