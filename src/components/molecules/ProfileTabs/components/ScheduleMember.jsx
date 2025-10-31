import React, { useEffect } from "react";
import {
  Text,
  HStack,
  Image,
  Box,
  VStack,
  Divider,
  ScrollView,
} from "native-base";
import { TouchableOpacity } from "react-native";
import TimeAgo from "react-native-timeago";
import moment from "moment";

import {
  Calendar,
  History,
  TimesFill,
} from "../../../../assets/icon";
import useProfileStore from "../../../../store/profileStore";
import { useNavigation } from "@react-navigation/native";
import CardGradient from "../../../atoms/CardGradient";
import {
  useMemberShowroomProfile,
  useScheduleOshimen,
} from "../../../../services/hooks/useMembers";

export const ScheduleMember = () => {
  const { profile } = useProfileStore();
  const { navigate } = useNavigation();
  const { data } = useMemberShowroomProfile(profile?.room_id);
  const { data: schedule } = useScheduleOshimen(data?.profile?._id);

  return (
    <CardGradient>
      <ScrollView mt="2">
        {schedule?.items?.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            activeOpacity={0.7}
            onPress={() => navigate("ScheduleDetail", { item })}
          >
            <HStack space={3}>
              <Image
                size="sm"
                borderRadius="md"
                source={{
                  uri: item?.setlist?.image,
                }}
                alt="image"
                width="90"
                height="120"
              />
              <Box flex={1}>
                <VStack space={2.5}>
                  <HStack
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text
                      color="gray.100"
                      fontSize={item?.setlist?.name?.length > 17 ? "sm" : "md"}
                      fontWeight="bold"
                    >
                      {item?.setlist?.name}
                    </Text>
                  </HStack>

                  <HStack space={2} alignItems="center">
                    <Calendar size={18} />
                    <Text>{moment(item?.showDate).format("dddd, D MMMM")}</Text>
                  </HStack>
                  <HStack space={2} alignItems="center">
                    <TimesFill size={18} />
                    <Text>{item?.showTime} WIB</Text>
                  </HStack>
                  <HStack space={2} alignItems="center">
                    <History size="18" />
                    <Text>
                      <TimeAgo time={item?.showDate} interval={20000} />
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </HStack>
            <Divider my="4" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </CardGradient>
  );
};
