import React, { useCallback, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Box, Divider, HStack, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { RightArrow } from "../../../assets/icon";
import { useShowroomLive } from "../../../services/hooks/useShowroomLive";
import { useAppStateChange } from "../../../utils/hooks";
import ShowroomLiveCard from "../ShowroomLiveCard";

const ShowroomLive = ({ refreshing }) => {
  const { navigate } = useNavigation();
  const { data: rooms = [], refetch, isLoading } = useShowroomLive();

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
    rooms?.length > 0 && (
      <Box mb="3">
        <HStack mb="1" alignItems="center" justifyContent="space-between">
          <Text color="white" fontSize="2xl" fontWeight="semibold">
            Showroom Live
          </Text>
          {rooms.length > 2 && (
            <TouchableOpacity onPress={() => navigate("ShowroomLive")}>
              <HStack space={2} alignItems="center">
                <Text color="white" fontSize="sm">
                  Semua live
                </Text>
                <RightArrow />
              </HStack>
            </TouchableOpacity>
          )}
        </HStack>
        <ShowroomLiveCard
          rooms={rooms}
          isLiveStream={false}
          isLoading={isLoading}
        />
        <Divider mt="3" />
      </Box>
    )
  );
};

export default ShowroomLive;
