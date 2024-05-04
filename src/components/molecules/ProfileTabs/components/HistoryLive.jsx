import React, { useEffect } from "react";
import {
  Text,
  HStack,
  Image,
  Box,
  VStack,
  Divider,
  ScrollView
} from "native-base";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import TimeAgo from "react-native-timeago";
import moment from "moment";

import { formatViews, getLiveDurationMinutes } from "../../../../utils/helpers";
import { History, TimesFill, UsersIconFill } from "../../../../assets/icon";
import useProfileStore from "../../../../store/profileStore";

const HistoryLive = () => {
  const { profile, historyLive, getHistoryLive } = useProfileStore();

  useEffect(() => {
    const fetchHistory = async () => {
      await getHistoryLive(profile?.room_id);
    };

    fetchHistory();
  }, [profile]);

  return (
    <LinearGradient
      colors={["#24A2B7", "#3B82F6"]}
      style={styles.linearGradient}
    >
      <ScrollView mt="2">
        {historyLive?.map((item, idx) => (
          <Box key={idx}>
            <HStack space={3}>
              <Image
                size="sm"
                borderRadius="md"
                source={{
                  uri: item.member.img_alt
                }}
                alt="image"
                width="90"
                height="120"
              />
              <Box>
                <VStack space={2.5}>
                  <Text color="gray.100" fontSize="md" fontWeight="bold">
                    {moment(item.live_info?.date?.start).format("dddd, D MMMM")}
                  </Text>
                  <HStack space={1} alignItems="center">
                    <UsersIconFill />
                    <Text>
                      {formatViews(item.live_info?.viewers?.num)} Views
                    </Text>
                  </HStack>
                  <HStack space={1} alignItems="center">
                    <TimesFill />
                    <Text>
                      {" "}
                      {getLiveDurationMinutes(item.live_info?.duration)}
                    </Text>
                  </HStack>
                  <HStack space={1} alignItems="center">
                    <History size="18" />
                    <Text>
                      <TimeAgo
                        time={item.live_info?.date?.end}
                        interval={20000}
                      />
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </HStack>
            <Divider my="4" />
          </Box>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

export default HistoryLive;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  }
});
