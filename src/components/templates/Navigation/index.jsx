import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { theme } from "../../../config/theme";
import { Home, LiveStream, Login, RoomDetail, SplashScreen } from "../../../screens";

import { useNavigation } from "@react-navigation/native";
import { ArrowBackIcon, PlayIcon } from "native-base";
import HomeIcon from "../../../assets/icon/HomeIcon";
import HomeIconOutline from "../../../assets/icon/HomeIconOutline";
import UsersIcon from "../../../assets/icon/UsersIcon";
import UsersIconOutline from "../../../assets/icon/UsersIconOutline";

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
        }}
      />
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default Navigation;
