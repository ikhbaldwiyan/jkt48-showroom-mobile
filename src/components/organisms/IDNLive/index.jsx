import React, { useCallback, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Box, Divider, HStack, Text, ScrollView, Button } from "native-base";
import { TouchableOpacity } from "react-native";
import { LiveIcon, MultiLiveIcon, RightArrow } from "../../../assets/icon";
import { useAppStateChange } from "../../../utils/hooks";
import { useIDNLive } from "../../../services/hooks/useIDNLive";
import IDNLiveCard from "../../atoms/IDNLiveCard";

const IDNLive = ({ refreshing, isMultiLive }) => {
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
      <Box mb="4">
        <HStack alignItems="center" justifyContent="space-between">
          <Text
            color="white"
            fontSize={isMultiLive ? "18" : "2xl"}
            fontWeight="semibold"
          >
            IDN Live
          </Text>
          {rooms.length > 2 && !isMultiLive && (
            <TouchableOpacity onPress={() => navigate("IDNLives")}>
              <HStack space={2} alignItems="center">
                <Text color="white" fontSize="sm">
                  Semua live
                </Text>
                <RightArrow />
              </HStack>
            </TouchableOpacity>
          )}

          {isMultiLive && (
            <HStack space={2} justifyContent="center" alignItems="center">
              <LiveIcon size={18} />
              <Text>{rooms?.length} Member Live</Text>
            </HStack>
          )}
        </HStack>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {rooms?.map((item, idx) => (
            <Box key={idx} mt={4} mr="2">
              <IDNLiveCard data={item} isHome />
            </Box>
          ))}
        </ScrollView>
        {isMultiLive && (
          <Button
            size="sm"
            bg="teal"
            mt="3"
            borderRadius="lg"
            onPress={() => navigate("MultiIDN")}
          >
            <HStack space={3}>
              <MultiLiveIcon />
              <Text fontWeight="bold">Buka Multi IDN Live</Text>
            </HStack>
          </Button>
        )}
        {!isMultiLive && <Divider mt="3" />}
      </Box>
    )
  );
};

export default IDNLive;
