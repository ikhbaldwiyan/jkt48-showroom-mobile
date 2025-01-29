import React, { useState } from "react";
import { Linking, TouchableOpacity } from "react-native";
import { Button, HStack, Menu, Pressable, Text } from "native-base";
import { KebabMenu, PipIcon, WatchIcon } from "../../../assets/icon";
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
      component: (
        <QualitySettings
          refreshing={refreshing}
          showModal={showModal}
          setShowModal={setShowModal}
          closeMenu={closeMenu}
        />
      )
    },
    {
      key: "pip-mode",
      component: (
        <Button
          px="0"
          size="xs"
          onPress={() => {
            enterPipMode(16, 9);
            closeMenu();
          }}
        >
          <HStack space={2}>
            <PipIcon />
            <Text fontSize="xs" color="secondary">
              Picture in Picture
            </Text>
          </HStack>
        </Button>
      )
    },
    {
      key: "showroom",
      component: (
        <Button
          p="0"
          size="xs"
          onPress={() => {
            Linking.openURL(liveInfo?.share_url_live);
            closeMenu();
          }}
        >
          <HStack space={2}>
            <WatchIcon />
            <Text fontSize="xs" color="secondary">
              Watch in Showroom
            </Text>
          </HStack>
        </Button>
      )
    }
  ];

  return (
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
          onPress={() =>
            item.key === "stream-quality" ? setShowModal(true) : null
          }
          key={item.key}
          py="1.5"
          px="0"
        >
          <TouchableOpacity activeOpacity={0.8}>
            {item.component}
          </TouchableOpacity>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuList;
