import { useFocusEffect } from "@react-navigation/native";
import { useIDNLive } from "../../../services/hooks/useIDNLive";
import { useCallback, useEffect } from "react";
import { useAppStateChange } from "../../../utils/hooks";
import useAuthStore from "../../../store/authStore";
import { hasMultiRoomAccess } from "../../../utils/helpers";

import { Box, Button, Divider, HStack, ScrollView, Text } from "native-base";
import IDNLiveCard from "../../../components/atoms/IDNLiveCard";
import { LiveIcon, MultiLiveIcon } from "../../../assets/icon";
import { EmptyLive } from "../../../components/organisms";
import { FlashList } from "@shopify/flash-list";
import { useProfile } from "../../../services/hooks/useProfile";

const IDNLiveMulti = ({
  refreshing,
  handleOpenMultiRoom,
  isMultiLiveScreen
}) => {
  const { data: rooms = [], refetch, isSuccess } = useIDNLive();
  const { user } = useAuthStore();
  const { data: profile } = useProfile(user?.account_id);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    refetch();
  }, [refreshing]);

  useAppStateChange(refetch);

  const renderItem = ({ item, index }) => {
    const isLastRow = index >= rooms.length - (rooms.length % 2 === 0 ? 2 : 1);

    return (
      <Box
        flex={1}
        mb={isLastRow ? 2 : 4}
        mr={index % 2 === 0 ? "1" : 0}
        ml={index % 2 !== 0 ? "1" : 0}
      >
        <IDNLiveCard data={item} />
      </Box>
    );
  };

  return (
    <Box mb="4">
      <HStack mb="4" alignItems="center" justifyContent="space-between">
        <Text color="white" fontSize={"18"} fontWeight="semibold">
          IDN Live
        </Text>

        <HStack space={2} justifyContent="center" alignItems="center">
          <LiveIcon size={18} />
          <Text>{rooms?.length} Member Live</Text>
        </HStack>
      </HStack>

      {isMultiLiveScreen ? (
        rooms.length > 0 ? (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {rooms?.map((item, idx) => (
              <Box key={idx} mr="2">
                <IDNLiveCard data={item} isHome />
              </Box>
            ))}
          </ScrollView>
        ) : (
          <Box mb="3">
            <EmptyLive type="idn" />
          </Box>
        )
      ) : (
        <FlashList
          numColumns={2}
          data={rooms}
          renderItem={renderItem}
          keyExtractor={(item) => item?.user?.name}
          ListEmptyComponent={
            <Box mb="3">
              <EmptyLive type="idn" />
            </Box>
          }
          estimatedItemSize={100}
        />
      )}

      {isSuccess &&
        (rooms.length > 0 || isMultiLiveScreen) &&
        hasMultiRoomAccess(profile) && (
          <Button
            size="sm"
            bg="teal"
            mt="3"
            mb="2"
            borderRadius="lg"
            onPress={handleOpenMultiRoom}
          >
            <HStack space={3}>
              <MultiLiveIcon />
              <Text fontWeight="bold">Buka Multi Live IDN</Text>
            </HStack>
          </Button>
        )}
      <Divider mt="3" />
    </Box>
  );
};

export default IDNLiveMulti;
