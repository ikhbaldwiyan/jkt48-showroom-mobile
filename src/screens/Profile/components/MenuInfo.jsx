import { HStack, Menu, Pressable, Text } from "native-base";
import { useState } from "react";
import { Linking } from "react-native";
import {
  Donate,
  EditProfile,
  GithubIcon,
  History,
  KebabMenu,
} from "../../../assets/icon";
import useChangeLogStore from "../../../store/changeLogStore";
import useAuthStore from "../../../store/authStore";
import useApiConfig from "../../../store/useApiConfig";
import { useNavigation } from "@react-navigation/native";

const MenuInfo = () => {
  const { setOpenModal } = useChangeLogStore();
  const { DONATION_LINK } = useApiConfig();
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const session = useAuthStore((state) => state.session);
  const closeMenu = () => setIsOpen(false);

  const menu = [
    session && {
      key: "edit-profile",
      title: "Edit Profile",
      icon: <EditProfile size={18} color="black" />,
    },
    {
      key: "change-log",
      title: "Change Log",
      icon: <History size={18} color="black" />,
    },
    {
      key: "github",
      title: "Github",
      icon: <GithubIcon size={18} color="black" />,
    },
    {
      key: "donation",
      title: "Support Project",
      icon: <Donate size={18} color="black" />,
    },
  ].filter(Boolean);

  const handleMenu = (key) => {
    switch (key) {
      case "edit-profile":
        navigation.navigate("Edit Profile");
        break;
      case "change-log":
        setOpenModal();
        break;
      case "github":
        Linking.openURL(
          "https://github.com/ikhbaldwiyan/jkt48-showroom-mobile"
        );
        break;
      case "donation":
        Linking.openURL(DONATION_LINK);
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
