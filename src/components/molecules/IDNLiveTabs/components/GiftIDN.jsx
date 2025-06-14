import { FlashList } from "@shopify/flash-list";
import { Box, Divider, HStack, Image, Text, View } from "native-base";
import { RefreshControl } from "react-native";
import useIDNLiveStore from "../../../../store/idnLiveStore";
import { useRefresh } from "../../../../utils/hooks/useRefresh";
import CardGradient from "../../../atoms/CardGradient";

export const GiftIDN = () => {
  const { refreshing, onRefresh } = useRefresh();
  const { gifts } = useIDNLiveStore();

  return (
    <CardGradient>
      <FlashList
        data={gifts?.length > 0 ? gifts?.slice(0, 45) : []}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={50}
        renderItem={({ item }) => (
          <Box>
            <HStack alignItems="center" space={2}>
              <Image
                borderRadius="lg"
                alt={item?.user?.name}
                style={{ width: 45, height: 45 }}
                source={{
                  uri: item?.user?.avatar_url
                }}
              />
              <HStack alignItems="center" p="2">
                <View flexShrink="1">
                  <Text fontSize="md" fontWeight="bold" color={"primary"}>
                    {item?.user?.name ?? "User"}
                  </Text>
                  <HStack mt="1">
                    <Text fontWeight="medium">{item?.gift?.name}</Text>
                    <Text> - {item?.gift?.gold} Gold</Text>
                  </HStack>
                </View>
              </HStack>
            </HStack>
            <Divider mb="1" />
          </Box>
        )}
        ListEmptyComponent={() => (
          <Box alignItems="center" justifyContent="center">
            <Text fontSize="md" pt="4">
              Tidak ada gift terkirim
            </Text>
          </Box>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </CardGradient>
  );
};
