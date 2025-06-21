import React, { useEffect, useState } from "react";
import {
  Box,
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
import { useLeaderboardMember } from "../../../services/hooks/useLeaderboardMember";
import { formatName } from "../../../utils/helpers";
import { useNavigation } from "@react-navigation/native";
import { ThropyIcon } from "../../../assets/icon";

const TopMember = ({ refreshing, liveType = "showroom" }) => {
  const [type, setType] = useState(liveType);
  const year = moment().format("YYYY");
  const navigation = useNavigation();

  const {
    data: topMember,
    isFetched,
    isLoading,
    isSuccess,
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

  if (error) {
    return null;
  }

  return (
    isSuccess && (
      <View>
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="20" mb="2" fontWeight="semibold">
            Top Member {liveType === "idn" ? "IDN Live" : "Showroom"}
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("LeaderboardMember")}
          >
            <HStack alignItems="center" space={2}>
              <ThropyIcon size={14} />
              <Text>Semua</Text>
            </HStack>
          </TouchableOpacity>
        </HStack>

        {isLoading ? (
          <Box alignItems="center" justifyContent="center" my="8">
            <Spinner size="lg" color="white" />
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
              <Divider />
            </>
          )
        )}
      </View>
    )
  );
};

export default TopMember;
