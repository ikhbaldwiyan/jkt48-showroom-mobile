import React from "react";
import useAuthStore from "../../../store/authStore";
import { Box, HStack, InfoIcon, Text } from "native-base";
import { Linking } from "react-native";
import { WebIcon } from "../../../assets/icon";

const WrappedAlert = () => {
  const { userProfile, session, profile, user } = useAuthStore();

  const userId = userProfile?._id;
  const token = session?.cookie_login_id;
  const username = profile?.name;
  const avatar = profile?.image;
  const account_id = user?.account_id;

  const currentYear = new Date().getFullYear();
  if (currentYear >= 2025) return null;

  return (
    <Box bg="purple.600" mb="3" p="3" borderRadius="lg">
      <HStack alignItems="center" space={2}>
        <WebIcon size={18} />
        <Text
          onPress={() =>
            Linking.openURL(
              `https://www.jkt48showroom.com/wrapped?userId=${userId}&token=${token}&username=${username}&account_id=${account_id}&avatar=${avatar}`
            )
          }
        >
          JKT48 Showroom Wrapped telah tersedia, cek disini
        </Text>
      </HStack>
    </Box>
  );
};

export default WrappedAlert;
