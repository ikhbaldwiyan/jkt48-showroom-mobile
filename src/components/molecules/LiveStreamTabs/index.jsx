import React, { useState } from "react";
import { Box, Pressable, Text, useColorModeValue } from "native-base";
import { Dimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { Comment, Podium, Room, Members } from "../LiveStream";
import { Songs } from "../LiveStream/Songs";

const initialLayout = {
  width: Dimensions.get("window").width
};

const renderPremiumLive = SceneMap({
  member: Members,
  comment: Comment,
  songs: Songs
});

const LiveStreamTabs = ({ isPremiumLive }) => {
  const [index, setIndex] = useState(1);

  const renderScene = SceneMap({
    room: Room,
    comment: Comment,
    podium: Podium
  });

  const routes = [];

  if (isPremiumLive) {
    routes.push({ key: "member", title: "Member" });
    routes.push({ key: "comment", title: "Comment" });
    routes.push({ key: "songs", title: "Songs" });
  } else {
    routes.push({ key: "room", title: "Room Live" });
    routes.push({ key: "comment", title: "Comment" });
    routes.push({ key: "podium", title: "Podium" });
  }

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
      renderScene={isPremiumLive ? renderPremiumLive : renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

export default LiveStreamTabs;
