import React, { useState } from "react";
import { Box, Pressable, Text, useColorModeValue } from "native-base";
import { Dimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { PodiumIDN } from "./components/PodiumIDN";
import { RoomListIDN } from "./components/RoomListIDN";

const initialLayout = {
  width: Dimensions.get("window").width
};

const IDNLiveTabs = ({ profile, setProfile }) => {
  const [index, setIndex] = useState(1);

  const renderScene = SceneMap({
    room: () => <RoomListIDN profile={profile} setProfile={setProfile} />,
    podium: PodiumIDN
  });

  const routes = [
    { key: "room", title: "Room Live" },
    { key: "podium", title: "Podium" }
  ];

  const renderTabBar = ({ navigationState }) => (
    <Box bg="primary" borderRadius="md" flexDirection="row">
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
      style={{ marginTop: 2, padding: 6 }}
    />
  );
};

export default IDNLiveTabs;
