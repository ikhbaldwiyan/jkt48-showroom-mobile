import React, { useState } from "react";
import { Box, Pressable, Text, useColorModeValue } from "native-base";
import { Dimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { PodiumIDN } from "./components/PodiumIDN";
import { RoomListIDN } from "./components/RoomListIDN";
import useThemeStore from "../../../store/themeStore";
import ChatIDN from "./components/ChatIDN";
import { GiftIDN } from "./components/GiftIDN";
import { useLandscape } from "../../../utils/hooks";

const initialLayout = {
  width: Dimensions.get("window").width
};

const IDNLiveTabs = () => {
  const [index, setIndex] = useState(1);
  const { header } = useThemeStore();
  const isLandscape = useLandscape();

  const renderScene = SceneMap({
    room: RoomListIDN,
    chat: ChatIDN,
    podium: PodiumIDN,
    gift: GiftIDN,
  });

  const routes = [
    { key: "room", title: "Room" },
    { key: "chat", title: "Chat" },
    { key: "podium", title: "Podium" },
    { key: "gift", title: "Gift" },
  ];

  const renderTabBar = ({ navigationState }) => (
    <Box bg={header} borderRadius="md" flexDirection="row">
      {navigationState.routes.map((route, i) => {
        const color =
          index === i
            ? useColorModeValue("white", "#e5e5e5")
            : useColorModeValue("#e5e5e5", "red");
        const borderColor =
          index === i ? "#ECFAFC" : useColorModeValue("gray.500", "gray.400");

        return (
          <Box
            key={i}
            borderBottomWidth="3"
            borderColor={borderColor}
            flex={1}
            alignItems="center"
            p="3"
            cursor="pointer"
          >
            <Pressable onPress={() => setIndex(i)}>
              <Text color={color} fontWeight={i === index ? "bold" : "normal"}>
                {route.title}
              </Text>
            </Pressable>
          </Box>
        );
      })}
    </Box>
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{ marginTop: isLandscape ? 0 : 2, padding: 6 }}
    />
  );
};

export default IDNLiveTabs;
