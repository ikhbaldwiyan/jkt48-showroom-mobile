import React, { useState } from "react";
import { Dimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { Box, Pressable, Text, useColorModeValue } from "native-base";
import useThemeStore from "../../../store/themeStore";
import { UserProfile } from "./UserProfile";
import { Settings } from "../../../components/molecules/UserTabs/components";
import EditAvatar from "../../EditAvatar";

const initialLayout = {
  width: Dimensions.get("window").width
};

const EditProfileTabs = () => {
  const [index, setIndex] = useState(0);
  const routes = [
    { key: "profile", title: "Profile" },
    { key: "avatar", title: "Avatar" }
  ];
  const { header } = useThemeStore();

  const renderScene = SceneMap({
    profile: UserProfile,
    avatar: EditAvatar
  });

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
      style={{ marginTop: 4 }}
    />
  );
};

export default EditProfileTabs;
