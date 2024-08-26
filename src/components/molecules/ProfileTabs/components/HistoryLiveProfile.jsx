import React, { useEffect } from "react";
import {
  Text,
  HStack,
  Image,
  Box,
  VStack,
  Divider,
  ScrollView,
  ChevronRightIcon
} from "native-base";
import { TouchableOpacity } from "react-native";
import TimeAgo from "react-native-timeago";
import moment from "moment";

import { getLiveDurationMinutes } from "../../../../utils/helpers";
import { History, LiveIcon, TimesFill } from "../../../../assets/icon";
import useProfileStore from "../../../../store/profileStore";
import { useNavigation } from "@react-navigation/native";
import CardGradient from "../../../atoms/CardGradient";

export const HistoryLiveProfile = () => {
  const { profile, historyLive, getHistoryLive } = useProfileStore();
  const { navigate } = useNavigation();

  useEffect(() => {
    const fetchHistory = async () => {
      await getHistoryLive(profile?.room_id);
    };

    fetchHistory();
  }, [profile]);

  return (
    <CardGradient>
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
              <Box flex={1}>
                <VStack space={2.5}>
                  <TouchableOpacity
                    onPress={() =>
                      navigate("HistoryDetail", {
                        url: `https://www.jkt48showroom.com/history/${item?.member.url}/${item?.data_id}`,
                        title: item?.member.is_official
                          ? "JKT48 Official"
                          : item?.member.nickname +
                            " - " +
                            moment(item?.live_info.date.start).format(
                              "DD MMMM YYYY"
                            )
                      })
                    }
                  >
                    <HStack alignItems="center" justifyContent="space-between">
                      <Text color="gray.100" fontSize="md" fontWeight="bold">
                        {moment(item?.live_info?.date?.start).format(
                          "dddd, D MMM"
                        )}
                      </Text>
                      <Box>
                        <HStack alignItems="center" space={1}>
                          <Text color="gray.200" fontSize="xs">
                            Detail
                          </Text>
                          <ChevronRightIcon size="xs" color="gray.200" />
                        </HStack>
                      </Box>
                    </HStack>
                  </TouchableOpacity>

                  <HStack space={2} alignItems="center">
                    <LiveIcon size={18} />
                    <Text>
                      {item?.type === "showroom" ? "Showroom" : "IDN Live"}
                    </Text>
                  </HStack>
                  <HStack space={2} alignItems="center">
                    <TimesFill size={18} />
                    <Text>
                      {getLiveDurationMinutes(item?.live_info?.duration)}
                    </Text>
                  </HStack>
                  <HStack space={2} alignItems="center">
                    <History size="18" />
                    <Text>
                      <TimeAgo
                        time={item?.live_info?.date?.end}
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
    </CardGradient>
  );
};
