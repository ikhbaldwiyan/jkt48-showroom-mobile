import React, { useState } from "react";
import { Box, Icon, Input } from "native-base";
import { SendMessageIcon } from "../../../assets/icon";
import { useSendMessage } from "../../../services/hooks/usePublicChat";
import { TouchableOpacity } from "react-native";
import useUser from "../../../utils/hooks/useUser";
import Loading from "../../../components/atoms/Loading";

const InputMessage = () => {
  const { session } = useUser();
  const sendMessage = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSendChat = () => {
    sendMessage.mutate(
      {
        msg: message,
        csrf_token: session?.csrf_token,
        sr_id: session?.cookie_login_id,
        room_id: "532815"
      },
      {
        onSuccess: () => {
          setMessage("");
        }
      }
    );
  };

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
        value={message}
        onChangeText={(text) => setMessage(text)}
        rightElement={
          <TouchableOpacity onPress={handleSendChat} zIndex={999}>
            <Box mr="5">
              {sendMessage.isPending ? (
                <Loading size={20} />
              ) : (
                <Icon as={<SendMessageIcon />} size={5} />
              )}
            </Box>
          </TouchableOpacity>
        }
      />
    </Box>
  );
};

export default InputMessage;
