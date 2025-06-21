import React, { useEffect } from "react";
import { Button, HStack, Modal, Text, Progress, VStack } from "native-base";
import { Donate, MultiLiveIcon, UnlockIcon } from "../../../assets/icon";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../../../services/hooks/useProfile";
import useAuthStore from "../../../store/authStore";
import useApiConfig from "../../../store/useApiConfig";

const ModalInfoMulti = ({ isOpen, toggleModal }) => {
  const { navigate } = useNavigation();
  const { user } = useAuthStore();
  const { data: profile, refetch } = useProfile(user?.account_id);
  const { IS_MULTI_LIVE_INFO, MINIMUM_WATCH_MULTI_lIVE } = useApiConfig();

  const minimumWatch = MINIMUM_WATCH_MULTI_lIVE;
  const totalWatchUser = profile?.totalWatchLive ?? 0;

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
              sebanyak{" "}
              <Text fontWeight="bold">{MINIMUM_WATCH_MULTI_lIVE}x</Text> atau
              dapatkan badge donator dengan cara support project JKT48 Showroom
              Fanmade
            </Text>
            <Progress
              colorScheme="emerald"
              value={(totalWatchUser / minimumWatch) * 100}
            />
            <HStack justifyContent="space-between" alignItems="center">
              <HStack space="3" alignItems="center">
                <Text fontSize="md">Total Nonton</Text>
                <Text fontWeight="semibold" fontSize="md">
                  {totalWatchUser}x dari {minimumWatch}x
                </Text>
              </HStack>
              <Text fontWeight="bold" fontSize="lg" color="emerald.500">
                {Math.round((totalWatchUser / minimumWatch) * 100)}%
              </Text>
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer bg="black">
          <Button.Group space={2}>
            {IS_MULTI_LIVE_INFO ? (
              <Button
                size="sm"
                backgroundColor="emerald.600"
                onPress={() => navigate("MultiLiveAccess")}
              >
                <HStack alignItems="center" space={2}>
                  <MultiLiveIcon color="white" size={20} />
                  <Text fontWeight="bold" color="white">
                    Buka Fitur
                  </Text>
                </HStack>
              </Button>
            ) : (
              <Button
                size="sm"
                backgroundColor="emerald.600"
                onPress={() => navigate("SupportProject")}
              >
                <HStack alignItems="center" space={2}>
                  <Donate color="white" size={20} />
                  <Text fontWeight="bold" color="white">
                    Support Project
                  </Text>
                </HStack>
              </Button>
            )}

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
