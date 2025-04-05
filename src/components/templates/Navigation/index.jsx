import React, { useEffect } from "react";
import { theme } from "../../../config/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Box, Text } from "native-base";
import { StatusBar, TouchableOpacity } from "react-native";

import {
  Home,
  IDNStream,
  LiveStream,
  Login,
  Register,
  RoomDetail,
  RoomLives,
  ScheduleDetail,
  SplashScreen,
  ScheduleList,
  PremiumLive,
  About,
  Profile,
  IDNLives,
  EditAvatar,
  HistoryLive,
  MemberList,
  HistoryLiveDetail,
  LeaderboardMember,
  SupportProject,
  LeaderboardUser,
} from "../../../screens";
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
} from "../../../assets/icon";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

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
      }
    };

    const routeConfig = iconConfig[route.name];
    return routeConfig ? (isActive ? routeConfig.active : routeConfig.inactive) : null;
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

  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.black, height: 70 },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.white,
        tabBarIconStyle: {
          marginTop: 8
        },
        tabBarLabel: ({ focused, color }) => (
          <Text
            color={color}
            fontSize="12"
            marginBottom="15"
            fontWeight={focused ? "700" : "400"}
          >
            {route.name}
          </Text>
        ),
        tabBarIcon: ({ focused }) => {
          return navigationIcon(route, focused);
        },
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            activeOpacity={0.6}
            onPress={() => {
              props.onPress();
            }}
          />
        )
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Member" component={MemberList} options={BasicHeader} />
      <Tab.Screen
        name="History"
        component={HistoryLive}
        options={BasicHeader}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardUser}
        options={BasicHeader}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );

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
      fontSize: 18,
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
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Theater" component={ScheduleList} options={showHeader} />
      <Stack.Screen
        name="RoomLives"
        component={RoomLives}
        options={showHeader}
      />
      <Stack.Screen name="IDNLives" component={IDNLives} options={showHeader} />
      <Stack.Screen
        name="RoomDetail"
        component={RoomDetail}
        options={showHeader}
      />
      <Stack.Screen
        name="ScheduleDetail"
        component={ScheduleDetail}
        options={showHeader}
      />
      <Stack.Screen
        name="LiveStream"
        component={LiveStream}
        options={showHeader}
      />
      <Stack.Screen
        name="IDNStream"
        component={IDNStream}
        options={showHeader}
      />
      <Stack.Screen
        name="PremiumLive"
        component={PremiumLive}
        options={showHeader}
      />
      <Stack.Screen name="Avatar" component={EditAvatar} options={showHeader} />
      <Stack.Screen
        name="HistoryDetail"
        component={HistoryLiveDetail}
        options={showHeader}
      />
      <Stack.Screen
        name="LeaderboardMember"
        component={LeaderboardMember}
        options={showHeader}
      />
      <Stack.Screen name="About" component={About} options={showHeader} />
      <Stack.Screen
        name="SupportProject"
        component={SupportProject}
        options={showHeader}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
