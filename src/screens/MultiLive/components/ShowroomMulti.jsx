import React, { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useShowroomLive } from "../../../services/hooks/useShowroomLive";
import useAuthStore from "../../../store/authStore";
import { hasMultiRoomAccess } from "../../../utils/helpers";
import { useAppStateChange } from "../../../utils/hooks";

import { Box, Button, HStack, Text, View } from "native-base";
import { LiveIcon, MultiLiveIcon } from "../../../assets/icon";
import { ShowroomLiveCard } from "../../../components/organisms";
import { useProfile } from "../../../services/hooks/useProfile";

const ShowroomMulti = ({
  refreshing,
  handleOpenMultiRoom,
  isMultiLiveScreen
}) => {
  const { user } = useAuthStore();
  const { data: profile } = useProfile(user?.user_id);
  const { data, isLoading, isSuccess, refetch } = useShowroomLive();

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
    <View>
      <HStack mb="3" alignItems="center" justifyContent="space-between">
        <Text color="white" fontSize="18" fontWeight="semibold">
          Showroom Live
        </Text>
        <HStack space={2} justifyContent="center" alignItems="center">
          <LiveIcon size={18} />
          <Text fontSize="sm">{data?.length} Member Live</Text>
        </HStack>
      </HStack>
      <ShowroomLiveCard
        rooms={data}
        isLiveStream={!isMultiLiveScreen}
        isLoading={isLoading}
      />

      {isSuccess &&
      (data.length > 0 || isMultiLiveScreen) &&
      hasMultiRoomAccess(profile) ? (
        <Button
          mt="2"
          mb="8"
          size="sm"
          bg="teal"
          borderRadius="lg"
          onPress={handleOpenMultiRoom}
        >
          <HStack space={3}>
            <MultiLiveIcon />
            <Text fontWeight="bold">Buka Multi Live Showroom</Text>
          </HStack>
        </Button>
      ) : (
        <Box mb="8"></Box>
      )}
    </View>
  );
};

export default ShowroomMulti;
