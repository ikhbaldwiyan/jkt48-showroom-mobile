import React, { useEffect, useState } from "react";
import { Button, HStack, Modal, Text, VStack } from "native-base";
import { DownloadIcon, History } from "../../../../assets/icon";
import { getCurrentVersion } from "../../../../services/versions";
import DeviceInfo from "react-native-device-info";
import { APK_VERSION } from "@env";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native";

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
            <History size={24} />
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
              <Text>- Add History Live List and Detail screen</Text>
              <Text>- Add Edit Avatar screen on profile</Text>
              <Text>- Add Quality Live streaming showroom setting</Text>
              <Text>- Optimize and revamp thetater schedule</Text>
              <Text>- Improve real time fetch live list SR or IDN</Text>
              <Text>- Change light mode cyan color</Text>
              <Text>- Fix register user podium not showing</Text>
              <Text>- Fix Premium Live watching redirect no ticket</Text>
              <Text>- Revamp profile member detail</Text>
            </VStack>
          </Modal.Body>
          <Modal.Footer bg="black">
            <Button.Group space={2}>
              {isNewVersion && (
                <Button
                  variant="outline"
                  backgroundColor="teal"
                  onPress={() =>
                    Linking.openURL(
                      "https://play.google.com/store/apps/details?id=com.inzoid.jkt48showroom"
                    )
                  }
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
