import React, { useState } from "react";
import { Linking } from "react-native";
import { DeleteIcon, HStack, Menu, Pressable, Text } from "native-base";
import { Donate, GithubIcon, History, KebabMenu } from "../../../assets/icon";
import useChangeLogStore from "../../../store/changeLogStore";

const MenuInfo = () => {
  const { setOpenModal } = useChangeLogStore();

  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const menu = [
    {
      key: "change-log",
      title: "Change Log",
      icon: <History size={18} color="black" />
    },
    {
      key: "github",
      title: "Github",
      icon: <GithubIcon size={18} color="black" />
    },
    {
      key: "donation",
      title: "Support App",
      icon: <Donate size={18} color="black" />
    },
    {
      key: "delete",
      title: "Delete Account",
      icon: <DeleteIcon size={18} color="black" />
    }
  ];

  const handleMenu = (key) => {
    switch (key) {
      case "change-log":
        setOpenModal();
        break;
      case "github":
        Linking.openURL(
          "https://github.com/ikhbaldwiyan/jkt48-showroom-mobile"
        );
        break;
      case "donation":
        Linking.openURL("https://saweria.co/JKT48Showroom48");
        break;
      case "delete":
        Linking.openURL("https://www.jkt48showroom.com/remove-account");
        break;
      default:
        break;
    }
    closeMenu();
  };

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

export default MenuInfo;
