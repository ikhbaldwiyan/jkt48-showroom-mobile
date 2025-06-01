import React from "react";
import { Button, HStack, Modal, Text, Progress, VStack } from "native-base";
import { Donate, Info } from "../../../assets/icon";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../../utils/hooks";

const ModalInfoMulti = ({ isOpen, toggleModal }) => {
  const { navigate } = useNavigation();
  const { userProfile } = useUser();

  return (
    <Modal isOpen={isOpen} size="xl" onClose={toggleModal}>
      <Modal.Content maxH="500">
        <Modal.Header bg="primary">
          <HStack space={2} alignItems="center">
            <Info color="white" size={24} />
            <Text fontWeight="bold" fontSize="16">
              Fitur Multi Room Terkunci
            </Text>
          </HStack>
        </Modal.Header>
        <Modal.Body bg="secondary">
          <VStack space={4}>
            <Text>
              Buka fitur multi room jika kamu sudah menonton live streaming
              sebanyak 100x atau support project kami dengan cara donasi
              berapapun
            </Text>
            <Progress
              colorScheme="emerald"
              value={userProfile?.totalWatchLive}
            />
            <Text fontWeight="semibold" fontSize="lg">
              Total Nonton {userProfile?.totalWatchLive ?? 0}x dari 100x
            </Text>
          </VStack>
        </Modal.Body>
        <Modal.Footer bg="black">
          <Button.Group space={2}>
            <Button
              size="sm"
              backgroundColor="primary"
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
