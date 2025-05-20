import { useFocusEffect } from "@react-navigation/native";
import { Box, Button, Divider, HStack, ScrollView, Text } from "native-base";
import { useCallback, useEffect } from "react";
import IDNLiveCard from "../../../components/atoms/IDNLiveCard";
import { useIDNLive } from "../../../services/hooks/useIDNLive";
import { useAppStateChange } from "../../../utils/hooks";
import { LiveIcon, MultiLiveIcon } from "../../../assets/icon";
import { EmptyLive } from "../../../components/organisms";

const IDNLiveMulti = ({ refreshing, handleOpenMultiRoom }) => {
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
    <Box mb="4">
      {rooms.length === 0 && <Divider my="4" />}
      <HStack alignItems="center" justifyContent="space-between">
        <Text color="white" fontSize={"18"} fontWeight="semibold">
          IDN Live
        </Text>

        <HStack space={2} justifyContent="center" alignItems="center">
          <LiveIcon size={18} />
          <Text>{rooms?.length} Member Live</Text>
        </HStack>
      </HStack>
      {rooms.length > 0 ? (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {rooms?.map((item, idx) => (
            <Box key={idx} mt={4} mr="2">
              <IDNLiveCard data={item} isHome />
            </Box>
          ))}
        </ScrollView>
      ) : (
        <Box mb="3">
          <EmptyLive type="idn" />
        </Box>
      )}

      <Button
        size="sm"
        bg="teal"
        mt="3"
        borderRadius="lg"
        onPress={handleOpenMultiRoom}
      >
        <HStack space={3}>
          <MultiLiveIcon />
          <Text fontWeight="bold">Buka Multi IDN Live</Text>
        </HStack>
      </Button>
    </Box>
  );
};

export default IDNLiveMulti;
