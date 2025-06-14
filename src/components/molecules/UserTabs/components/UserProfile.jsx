import React from "react";
import { Box, HStack, ScrollView, Text, VStack } from "native-base";
import { EditProfile, IDCard, Star, UserIcon } from "../../../../assets/icon";
import useUser from "../../../../utils/hooks/useUser";
import CardGradient from "../../../atoms/CardGradient";
import { TouchableOpacity } from "react-native";
import { useMostWatchIDN } from "../../../../services/hooks/useMostWatchIDN";
import { formatName } from "../../../../utils/helpers";

export const UserProfile = ({ navigation }) => {
  const { user, profile, userProfile } = useUser();
  const { data: mostWatch } = useMostWatchIDN(userProfile?._id);

  const favorite = Array.isArray(mostWatch?.data)
    ? mostWatch.data.filter((item) => item?.member?.name !== "JKT48")
    : [];
  const favMember = favorite[0]?.member?.name ? favorite[0] : favorite[1];

  return (
    <CardGradient halfCard isRounded>
      <HStack alignItems="center" justifyContent="space-between">
        <Text fontSize="16" fontWeight="semibold">
          Account
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Avatar")}
        >
          <HStack
            bgColor="blueGray.500"
            px="2"
            p="1.5"
            borderRadius="sm"
            space={1}
          >
            <EditProfile color="white" size="18" />
            <Text fontWeight="bold" fontSize={12}>
              Edit{" "}
            </Text>
          </HStack>
        </TouchableOpacity>
      </HStack>
      <ScrollView mt="3">
        <VStack space={3}>
          <HStack space={2} alignItems="center">
            <UserIcon size="16" />
            <Box flex={1}>
              <Text color="gray.300" fontSize="14">
                Name
              </Text>
            </Box>
            <Box flex={2}>
              <Text fontSize="14" fontWeight="semibold">
                {profile?.name}
              </Text>
            </Box>
          </HStack>

          <HStack space={2} alignItems="center">
            <IDCard size="16" />
            <Box flex={1}>
              <Text color="gray.300" fontSize="14">
                ID Showroom
              </Text>
            </Box>
            <Box flex={2}>
              <Text fontSize="14" fontWeight="semibold">
                {user?.account_id}
              </Text>
            </Box>
          </HStack>

          <HStack space={2} alignItems="center">
            <Star size={18} />
            <Box flex={1}>
              <Text color="gray.300" fontSize="14">
                Fav Member
              </Text>
            </Box>
            <Box flex={2}>
              <Text fontSize="14" fontWeight="semibold">
                {formatName(favMember?.member?.name ?? "-", true)}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </ScrollView>
    </CardGradient>
  );
};
