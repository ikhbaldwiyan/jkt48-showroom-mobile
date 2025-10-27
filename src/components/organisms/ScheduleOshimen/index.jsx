import React from "react";
import {
  Box,
  Divider,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { Calendar, TimesIcon } from "../../../assets/icon";
import { useScheduleOshimen } from "../../../services/hooks/useMembers";
import { useUser } from "../../../utils/hooks";
import { useProfile } from "../../../services/hooks/useProfile";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../atoms/Loading";

const ScheduleOshimen = () => {
  const { user } = useUser();
  const { data: userProfile } = useProfile(user?.account_id);
  const { data, isLoading } = useScheduleOshimen(userProfile?.oshimen?._id);
  const navigation = useNavigation();

  return (
    userProfile?.oshimen && (
      <>
        <Box bg="black" p="3" borderRadius="lg">
          <Text fontSize="xl" mb="3" fontWeight="semibold">
            Jadwal Oshimen
          </Text>
          {isLoading && (
            <Box justifyContent="center" py="28" alignItems="center">
              <Loading size={30} />
            </Box>
          )}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack mt="1.5" space={3}>
              {data?.items?.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("ScheduleDetail", { item })
                  }
                >
                  <Box>
                    <VStack space={2}>
                      <Image
                        width={125}
                        height={125}
                        borderRadius="xl"
                        source={{
                          uri: item?.setlist?.image,
                        }}
                        alt={item?.setlist?.name}
                      />
                      <Text fontSize={16} fontWeight="medium">
                        {item?.setlist?.name?.length < 16
                          ? item?.setlist?.name
                          : item?.setlist?.name.slice(0, 14) + ".."}
                      </Text>
                      <HStack alignItems="center" space={2}>
                        <Calendar color="#ADADAD" />
                        <Text color="gray.400" fontSize="14">
                          {moment(item?.showDate).format("ddd, DD MMM")}
                        </Text>
                      </HStack>
                      <HStack alignItems="center" space={2}>
                        <TimesIcon size="16" color="#ADADAD" />
                        <Text color="gray.400" fontSize="14">
                          {item?.showTime}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                </TouchableOpacity>
              ))}
            </HStack>
          </ScrollView>
        </Box>
        <Divider my="3" />
      </>
    )
  );
};

export default ScheduleOshimen;
