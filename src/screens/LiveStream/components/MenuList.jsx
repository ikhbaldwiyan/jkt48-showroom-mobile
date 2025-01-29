import React from "react";
import { Button, HStack, Menu, Pressable, Text } from "native-base";
import { KebabMenu, PipIcon } from "../../../assets/icon";
import { usePipMode } from "../../../utils/hooks";
import QualitySettings from "../../../components/atoms/QualitySettings";

const MenuList = ({ refreshing }) => {
  const { enterPipMode } = usePipMode();

  const menu = [
    {
      key: "stream-quality",
      component: <QualitySettings refreshing={refreshing} />
    },
    {
      key: "pip-mode",
      component: (
        <Button px="0" size="xs" onPress={() => enterPipMode(16, 9)}>
          <HStack space={2}>
            <PipIcon />
            <Text color="secondary">Picture in Picture</Text>
          </HStack>
        </Button>
      )
    }
  ];

  return (
    <Menu
      mt="3"
      mr="3"
      w="150"
      trigger={(triggerProps) => (
        <Pressable {...triggerProps}>
          <KebabMenu color="white" />
        </Pressable>
      )}
    >
      {menu.map((item) => (
        <Menu.Item key={item.key} py="1" px="0">
          {item.component}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuList;
