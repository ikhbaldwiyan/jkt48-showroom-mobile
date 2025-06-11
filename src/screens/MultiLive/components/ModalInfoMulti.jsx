import React, { useEffect } from "react";
import { Button, HStack, Modal, Text, Progress, VStack } from "native-base";
import { Donate, UnlockIcon } from "../../../assets/icon";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../../../services/hooks/useProfile";
import useAuthStore from "../../../store/authStore";

const ModalInfoMulti = ({ isOpen, toggleModal }) => {
  const { navigate } = useNavigation();
  const { user } = useAuthStore();
  const { data: profile, refetch } = useProfile(user?.account_id);

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  return (
    <Modal isOpen={isOpen} size="xl" onClose={toggleModal}>
      <Modal.Content maxH="500">
        <Modal.Header p={3} bg="primary">
          <HStack space={2} alignItems="center">
            <UnlockIcon color="white" size={18} />
            <Text fontWeight="bold" fontSize="16">
              Fitur Multi Live Terkunci
            </Text>
          </HStack>
        </Modal.Header>
        <Modal.Body bg="secondary">
          <VStack space={4}>
            <Text>
              Buka fitur Multi Live jika kamu sudah menonton live streaming
              sebanyak 150x atau dapatkan badge donator dengan cara support project JKT48 Showroom Fanmade
            </Text>
            <Progress
              colorScheme="emerald"
              value={(profile?.totalWatchLive ?? 0) / 150 * 100}
            />
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontWeight="semibold" fontSize="md">
                Total Nonton {profile?.totalWatchLive ?? 0}x dari 150x
              </Text>
              <Text fontWeight="bold" fontSize="lg" color="emerald.500">
                {Math.round((profile?.totalWatchLive ?? 0) / 150 * 100)}%
              </Text>
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer bg="black">
          <Button.Group space={2}>
            <Button
              size="sm"
              backgroundColor="#E49C20"
              onPress={() => navigate("SupportProject")}
            >
              <HStack alignItems="center" space={2}>
                <Donate color="white" size={20} />
                <Text fontWeight="bold" color="white">
                  Support Project
                </Text>
              </HStack>
            </Button>
            <Button
              variant="gray"
              backgroundColor="blueGray.500"
              onPress={toggleModal}
            >
              <Text fontWeight="semibold" color="white">
                Close
              </Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalInfoMulti;
