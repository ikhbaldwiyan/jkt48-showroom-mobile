import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
  Spinner,
} from "native-base";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { Calendar, LiveIcon } from "../../../assets/icon";
import { useLeaderboardMember } from "../../../services/hooks/useLeaderboardMember";
import { formatName } from "../../../utils/helpers";
import GradientButton from "../../atoms/ButtonGradient";
import { ThropyIcon } from "../../../assets/icon";
import { useNavigation } from "@react-navigation/native";

const TopMember = ({ refreshing }) => {
  const [type, setType] = useState("showroom");
  const year = moment().format("YYYY");
  const navigation = useNavigation();

  const {
    data: topMember,
    isFetched,
    isLoading,
    refetch,
    error
  } = useLeaderboardMember({
    page: "1",
    year,
    type
  });

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);

  const { startDate, endDate } = topMember?.filterDate || {};
  const isSameMonth = startDate?.slice(3, 6) === endDate?.slice(3, 6);

  if (error) {
    return null;
  }

  return (
    <View>
      <HStack alignItems="center" justifyContent="space-between">
        <Text fontSize="2xl" mb="3" fontWeight="semibold">
          Top Member
        </Text>
        <HStack mb="2" space={2}>
          <Button
            py="1"
            px="2.5"
            bg={type === "showroom" ? "teal" : "blueGray.500"}
          >
            <TouchableOpacity onPress={() => setType("showroom")}>
              <Text fontSize="12" fontWeight="semibold">
                Showroom
              </Text>
            </TouchableOpacity>
          </Button>
          <Button py="1" px="3" bg={type === "idn" ? "teal" : "blueGray.500"}>
            <TouchableOpacity onPress={() => setType("idn")}>
              <Text fontSize="12" fontWeight="semibold">
                IDN
              </Text>
            </TouchableOpacity>
          </Button>
        </HStack>
      </HStack>

      {isLoading ? (
        <Box alignItems="center" justifyContent="center" my="8">
          <Spinner size="lg" color="primary" />
        </Box>
      ) : (
        isFetched && (
          <>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <HStack mt="2" space={4}>
                {topMember?.data?.map((item, idx) => (
                  <VStack key={idx} space={2} mb={4}>
                    <TouchableOpacity
                      activeOpacity={type === "showroom" ? 0.5 : 1}
                      onPress={() => {
                        if (type === "showroom") {
                          navigation.navigate("RoomDetail", {
                            room: {
                              room_id: item?.room_id
                            }
                          });
                        }
                      }}
                    >
                      <Box position="relative" w="100px" h="100px">
                        <Image
                          source={{
                            uri: item?.profile?.image_square ?? item?.image
                          }}
                          alt={item?.profile?.room_name ?? item?.username}
                          w="100px"
                          h="100px"
                          borderRadius="md"
                        />
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          bg="cyan.600"
                          px={2}
                          py={1}
                          borderTopLeftRadius="md"
                          borderBottomRightRadius="md"
                        >
                          <Text color="white" fontWeight="bold" fontSize="xs">
                            #{item.rank}
                          </Text>
                        </Box>
                      </Box>
                      <HStack mt="2" space={2} alignItems="center">
                        <Text fontSize={13} fontWeight="semibold">
                          {formatName(item?.username, true)} -
                          <Text fontWeight="normal" fontSize="12">
                            {"  "}
                            {item?.total_live}x Live
                          </Text>
                        </Text>
                      </HStack>
                    </TouchableOpacity>
                  </VStack>
                ))}
              </HStack>
            </ScrollView>

            <HStack space={2}>
              <Button py="1.5" bg="blueGray.600" borderRadius="md">
                <HStack alignItems="center" space={2}>
                  <Calendar size="15" />
                  <Text fontSize="xs" fontWeight="semibold">
                    {isSameMonth ? (
                      <>
                        {startDate?.slice(0, 2)} - {endDate?.slice(0, 2)}{" "}
                        {topMember?.filterDate?.month} {year}
                      </>
                    ) : (
                      <>
                        {startDate?.slice(0, 6)} - {endDate?.slice(0, 6)} {year}
                      </>
                    )}
                  </Text>
                </HStack>
              </Button>
              <GradientButton>
                <HStack alignItems="center" space={2}>
                  <LiveIcon size={15} />
                  <Text fontSize="xs" fontWeight="semibold">
                    Total Member: {topMember?.totalData}
                  </Text>
                </HStack>
              </GradientButton>
            </HStack>
            <TouchableOpacity
              onPress={() => navigation.navigate("LeaderboardMember")}
            >
              <HStack pt="4" alignItems="center" space={2.5}>
                <ThropyIcon size="18" />
                <Text color="gray.200" fontWeight="semibold">
                  Lihat Semua Top Member
                </Text>
              </HStack>
            </TouchableOpacity>
            <Divider my="4" />
          </>
        )
      )}
    </View>
  );
};

export default TopMember;
