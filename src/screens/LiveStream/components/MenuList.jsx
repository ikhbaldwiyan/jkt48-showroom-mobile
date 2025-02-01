import React, { useState } from "react";
import { Linking } from "react-native";
import { HStack, Menu, Pressable, Text } from "native-base";
import {
  KebabMenu,
  PipIcon,
  SettingsIcon,
  WatchIcon,
} from "../../../assets/icon";
import { usePipMode } from "../../../utils/hooks";
import QualitySettings from "../../../components/atoms/QualitySettings";
import useLiveStreamStore from "../../../store/liveStreamStore";

const MenuList = ({ refreshing }) => {
  const { enterPipMode } = usePipMode();
  const { liveInfo } = useLiveStreamStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const closeMenu = () => setIsOpen(false);

  const handleMenu = (key) => {
    switch (key) {
      case "stream-quality":
        setShowModal(true);
        break;
      case "pip-mode":
        enterPipMode(16, 9);
        break;
      case "showroom":
        Linking.openURL(liveInfo?.share_url_live);
        break;
      default:
        break;
    }
    closeMenu();
  };

  const menu = [
    {
      key: "stream-quality",
      component: (
        <HStack space={2}>
          <SettingsIcon />
          <Text fontSize="xs" color="secondary">
            Stream Quality
          </Text>
        </HStack>
      ),
    },
    {
      key: "pip-mode",
      component: (
        <HStack space={2}>
          <PipIcon />
          <Text fontSize="xs" color="secondary">
            Picture in Picture
          </Text>
        </HStack>
      ),
    },
    {
      key: "showroom",
      component: (
        <HStack space={2}>
          <WatchIcon />
          <Text fontSize="xs" color="secondary">
            Watch in Showroom
          </Text>
        </HStack>
      ),
    },
  ];

  return (
    <>
      <Menu
        mt="3"
        mr="3"
        w="170"
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={closeMenu}
        trigger={(triggerProps) => (
          <Pressable {...triggerProps}>
            <KebabMenu color="white" />
          </Pressable>
        )}
      >
        {menu.map((item) => (
          <Menu.Item
            py="1.5"
            px="0"
            key={item.key}
            onPress={() => handleMenu(item.key)}
          >
            {item.component}{" "}
          </Menu.Item>
        ))}
      </Menu>

      <QualitySettings
        refreshing={refreshing}
        showModal={showModal}
        setShowModal={setShowModal}
        closeMenu={closeMenu}
      />
    </>
  );
};

export default MenuList;
