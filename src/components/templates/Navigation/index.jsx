import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { theme } from "../../../config/theme";
import { Home, Login, RoomDetail, SplashScreen } from "../../../screens";

import { useNavigation } from "@react-navigation/native";
import { ArrowBackIcon, PlayIcon } from "native-base";
import HomeIcon from "../../../assets/icon/HomeIcon";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.colors.black },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.white
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => <HomeIcon />
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <PlayIcon color={color} />
        }}
      />
    </Tab.Navigator>
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, headerStyle: { backgroundColor: theme.colors.black }, headerTintColor: "white" }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RoomDetail" component={RoomDetail}
        options={{
          headerShown: true,
          headerLeft: () => (
            <ArrowBackIcon onPress={() => navigation.navigate("Main")} color="white" mr="2" />
          ),
          title: "Detail Member",
        }}
      />
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default Navigation;
