import { useCallback, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Box, Divider, HStack, ScrollView, Text } from "native-base";
import { TouchableOpacity } from "react-native";

import { RightArrow } from "../../../assets/icon";
import { useIDNLive } from "../../../services/hooks/useIDNLive";
import { useAppStateChange } from "../../../utils/hooks";
import IDNLiveCard from "../../atoms/IDNLiveCard";

const IDNLive = ({ refreshing }) => {
  const { navigate } = useNavigation();
  const { data: rooms = [], refetch } = useIDNLive();

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
    rooms.length > 0 && (
      <Box mb="2">
        <HStack alignItems="center" justifyContent="space-between">
          <Text color="white" fontSize="2xl" fontWeight="semibold">
            IDN Live
          </Text>
          {rooms.length > 2 && (
            <TouchableOpacity onPress={() => navigate("IDNLives")}>
              <HStack space={2} alignItems="center">
                <Text color="white" fontSize="sm">
                  Semua live
                </Text>
                <RightArrow />
              </HStack>
            </TouchableOpacity>
          )}
        </HStack>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {rooms?.map((item, idx) => (
            <Box key={idx} mt={4} mr="2">
              <IDNLiveCard data={item} isHome />
            </Box>
          ))}
        </ScrollView>
        <Divider mt="4" />
      </Box>
    )
  );
};

export default IDNLive;
