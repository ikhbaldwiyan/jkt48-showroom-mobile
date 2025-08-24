import React, { useState } from "react";
import { ADMIN_USERS } from "@env";
import { TouchableOpacity } from "react-native";
import { useDeleteMessage } from "../../../services/hooks/usePublicChat";
import { getTimes } from "../../../utils/helpers";
import useUser from "../../../utils/hooks/useUser";

import { Wrench } from "../../../assets/icon";
import { Box, HStack, Image, Text, useToast, VStack } from "native-base";
import {
  ModalConfirmation,
  ImagePreviewModal
} from "../../../components/atoms/Modal";
import SenderChat from "./SenderChat";

const ChatBubble = ({
  avatar,
  username,
  message,
  idx,
  userId,
  date,
  chatId,
  isCanDelete,
  image
}) => {
  const { user, session } = useUser();
  const adminUserIds = ADMIN_USERS?.split(",").map(Number);
  const isAdmin = adminUserIds.includes(userId);
  const isSender = userId == parseInt(user?.user_id);

  const deleteMessage = useDeleteMessage();
  const toast = useToast();

  const [modalConfirm, setModalConfirm] = useState(false);
  const [imagePreviewModal, setImagePreviewModal] = useState(false);

  const handleDeleteChat = () => {
    setModalConfirm(false);

    deleteMessage.mutate(
      {
        chat_id: chatId,
        csrf_token: session?.csrf_token,
        sr_id: session?.cookie_login_id,
        room_id: "532815"
      },
      {
        onSuccess: () => {
          toast.show({
            render: () => (
              <Box m="3" py="1" px="2" mt="10" bg="green.600" rounded="sm">
                <Text>Berhasil delete chat</Text>
              </Box>
            ),
            placement: "top-right"
          });
        },
        onError: () => {
          toast.show({
            render: () => (
              <Box m="3" py="1" px="2" mt="10" mb={5} bg="red.600" rounded="sm">
                <Text>Failed delete chat</Text>
              </Box>
            ),
            placement: "top-right"
          });
        }
      }
    );
  };

  const ModalConfirm = () => (
    <ModalConfirmation
      title="Konfirmasi Hapus"
      modal={modalConfirm}
      onClose={() => {
        setModalConfirm(false);
      }}
      confrimAction={handleDeleteChat}
    >
      <Text color="black">Hapus pesan ini cuy?</Text>
    </ModalConfirmation>
  );

  if (isSender) {
    return (
      <>
        <SenderChat
          avatar={avatar}
          username={username}
          message={message}
          date={date}
          userId={user?.user_id}
          toggleConfirm={() => setModalConfirm(true)}
          isCanDelete={isCanDelete}
          image={image}
        />
        <ModalConfirm />
      </>
    );
  }

  return (
    <Box key={idx}>
      <TouchableOpacity
        activeOpacity={isCanDelete ? 0.6 : 1}
        onLongPress={() => isCanDelete && setModalConfirm(true)}
      >
        <HStack space="1.5" alignItems="flex-start">
          <Image
            borderRadius={isAdmin ? "xl" : "none"}
            style={{ width: 45, height: 45 }}
            source={{
              uri: isAdmin
                ? "https://res.cloudinary.com/dkkagbzl4/image/upload/v1715448389/ioc8l1puv69qn7nzc2e9.png"
                : avatar
            }}
            alt="avatar"
            shadow="5"
          />
          <VStack alignItems="flex-start" space={2}>
            <HStack space={isAdmin ? 2 : 2.5} alignItems="center">
              <Text
                maxW={240}
                color={isAdmin ? "cyan.500" : "white"}
                fontWeight="semibold"
                ml="1"
              >
                {userId === 8262647
                  ? "Admin - Han"
                  : userId === 4751328 || userId === 0
                  ? "Admin - Inzoid"
                  : isAdmin
                  ? "Admin"
                  : username}
              </Text>

              {isAdmin && (
                <Box mt="1">
                  <Wrench size={14} />
                </Box>
              )}
              <Text fontSize="xs" color="coolGray.400">
                {getTimes(date)}
              </Text>
            </HStack>
            <Box
              p="3"
              py="2.5"
              bg="black"
              maxW="270"
              borderRadius="2xl"
              borderTopLeftRadius={4}
            >
              {image ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setImagePreviewModal(true)}
                  onLongPress={() => isCanDelete && setModalConfirm(true)}
                >
                  <Image
                    alt="image"
                    width={400}
                    height={200}
                    source={{ uri: image }}
                    borderRadius="md"
                  />
                </TouchableOpacity>
              ) : (
                <Text fontSize="13">{message}</Text>
              )}
            </Box>
          </VStack>
        </HStack>
      </TouchableOpacity>
      <ModalConfirm />

      {image && (
        <ImagePreviewModal
          isOpen={imagePreviewModal}
          onClose={() => setImagePreviewModal(false)}
          imageUri={image}
          imageAlt={`Image from ${username}`}
        />
      )}
    </Box>
  );
};

export default ChatBubble;
