import React from "react";
import { HStack, Text } from "native-base";
import { UserIcon } from "../../../assets/icon";
import { formatViews } from "../../../utils/helpers";

const Views = ({ number, color = "red" }) => {
  return (
    <HStack
      px="2"
      bg={color}
      h={27}
      justifyContent="center"
      alignItems="center"
      borderRadius={8}
    >
      <UserIcon />
      <Text ml="1" fontSize="14" fontWeight="semibold">
        {formatViews(number)}
      </Text>
    </HStack>
  );
};

export default Views;
