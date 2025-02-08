import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import { APK_VERSION, PLAY_STORE_URL } from "@env";
import { Button, HStack, Modal, Text, VStack } from "native-base";
import DeviceInfo from "react-native-device-info";
import { TouchableOpacity } from "react-native";
import { DownloadIcon, History } from "../../../../assets/icon";
import { getCurrentVersion } from "../../../../services/versions";

const ChangeLog = ({ modal, toggleModal, hideButton = false }) => {
  const [latestVersion, setLatestVersion] = useState("");
  const [isNewVersion, setIsNewVersion] = useState(false);

  const getVersionAndroid = async () => {
    try {
      const response = await getCurrentVersion();
      setLatestVersion(response.data.version);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVersionAndroid();
    const currentVersion = DeviceInfo.getVersion();

    if (latestVersion > currentVersion) {
      setIsNewVersion(true);
    }
  }, [isNewVersion, latestVersion, modal]);

  return (
    <>
      {!hideButton && (
        <TouchableOpacity onPress={toggleModal}>
          <HStack space={1} just alignItems="center">
            <History size={23} />
            <Text ml="1" color="white">
              Check Change Log
            </Text>
          </HStack>
        </TouchableOpacity>
      )}
      <Modal isOpen={modal} size="xl" onClose={toggleModal}>
        <Modal.Content maxH="500">
          <Modal.Header bg="primary">
            <HStack space={2} alignItems="center">
              <History size={24} />
              <Text fontWeight="bold" fontSize="16">
                Change Log APK Version {APK_VERSION}
              </Text>
            </HStack>
          </Modal.Header>
          <Modal.Body bg="secondary">
            <VStack space={3}>
              <Text>- Added IDN Live Chat tab</Text>
              <Text>- Added Top Members Leaderboard</Text>
              <Text>- Revamp Livestream Header with menu bar</Text>
              <Text>- Show Top Live Members Showroom & IDN</Text>
              <Text>- Update Theater Schedule Header Color</Text>
              <Text>- Added JKT48 TV Membership Link on Ticket</Text>
              <Text>- Added Loading Animation in Member List</Text>
            </VStack>
          </Modal.Body>
          <Modal.Footer bg="black">
            <Button.Group space={2}>
              {isNewVersion && (
                <Button
                  variant="outline"
                  backgroundColor="teal"
                  onPress={() => Linking.openURL(PLAY_STORE_URL)}
                >
                  <HStack space={2}>
                    <DownloadIcon />
                    <Text color="white">Versi Terbaru Tersedia</Text>
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
    </>
  );
};

export default ChangeLog;
