import { Box } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Moon, Sun } from "../../../assets/icon";
import useThemeStore from "../../../store/themeStore";
import useUser from "../../../utils/hooks/useUser";
import trackAnalytics from "../../../utils/trackAnalytics";

const Theme = () => {
  const { userProfile } = useUser();
  const { mode, setDarkMode, setLightMode } = useThemeStore();

  const handleChangeTheme = () => {
    mode === "light" ? setDarkMode() : setLightMode();

    trackAnalytics("change_theme", {
      username: userProfile?.name ?? "Guest",
      theme:  mode === "light" ? "dark" : "light"
    });
  };

  return (
    <TouchableOpacity onPress={handleChangeTheme}>
      <Box mr="2">{mode === "dark" ? <Moon /> : <Sun />}</Box>
    </TouchableOpacity>
  );
};

export default Theme;
