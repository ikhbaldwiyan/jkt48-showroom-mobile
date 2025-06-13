import { HStack, Switch, Text } from "native-base";
import React from "react";
import { Moon, Sun } from "../../../assets/icon";
import useThemeStore from "../../../store/themeStore";
import useUser from "../../../utils/hooks/useUser";
import trackAnalytics from "../../../utils/trackAnalytics";

const Theme = () => {
  const { userProfile } = useUser();
  const { mode, setDarkMode, setLightMode } = useThemeStore();

  const isDark = mode === "dark";

  const handleChangeTheme = () => {
    isDark ? setLightMode() : setDarkMode();

    trackAnalytics("change_theme", {
      username: userProfile?.name ?? "Guest",
      theme: isDark ? "light" : "dark"
    });
  };

  return (
    <HStack mt="2" justifyContent="space-between" alignItems="center">
      <Text>Live Theme</Text>
      <HStack space={1.5} alignItems="center">
        {isDark ? <Moon /> : <Sun />}
        <Text fontWeight="bold">{isDark ? "Dark" : "Light"}</Text>
        <Switch
          size="lg"
          isChecked={isDark}
          onToggle={handleChangeTheme}
          onTrackColor="teal"
          offTrackColor="coolGray.300"
        />
      </HStack>
    </HStack>
  );
};

export default Theme;
