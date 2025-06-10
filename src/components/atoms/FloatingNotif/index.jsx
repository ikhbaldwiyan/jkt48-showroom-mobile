import React, { useEffect } from "react";
import { Box, HStack, Image, Text, VStack } from "native-base";
import { LiveIcon } from "../../../assets/icon";
import { useQueryClient } from "@tanstack/react-query";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { formatName } from "../../../utils/helpers";

const FloatingNotif = ({ type, image, name, item }) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  useEffect(() => {
    if (type === "IDN") {
      queryClient.invalidateQueries("idnLives")
    } else {
      queryClient.invalidateQueries("showroomLive")
    }
  }, [type])

  const handlePress = () => {
    if (type === "IDN") {
      navigation.navigate("IDNStream", {
        item: {
          ...item,
          user: JSON.parse(item?.user)
        }
      });
    } else {
      navigation.navigate("LiveStream", {
        item
      });
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Box px="2.5" mt="10" m="3" py="2" mb="5" bg="purple.600" borderRadius="xl">
        <HStack alignItems="center" space="2">
          <Image
            borderRadius="md"
            width={55}
            height={55}
            source={{
              uri: image
            }}
            alt="live"
          />
          <VStack space={0.5}>
            <HStack space="5px" alignItems="center">
              <LiveIcon size={15} />
              <Text fontWeight="semibold" fontSize={13}>
                {type === "Showroom" ? "Showroom" : "IDN LIVE"}
              </Text>
            </HStack>
            <Text fontWeight="medium">{formatName(name, true)} lagi live cuy</Text>
          </VStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
};

export default FloatingNotif;
