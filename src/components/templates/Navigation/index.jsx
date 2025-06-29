import React, { useEffect } from "react";
import { theme } from "../../../config/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Box, Text, VStack } from "native-base";
import { StatusBar, TouchableOpacity } from "react-native";
import { tabRoutes, stackRoutes } from "../../../config/routes";
import { useLandscape } from "../../../utils/hooks";
import {
  HomeIcon,
  HomeIconOutline,
  UsersIcon,
  UsersIconOutline,
  TheaterIcon,
  TheaterIconOutline,
  UserIcon,
  ChevronBack,
  HistoryFill,
  HistoryOutline,
  UserIconOutline,
  ThropyIcon,
  ThropyIconOutline,
  LiveIcon
} from "../../../assets/icon";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const isLandscape = useLandscape();

  const navigationIcon = (route, isActive) => {
    const iconConfig = {
      Home: {
        active: <HomeIcon />,
        inactive: <HomeIconOutline />
      },
      Login: {
        active: <UsersIcon />,
        inactive: <UsersIconOutline />
      },
      Theater: {
        active: <TheaterIcon />,
        inactive: <TheaterIconOutline />
      },
      Member: {
        active: <UsersIcon />,
        inactive: <UsersIconOutline />
      },
      Profile: {
        active: <UserIcon color="#24A2B7" size={22} />,
        inactive: <UserIconOutline />
      },
      History: {
        active: <HistoryFill color="#24A2B7" size={22} />,
        inactive: <HistoryOutline />
      },
      Leaderboard: {
        active: <ThropyIcon color="#24A2B7" size={23} />,
        inactive: <ThropyIconOutline size={23} />
      },
      ["Live Stream"]: {
        active: <LiveIcon color="#24A2B7" size={23} />,
        inactive: <LiveIcon size={23} />
      }
    };

    const routeConfig = iconConfig[route.name];
    return routeConfig
      ? isActive
        ? routeConfig.active
        : routeConfig.inactive
      : null;
  };

  const BasicHeader = {
    headerShown: true,
    headerStyle: {
      backgroundColor: "#21252B"
    },
    headerTitleStyle: {
      color: "white",
      fontWeight: "bold"
    },
    tabBarHideOnKeyboard: true
  };

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.black,
            height: isLandscape ? 60 : 70
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.white,
          ...(isLandscape
            ? {
                tabBarLabelStyle: {
                  fontWeight: "600",
                  fontSize: 12
                }
              }
            : {
                tabBarLabel: ({ focused, color }) => (
                  <Text
                    color={color}
                    fontSize="12"
                    marginBottom="15"
                    fontWeight={focused ? "700" : "400"}
                  >
                    {route.name}
                  </Text>
                )
              }
          ),
          tabBarIcon: ({ focused, color }) => (
            <VStack alignItems="center" justifyContent="center" mt={isLandscape ? 0 : 2}>
              {navigationIcon(route, focused)}
            </VStack>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={0.6} />
          )
        })}
      >
        {tabRoutes.map((route) => (
          <Tab.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={
              route?.name === "Home" ? { headerShown: false } : BasicHeader
            }
          />
        ))}
      </Tab.Navigator>
    );
  };

  const showHeader = {
    headerShown: true,
    headerLeft: () => (
      <Box mr="3">
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <ChevronBack />
        </TouchableOpacity>
      </Box>
    ),
    headerTitleStyle: {
      fontSize: 18
    }
  };

  useEffect(() => {
    StatusBar.setBackgroundColor("#21252B");
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: "white",
        headerStyle: { backgroundColor: theme.colors.black }
      }}
    >
      {stackRoutes.map((route) => {
        // Set the TabNavigator component for the Main route
        const component =
          route.name === "Main" ? TabNavigator : route.component;

        // Merge the showHeader options with route options if headerShown is true
        const options = route.options?.headerShown
          ? { ...showHeader, ...route.options }
          : route.options;

        return (
          <Stack.Screen
            key={route.name}
            name={route.name}
            component={component}
            options={options}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default Navigation;
