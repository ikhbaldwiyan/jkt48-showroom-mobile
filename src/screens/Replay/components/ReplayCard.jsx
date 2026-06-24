import React, { useCallback, useEffect } from "react";
import {
  Box,
  ChevronRightIcon,
  Divider,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Calendar, TimesIcon } from "../../../assets/icon";
import { useReplaylist } from "../../../services/hooks/useReplay";
import moment from "moment";
import { useAppStateChange } from "../../../utils/hooks";

const ReplayCard = ({ refreshing }) => {
  const navigation = useNavigation();
  const { data, refetch } = useReplaylist();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    refetch();
  }, [refreshing]);

  useAppStateChange(refetch);

  return (
    data && (
      <Box mb="3">
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="2xl" mb="3" fontWeight="semibold">
            Replay Live
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("ReplayList")}>
            <HStack alignItems="center" mb="1" space={1.5}>
              <Text fontSize="sm" color="gray.400">
                Lihat semua
              </Text>
              <ChevronRightIcon size="3" />
            </HStack>
          </TouchableOpacity>
        </HStack>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack space={3}>
            {data?.slice(0, 10)?.map((item) => (
              <TouchableOpacity
                key={item?.id || item?.youtube_id}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("ReplayDetail", { item })}
              >
                <Box w="250" height="auto">
                  <VStack space={2}>
                    <Image
                      source={{
                        uri: `https://img.youtube.com/vi/${
                          item.youtube_id ?? item?.id
                        }/mqdefault.jpg`,
                      }}
                      fallbackSource={{
                        uri: "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg",
                      }}
                      alt="image"
                      width="100%"
                      height={160}
                      borderRadius="md"
                      resizeMode="cover"
                    />
                    <Text fontSize="md" fontWeight="semibold">
                      {item?.title?.includes("|")
                        ? item?.title
                            ?.split(" - ")
                            ?.slice(0, -1)
                            ?.join(" - ")
                            ?.trim()
                            .replace("LIVE IDN ", "") +
                          (item.platform === "IDN"
                            ? " - IDN Live"
                            : " - Showroom")
                        : item?.title}
                    </Text>
                    <HStack alignItems="center" space={1.5}>
                      <Calendar size={14} color="#d4d4d8" />
                      <Text fontSize={13} color="gray.300">
                        {item?.title?.includes("|")
                          ? item?.title
                              ?.split(" - ")
                              ?.pop()
                              ?.split(" | ")?.[0]
                              ?.trim()
                          : moment(item.date).format("DD MMM YYYY")}
                      </Text>
                      <Text>-</Text>
                      <TimesIcon size={14} color="#d4d4d8" />
                      <Text fontSize={13} color="gray.300">
                        {item?.title?.includes("|")
                          ? item?.title?.split(" | ")?.[1]?.trim()
                          : moment(item.added_at).format("HH:mm")}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </TouchableOpacity>
            ))}
          </HStack>
        </ScrollView>
        <Divider mt="4" />
      </Box>
    )
  );
};

export default ReplayCard;
