import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { theme } from "../../../config/theme";
import { Home, IDNStream, LiveStream, Login, RoomDetail, SplashScreen } from "../../../screens";
import { HomeIcon, HomeIconOutline, UsersIcon, UsersIconOutline } from "../../../assets/icon";

import { useNavigation } from "@react-navigation/native";
import { ArrowBackIcon } from "native-base";
import Views from "../../atoms/Views";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

  const navigationIcon = (route, isActive) => {
    let icon;

    if (route.name === "Home") {
      icon = isActive ? <HomeIcon /> : <HomeIconOutline />
    } else if (route.name === "Login") {
      icon = isActive ? <UsersIcon /> : <UsersIconOutline />
    }

    return icon;
  }

  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.black },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.white,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 3,
          fontWeight: "bold"
        },
        tabBarIcon: ({ focused }) => {
          return navigationIcon(route, focused)
        }
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      headerTintColor: "white",
      headerStyle: { backgroundColor: theme.colors.black },
    }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RoomDetail" component={RoomDetail}
        options={{
          headerShown: true,
          headerLeft: () => (
            <ArrowBackIcon onPress={() => navigation.navigate("Main")} color="white" mr="2" />
          ),
        }}
      />
      <Stack.Screen name="LiveStream" component={LiveStream}
        options={{
          headerShown: true,
          headerLeft: () => (
            <ArrowBackIcon onPress={() => navigation.navigate("Main")} color="white" mr="2" />
          ),
          headerRight: () => (
            <Views number={24780} />
          )
        }}
      />
      <Stack.Screen name="IDNStream" component={IDNStream}
        options={{
          headerShown: true,
          headerLeft: () => (
            <ArrowBackIcon onPress={() => navigation.navigate("Main")} color="white" mr="2" />
          ),
          headerRight: () => (
            <Views number={13000} />
          )
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
