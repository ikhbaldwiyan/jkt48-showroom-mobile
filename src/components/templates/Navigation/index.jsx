import React, { useEffect } from "react";
import { theme } from "../../../config/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
} from "../../../screens";
import {
  HomeIcon,
  HomeIconOutline,
  UsersIcon,
  UsersIconOutline,
  TheaterIcon,
  TheaterIconOutline,
  UserIcon,
  Info,
  InfoOutline,
  ChevronBack
} from "../../../assets/icon";

import { useNavigation } from "@react-navigation/native";
import { Box } from "native-base";
import { StatusBar, TouchableOpacity } from "react-native";
import MemberList from "../../../screens/MemberList";
import useUser from "../../../utils/hooks/useUser";
import UserIconOutline from "../../../assets/icon/UserIconOutline";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const { session } = useUser();

  const navigationIcon = (route, isActive) => {
    let icon;

    if (route.name === "Home") {
      icon = isActive ? <HomeIcon /> : <HomeIconOutline />;
    } else if (route.name === "Login") {
      icon = isActive ? <UsersIcon /> : <UsersIconOutline />;
    } else if (route.name === "Theater") {
      icon = isActive ? <TheaterIcon /> : <TheaterIconOutline />;
    } else if (route.name === "Member") {
      icon = isActive ? <UsersIcon /> : <UsersIconOutline />;
    } else if (route.name === "Profile") {
      icon = isActive ? (
        <UserIcon color="#24A2B7" size={22} />
      ) : (
        <UserIconOutline />
      );
    } else if (route.name === "About") {
      icon = isActive ? (
        <Info color="#24A2B7" size={22} />
      ) : (
        <InfoOutline />
      );
    }

    return icon;
  };

  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.black, height: 60 },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.white,
        tabBarIconStyle: {
          marginTop: 5
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 10,
          fontWeight: "bold"
        },
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
      <Tab.Screen name="Member" component={MemberList} />
      <Tab.Screen name="Theater" component={ScheduleList} />
      <Tab.Screen name="Profile" component={Login} />
      <Tab.Screen name="About" component={About} />
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
    )
  };

  useEffect(() => {
    StatusBar.setBackgroundColor("#21252B")
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
      <Stack.Screen
        name="RoomLives"
        component={RoomLives}
        options={showHeader}
      />
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
    </Stack.Navigator>
  );
};

export default Navigation;
