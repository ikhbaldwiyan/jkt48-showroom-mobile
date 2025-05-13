import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import Views from "../../../components/atoms/Views";
import { LiveIcon, MultiLiveIcon } from "../../../assets/icon";
import { cleanImage, formatName } from "../../../utils/helpers";
import { useShowroomLive } from "../../../services/hooks/useShowroomLive";
import { EmptyLive } from "../../../components/organisms";

const ShowroomMulti = ({ handleOpenMultiRoom }) => {
  const { navigate } = useNavigation();
  const { data, isLoading, isSuccess } = useShowroomLive();

  return (
    <View>
      <HStack mb="2" alignItems="center" justifyContent="space-between">
        <Text color="white" fontSize="18" fontWeight="semibold">
          Showroom Live
        </Text>
        {data?.length > 0 && (
          <HStack space={2} justifyContent="center" alignItems="center">
            <LiveIcon size={18} />
            <Text fontSize="sm">{data?.length} Member Live</Text>
          </HStack>
        )}
      </HStack>
      {data?.length > 0 ? (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack mt="2" space={3}>
            {data?.map((item, idx) => (
              <VStack key={idx} space={2} mb={4}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    navigate("LiveStream", { item });
                  }}
                >
                  <Box position="relative" w="130px" h="110px">
                    <Image
                      source={{
                        uri: cleanImage(item?.image_square),
                      }}
                      alt={item?.profile?.room_url_key ?? item?.room_url_key}
                      w="130px"
                      h="110px"
                      borderRadius="md"
                    />
                  </Box>
                  <HStack mt="2" space={2} alignItems="center">
                    <Text fontSize={14} fontWeight="semibold">
                      {formatName(item?.room_url_key, true)}
                    </Text>
                    <Views number={item?.view_num} />
                  </HStack>
                </TouchableOpacity>
              </VStack>
            ))}
          </HStack>
        </ScrollView>
      ) : (
        <Box mb="3">
          <EmptyLive type="sorum" isLoading={isLoading} />
        </Box>
      )}

      {isSuccess && (
        <Button
          mb="3"
          size="sm"
          bg="primary"
          borderRadius="lg"
          onPress={handleOpenMultiRoom}
        >
          <HStack space={3}>
            <MultiLiveIcon />
            <Text fontWeight="bold">Buka Multi Live Showroom</Text>
          </HStack>
        </Button>
      )}
    </View>
  );
};

export default ShowroomMulti;
