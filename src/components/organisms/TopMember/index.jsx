import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  VStack
} from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Calendar, LiveIcon } from "../../../assets/icon";
import { useLeaderboardMember } from "../../../services/hooks/useLeaderboardMember";
import { formatName } from "../../../utils/helpers";
import GradientButton from "../../atoms/ButtonGradient";

const TopMember = ({ refreshing }) => {
  const [type, setType] = useState("showroom");
  const {
    data: topMember,
    isFetched,
    refetch
  } = useLeaderboardMember({
    page: "1",
    month: "01",
    year: "2025",
    type
  });

  useEffect(() => {
    refetch();
  }, [refreshing]);

  return (
    isFetched && (
      <View>
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="2xl" mb="3" fontWeight="semibold">
            Top Member
          </Text>
          <HStack space={2}>
            <Button
              py="1"
              px="1.5"
              bg={type === "showroom" ? "teal" : "blueGray.500"}
            >
              <TouchableOpacity onPress={() => setType("showroom")}>
                <Text fontSize="sm" fontWeight="semibold">
                  Showroom
                </Text>
              </TouchableOpacity>
            </Button>
            <Button py="1" bg={type === "idn" ? "teal" : "blueGray.500"}>
              <TouchableOpacity onPress={() => setType("idn")}>
                <Text fontSize="sm" fontWeight="semibold">
                  IDN
                </Text>
              </TouchableOpacity>
            </Button>
          </HStack>
        </HStack>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack mt="4" space={4}>
            {topMember?.data?.map((item, idx) => (
              <VStack key={idx} space={2} mb={4}>
                <Box position="relative" w="100px" h="100px">
                  <Image
                    source={{ uri: item?.profile?.image_square ?? item?.image }}
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
                <HStack space={2} alignItems="center">
                  <Text fontSize={14} fontWeight="semibold">
                    {formatName(item?.username, true)} -
                    <Text fontWeight="normal"> {item?.total_live}x Live</Text>
                  </Text>
                </HStack>
              </VStack>
            ))}
          </HStack>
        </ScrollView>

        <HStack space={2}>
          <Button py="1.5" bg="blueGray.600" borderRadius="md">
            <HStack space={2}>
              <Calendar />
              <Text fontSize="sm" fontWeight="semibold">
                {topMember?.filterDate?.startDate?.slice(0, 2)} -{" "}
                {topMember?.filterDate?.endDate?.slice(0, 2)}{" "}
                {topMember?.filterDate?.month}
              </Text>
            </HStack>
          </Button>
          <GradientButton>
            <HStack alignItems="center" space={2}>
              <LiveIcon size={15} />
              <Text fontSize="sm" fontWeight="semibold">
                Total Member: {topMember?.totalData}
              </Text>
            </HStack>
          </GradientButton>
        </HStack>
        <Divider my="4" />
      </View>
    )
  );
};

export default TopMember;
