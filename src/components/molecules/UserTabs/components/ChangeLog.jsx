import React, { useEffect, useState } from "react";
import { Button, HStack, Modal, Text, VStack } from "native-base";
import { DownloadIcon, History } from "../../../../assets/icon";
import { getCurrentVersion } from "../../../../services/versions";
import DeviceInfo from "react-native-device-info";

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
        <Text mt="2" onPress={toggleModal}>
          <HStack space={1} just alignItems="center">
            <History size={24} />
            <Text ml="1" fontWeight="bold" color="white">
              Check Change Log
            </Text>
          </HStack>
        </Text>
      )}
      <Modal isOpen={modal} size="xl" onClose={toggleModal}>
        <Modal.Content maxH="500">
          <Modal.Header bg="primary">
            <HStack space={2} alignItems="center">
              <History size={24} />
              <Text fontWeight="bold" fontSize="lg">
                Change Log APK Version 1.2.1
              </Text>
            </HStack>
          </Modal.Header>
          <Modal.Body bg="black">
            <VStack space={3}>
              <Text>- Add Profile tab menu</Text>
              <Text>- Add About Project tab menu</Text>
              <Text>- Add Switch Dark Mode background theme</Text>
              <Text>- Implement Full screen Showroom & IDN Live</Text>
              <Text>- Revamp UI header Showroom live</Text>
              <Text>- Change status bar color to dark theme</Text>
              <Text>- Add Settings Tab in Profile</Text>
              <Text>- Update some wording title to indonesia</Text>
              <Text>- Show Remove Account button on settings</Text>
              <Text>- Change APK name to JKT48 Showroom Fanmade</Text>
            </VStack>
          </Modal.Body>
          <Modal.Footer bg="primary">
            <Button.Group space={2}>
              {isNewVersion && (
                <Button
                  variant="gray"
                  backgroundColor="teal"
                  onPress={toggleModal}
                >
                  <HStack space={2}>
                    <DownloadIcon />
                    <Text color="white">Versi Terbaru Tersedia</Text>
                  </HStack>
                </Button>
              )}
              <Button
                variant="gray"
                backgroundColor="disabled"
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
