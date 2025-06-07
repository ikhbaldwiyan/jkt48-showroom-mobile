import React from "react";
import { Box, HStack, Image, Text, VStack } from "native-base";
import { LiveIcon } from "../../../assets/icon";

const FloatingNotif = ({ type, image, name }) => {
  return (
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
          <Text fontWeight="medium">{name} lagi live cuy</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default FloatingNotif;
