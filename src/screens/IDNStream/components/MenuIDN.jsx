import React from "react";
import { Linking, TouchableOpacity } from "react-native";
import { KebabMenu, PipIcon, WatchIcon } from "../../../assets/icon";
import { Button, HStack, Menu, Pressable, Text } from "native-base";
import { usePipMode } from "../../../utils/hooks";
import useIDNLiveStore from "../../../store/idnLiveStore";

const MenuIDN = () => {
  const { profile } = useIDNLiveStore();
  const { enterPipMode } = usePipMode();

  const customPipMode = () => {
    if (profile?.user?.name === "JKT48") {
      enterPipMode(16, 9);
    } else {
      enterPipMode(4, 5);
    }
  };

  const menu = [
    {
      key: "pip-mode",
      component: (
        <Button px="0" size="xs" onPress={customPipMode}>
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
      key: "idn-live",
      component: (
        <Button
          px="0"
          size="xs"
          onPress={() =>
            Linking.openURL(
              `https://www.idn.app/${profile?.user?.username}/live/${profile?.slug}`
            )
          }
        >
          <HStack space={2}>
            <WatchIcon />
            <Text fontSize="xs" color="secondary">
              Watch In IDN App
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
      mx="3"
      w="160"
      trigger={(triggerProps) => (
        <Pressable {...triggerProps}>
          <KebabMenu color="white" />
        </Pressable>
      )}
    >
      {menu.map((item) => (
        <Menu.Item key={item.key} py="1" px="0">
          <TouchableOpacity activeOpacity={0.8}>
            {item.component}
          </TouchableOpacity>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuIDN;
