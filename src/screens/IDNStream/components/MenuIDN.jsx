import React from "react";
import { Linking } from "react-native";
import { KebabMenu, PipIcon, UsersIconFill, WatchIcon } from "../../../assets/icon";
import { HStack, Menu, Pressable, Text } from "native-base";
import { usePipMode } from "../../../utils/hooks";
import useIDNLiveStore from "../../../store/idnLiveStore";
import { useNavigation } from "@react-navigation/native";

const MenuIDN = () => {
  const { profile } = useIDNLiveStore();
  const { enterPipMode } = usePipMode();
  const navigation = useNavigation();

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
      title: "Picture in Picture",
      icon: <PipIcon />
    },
    {
      key: "idn-live",
      title: "Watch In IDN App",
      icon: <WatchIcon />
    },
    {
      key: "multi-live",
      title: "Open Multi Live IDN",
      icon: <UsersIconFill color="#21252B" />
    }
  ];

  const handleMenu = (key) => {
    switch (key) {
      case "pip-mode":
        customPipMode();
        break;
      case "idn-live":
        Linking.openURL(
          `https://www.idn.app/${profile?.user?.username}/live/${profile?.slug}`
        );
        break;
      case "multi-live":
        navigation.replace("MultiIDN");
        break;
      default:
        break;
    }
  };

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
  );
};

export default MenuIDN;
