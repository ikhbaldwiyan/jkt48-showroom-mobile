import React, { useState } from "react";
import { Box, Icon, Input, Text, Toast, useToast } from "native-base";
import { SendMessageIcon } from "../../../assets/icon";
import { useSendMessage } from "../../../services/hooks/usePublicChat";
import { TouchableOpacity } from "react-native";
import useUser from "../../../utils/hooks/useUser";
import Loading from "../../../components/atoms/Loading";
import useApiConfig from "../../../store/useApiConfig";

const InputMessage = ({ setIsLoadingMore }) => {
  const { session } = useUser();
  const toast = useToast();
  const sendMessage = useSendMessage();
  const [message, setMessage] = useState("");
  const { PUBLIC_CHAT_ROOM_ID } = useApiConfig();

  const handleSendChat = () => {
    sendMessage.mutate(
      {
        msg: message,
        csrf_token: session?.csrf_token,
        sr_id: session?.cookie_login_id,
        room_id: PUBLIC_CHAT_ROOM_ID
      },
      {
        onSuccess: () => {
          setMessage("");
          setIsLoadingMore(false);
        },
        onError: (error) => {
          console.log(error);
          toast.show({
            render: () => (
              <Box bg="red" px="2" m="3" py="1" rounded="sm" mb={5}>
                {error?.response?.data?.error === 1 ? (
                  <Text>Gagal mengirim chat, pesan terlalu panjang</Text>
                ): (
                  <Text>Gagal mengirim chat, session habis silakan login ulang</Text>
                )}
              </Box>
            ),
            placement: "bottom"
          });
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
        px="4"
        borderRadius="full"
        placeholder="Ketik pesan..."
        bg="secondary"
        value={message}
        onChangeText={(text) => setMessage(text)}
        InputRightElement={
          <TouchableOpacity onPress={handleSendChat} zIndex={999}>
            <Box mr="4">
              {sendMessage.isPending ? (
                <Loading size={20} />
              ) : (
                <Icon as={<SendMessageIcon size={5} color="white" />} />
              )}
            </Box>
          </TouchableOpacity>
        }
        _focus={{
          borderColor: "primary",
          backgroundColor: "secondary"
        }}
        _input={{
          color: "white",
          selectionColor: "white",
          cursorColor: "white",
          paddingRight: 4
        }}
      />
    </Box>
  );
};

export default InputMessage;
