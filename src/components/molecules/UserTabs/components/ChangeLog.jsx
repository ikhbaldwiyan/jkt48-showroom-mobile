import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import { APK_VERSION, PLAY_STORE_URL } from "@env";
import { Button, HStack, Modal, Text, VStack } from "native-base";
import DeviceInfo from "react-native-device-info";
import { TouchableOpacity } from "react-native";
import { DownloadIcon, History } from "../../../../assets/icon";
import { getCurrentVersion } from "../../../../services/versions";
import useApiConfig from "../../../../store/useApiConfig";

const ChangeLog = ({ modal, toggleModal, hideButton = false }) => {
  const [latestVersion, setLatestVersion] = useState("");
  const [isNewVersion, setIsNewVersion] = useState(false);
  const { MINIMUM_WATCH_MULTI_lIVE } = useApiConfig();

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
        <Modal.Content borderWidth={1} borderColor="white" maxH="550">
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
              <Text>- New homepage menu list</Text>
              <Text>- Add Live Stream Bottom Menu</Text>
              <Text>- Bug fixing sr live and internet status</Text>
              <Text>- Show button toogle for hide comment box showroom</Text>
              <Text>- Added Multi Live for early acces and donator</Text>
              <Text>- Revamp layout for Showroom and IDN Live</Text>
              <Text>- Added edit profile screen (Name, Avatar, Bio)</Text>
              <Text>- Show IDN Live Gift list Tab</Text>
              <Text>- Show avatar image on live chat IDN</Text>
              <Text>- Revamp edit avatar showroom</Text>
              <Text>- Show All Total Watched SR and IDN on profile</Text>
              <Text>- Show active today theater schedule with countdown time</Text>
              <Text>- Added Multi Live Showroom and IDN Live</Text>
              <Text>
                - Early access Multi Live feature for user reach Total Watch{" "}
                {MINIMUM_WATCH_MULTI_lIVE}x
              </Text>
              <Text>
                - Fixing banner internet connection offline landscape and PIP mode
              </Text>
              <Text>- Change open Multi Live button styling</Text>
              <Text>- Adjust responsive live streaming SR and Showroom</Text>
              <Text>- Improve Landscape live stream for tablet mode</Text>
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
