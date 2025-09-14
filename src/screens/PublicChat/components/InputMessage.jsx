import {
  Box,
  Icon,
  Input,
  useToast
} from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SendMessageIcon } from "../../../assets/icon";
import Loading from "../../../components/atoms/Loading";
import ToastAlert from "../../../components/atoms/ToastAlert";
import { useSendMessage } from "../../../services/hooks/usePublicChat";
import useAuthStore from "../../../store/authStore";
import useApiConfig from "../../../store/useApiConfig";
import useUser from "../../../utils/hooks/useUser";
import { useNavigation } from "@react-navigation/native";


const InputMessage = ({ setIsLoadingMore }) => {
  const toast = useToast();
  const { session } = useUser();
  const { logout } = useAuthStore();
  const { PUBLIC_CHAT_ROOM_ID } = useApiConfig();
  const navigation = useNavigation();

  const sendMessage = useSendMessage();
  const [message, setMessage] = useState("");

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
          setMessage("");
          console.log(error);

          const errorStatus = error?.response?.data?.error;
          const sessionTimeout =
            errorStatus !== 1 && !errorStatus.includes("wajib diisi");

          if (sessionTimeout) {
            toast.show({
              render: () => (
                <ToastAlert
                  variant="left-accent"
                  status="warning"
                  title="Gagal mengirim chat"
                  description="session token sudah habis silakan login ulang"
                />
              ),
              placement: "top",
              duration: 8000
            });
          } else {
            toast.show({
              render: () => (
                <ToastAlert
                  variant="left-accent"
                  status="error"
                  title="Gagal mengirim chat"
                  description={
                    errorStatus === 1
                      ? "Pesan terlalu panjang"
                      : errorStatus.includes("wajib diisi")
                      ? "Pesan tidak boleh kosong"
                      : ""
                  }
                />
              ),
              placement: "top"
            });
          }

          if (sessionTimeout && message.length > 0) {
            logout();
            navigation.navigate("Login");
          }
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
          selectionColor: "primary",
          cursorColor: "white",
          paddingRight: 4
        }}
      />
    </Box>
  );
};

export default InputMessage;
