import { useFocusEffect } from "@react-navigation/native";
import { Box, Button, Divider, HStack, Text } from "native-base";
import { useCallback, useEffect } from "react";
import IDNLiveCard from "../../../components/atoms/IDNLiveCard";
import { useIDNLive } from "../../../services/hooks/useIDNLive";
import { useAppStateChange } from "../../../utils/hooks";
import { LiveIcon, MultiLiveIcon } from "../../../assets/icon";
import { EmptyLive } from "../../../components/organisms";
import { FlashList } from "@shopify/flash-list";
import useAuthStore from "../../../store/authStore";

const IDNLiveMulti = ({ refreshing, handleOpenMultiRoom }) => {
  const { data: rooms = [], refetch } = useIDNLive();
  const { userProfile: profile } = useAuthStore();

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

      {(profile?.is_donator || profile?.is_developer) && (
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
            <Text fontWeight="bold">Buka Multi IDN Live</Text>
          </HStack>
        </Button>
      )}
      <Divider mt="3" />
    </Box>
  );
};

export default IDNLiveMulti;
