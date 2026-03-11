import {
  Box,
  Icon,
  useToast,
  HStack
} from "native-base";
import React, { useState } from "react";
import { TouchableOpacity, TextInput } from "react-native";
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
      <HStack
        w="full"
        bg="secondary"
        borderRadius="full"
        alignItems="center"
        px="4"
        py="1"
        borderColor="white"
        borderWidth={1}
        mb="3"
      >
        <TextInput
          placeholder="Ketik pesan..."
          placeholderTextColor="gray"
          style={{
            flex: 1,
            fontSize: 16,
            color: "white",
            textAlign: "left",
            paddingVertical: 8,
            borderColor: "white",
          }}
          value={message}
          onChangeText={(text) => setMessage(text)}
          selectionColor="#24A2B7"
        />
        <TouchableOpacity onPress={handleSendChat} zIndex={999}>
          <Box ml="2">
            {sendMessage.isLoading ? (
              <Loading size={20} />
            ) : (
              <Icon as={<SendMessageIcon size={5} color="white" />} />
            )}
          </Box>
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};

export default InputMessage;
