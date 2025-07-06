import React from "react";
import { Box, Icon, Input } from "native-base";
import { SendMessageIcon } from "../../../assets/icon";

const InputMessage = () => {
  return (
    <Box
      display="flex"
      justifyItems="end"
      alignItems="flex-end"
      bg="coolGray.700"
      p="4"
    >
      <Input
        py="2"
        borderRadius="full"
        placeholder="Send a message..."
        bg="secondary"
        _input={{
          color: "white"
        }}
        rightElement={
          <Box mr="5">
            <Icon as={<SendMessageIcon />} size={5} />
          </Box>
        }
      />
    </Box>
  );
};

export default InputMessage;
