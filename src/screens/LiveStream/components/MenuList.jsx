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

  const menu = [
    {
      key: "stream-quality",
      title: "Stream Quality",
      icon: <SettingsIcon />
    },
    {
      key: "pip-mode",
      title: "Picture in Picture",
      icon: <PipIcon />
    },
    {
      key: "showroom",
      title: "Watch in Showroom",
      icon: <WatchIcon />
    }
  ];

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
            px="0"
            py="2.5"
            key={item.key}
            onPress={() => handleMenu(item.key)}
          >
            <HStack space={2}>
              {item.icon}
              <Text fontSize="xs" color="secondary">
                {item.title}
              </Text>
            </HStack>
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
