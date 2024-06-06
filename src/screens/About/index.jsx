import React from "react";
import Layout from "../../components/templates/Layout";
import Logo from "../../components/atoms/Logo";
import { Box, HStack, Image, Text } from "native-base";
import { Donate } from "../../assets/icon";
import { Linking, TouchableOpacity } from "react-native";
import { activityLog } from "../../utils/activityLog";
import useUser from "../../utils/hooks/useUser";
import trackAnalytics from "../../utils/trackAnalytics";

const About = () => {
  const { userProfile } = useUser();

  const donateClick = () => {
    Linking.openURL("https://saweria.co/Inzoid");
    activityLog({
      userId: userProfile?._id,
      logName: "Donate",
      description: "Donate APK button click"
    });
    trackAnalytics("donate_link_click", {
      username: userProfile?.user_id ?? "Guest"
    });
  };

  const discordClick = () => {
    Linking.openURL(
      "https://discord.gg/jkt48-showroom-fanmade-1076511743909564506"
    );
    activityLog({
      userId: userProfile?._id,
      logName: "Discord Link",
      description: "Discord Banner Link"
    });
    trackAnalytics("discord_link_click", {
      username: userProfile?.name ?? "Guest"
    });
  };


  return (
    <Layout>
      <Box flex="1" mb="6">
        <Logo />
        <Text mt="4" mb="2" fontSize="2xl" fontWeight="bold">
          About
        </Text>
        <Image
          size="md"
          alt="banner"
          width="100%"
          height="210"
          source={{
            uri: "https://res.cloudinary.com/dkkagbzl4/image/upload/v1717693440/urrttkuzx7mqrlayfgho.png"
          }}
          borderRadius="md"
        />
        <Text mt="2">
          <Text fontWeight="bold">JKT48 SHOWROOM</Text> adalah aplikasi{" "}
          <Text fontWeight="bold">FANMADE</Text> yang bertujuan untuk memfilter
          room member JKT48. disini kalian bisa menonton streaming Showroom atau
          IDN Live semua member JKT48, jangan lupa join komunitas discord kita
          untuk info update apk.
        </Text>
        <TouchableOpacity activeOpacity={0.6} onPress={discordClick}>
          <Image
            mt="3"
            alt="banner"
            width="200"
            height="20"
            source={{
              uri: "https://discordapp.com/api/guilds/1076511743909564506/widget.png?style=banner3"
            }}
            borderRadius="md"
          />
        </TouchableOpacity>
        <Text my="3">
          Aplikasi JKT48 Showroom saat ini masih dalam tahap{" "}
          <Text fontWeight="semibold">Open Beta Test</Text> dan masih terus di
          develop sampai saat ini. Jika kalian ingin mendukung perkembangan
          project ini untuk biaya server dan lainnya kalian bisa donasi di link
          saweria berikut{" "}
        </Text>
        <TouchableOpacity activeOpacity={0.6} onPress={donateClick}>
          <Box bg="#E49C20" p="3" borderRadius="xl">
            <HStack alignItems="center" space={3}>
              <Donate />
              <Text fontSize={16} fontWeight="semibold" color="white">
                Support Project via Saweria
              </Text>
            </HStack>
          </Box>
        </TouchableOpacity>
      </Box>
    </Layout>
  );
};

export default About;
