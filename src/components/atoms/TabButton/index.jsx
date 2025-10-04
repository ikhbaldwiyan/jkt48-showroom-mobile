import React from "react";
import { Button, CheckIcon, HStack, Text } from "native-base";

const TabButton = ({ type, currentType, onPress, label }) => (
  <Button
    onPress={() => onPress(type)}
    bg={currentType === type ? "blueLight" : "#4A5568"}
    borderRadius="full"
    variant={currentType === type ? "filled" : "outline"}
    borderColor="primary"
    size="sm"
    py="1.5"
  >
    <HStack alignItems="center" space={1}>
      {currentType === type && <CheckIcon color="primary" />}
      <Text
        fontSize="13"
        color={currentType === type ? "primary" : "white"}
        fontWeight={currentType === type ? "bold" : "medium"}
      >
        {label}
      </Text>
    </HStack>
  </Button>
);

export default TabButton;
