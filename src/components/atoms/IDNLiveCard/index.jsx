import React from "react";
import { formatName, getIDNLiveTime } from "../../../utils/helpers";

import { TouchableOpacity } from "react-native";
import { Box, HStack, Image, Pressable, Text } from "native-base";
import CardGradient from "../CardGradient";
import Views from "../Views";
import { IDNLiveIcon } from "../../../assets/icon";
import { useNavigation } from "@react-navigation/native";

const IDNLiveCard = ({ data, isHome }) => {
  const { navigate } = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigate("IDNStream", { item: data });
      }}
    >
      <Box
        px="1"
        top="1.5"
        left="2"
        zIndex="99"
        position="absolute"
        bg="rgba(0,0,0,0.3)"
        borderRadius="sm"
        shadow={6}
      >
        <Text fontSize="12" fontWeight="semibold" color="muted.200">
          {getIDNLiveTime(data?.live_at)}
        </Text>
      </Box>

      <Box
        px="1"
        top="1.5"
        py="0.5"
        right="2"
        zIndex="99"
        bg="rgba(0,0,0,0.2)"
        borderRadius="sm"
        position="absolute"
        shadow={4}
      >
        <IDNLiveIcon />
      </Box>
      <Box
        borderRadius={8}
        borderBottomLeftRadius="0"
        borderBottomRightRadius="0"
        overflow="hidden"
        shadow={9}
        bg="coolGray.900"
      >
        <Image
          size="xl"
          shadow={9}
          bg="coolGray.900"
          source={{ uri: data?.image ?? data?.user?.avatar }}
          alt={data?.user?.name}
          height={200}
          width={isHome ? 160 : "100%"}
          resizeMode="cover"
          opacity={0.9}
        />
      </Box>

      <CardGradient color="lightDark">
        <Text fontWeight="medium" fontSize={13} isTruncated>
          {data?.title.length > 19
            ? data?.title?.slice(0, 18) + "..."
            : data?.title}
        </Text>
      </CardGradient>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigate("IDNStream", { item: data });
        }}
      >
        <HStack mt="2" alignItems="center">
          <Text
            fontSize="16"
            mr="2"
            fontWeight="semibold"
            color="white"
            py="1"
            numberOfLines={1}
          >
            {formatName(data?.user?.name, true)}
          </Text>
          <Views number={data?.view_count} />
        </HStack>
      </TouchableOpacity>
    </Pressable>
  );
};

export default IDNLiveCard;
