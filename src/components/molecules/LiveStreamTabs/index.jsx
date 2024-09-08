import React, { useMemo, useState } from "react";
import { Box, Pressable, Text, useColorModeValue } from "native-base";
import { Dimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { Comment, Podium, Room, Members, Rank } from "../LiveStream";
import { Songs } from "../LiveStream/Songs";
import useThemeStore from "../../../store/themeStore";

const initialLayout = {
  width: Dimensions.get("window").width
};

const renderPremiumLive = SceneMap({
  member: Members,
  comment: Comment,
  songs: Songs,
  podium: Podium,
});

const renderScene = SceneMap({
  room: Room,
  comment: Comment,
  podium: Podium,
  rank: Rank,
});

const LiveStreamTabs = ({ isPremiumLive }) => {
  const [index, setIndex] = useState(1);
  const { header } = useThemeStore();

  const routes = useMemo(() => {
    if (isPremiumLive) {
      return [
        { key: "member", title: "Member" },
        { key: "comment", title: "Chat" },
        { key: "songs", title: "Songs" },
        { key: "podium", title: "Podium" },
      ];
    } else {
      return [
        { key: "room", title: "Room" },
        { key: "comment", title: "Chat" },
        { key: "podium", title: "Podium" },
        { key: "rank", title: "Rank" },
      ];
    }
  }, [isPremiumLive]);

  const renderTabBar = ({ jumpTo }) => (
    <Box bg={header} borderRadius="md" flexDirection="row">
      {routes.map((route, i) => {
        const color = index === i ? "white" : "#e5e5e5";
        const borderColor = index === i ? "#ECFAFC" : "gray.500";

        return (
          <Box
            p="3"
            flex={1}
            key={i}
            borderBottomWidth="3"
            borderColor={borderColor}
            alignItems="center"
          >
            <Pressable
              key={i}
              onPress={() => {
                setIndex(i);
                jumpTo(route.key);
              }}
              style={({ pressed }) => ({
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: 12,
                borderBottomWidth: 3,
                borderColor: pressed ? "#ECFAFC" : borderColor
              })}
            >
              <Text
                color={useColorModeValue(color, "red")}
                fontWeight={index === i ? "bold" : "normal"}
              >
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
