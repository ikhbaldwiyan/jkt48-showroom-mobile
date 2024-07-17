import React, { useEffect, useState } from "react";
import Layout from "../../components/templates/Layout";
import Logo from "../../components/atoms/Logo";
import { Box, Divider, HStack, Image, Text, VStack } from "native-base";
import {
  DiscordIcon,
  Donate,
  GithubIcon,
  GooglePlayIcon
} from "../../assets/icon";
import { Linking, TouchableOpacity } from "react-native";
import { activityLog } from "../../utils/activityLog";
import useUser from "../../utils/hooks/useUser";
import trackAnalytics from "../../utils/trackAnalytics";
import { USER } from "../../services";
import CardGradient from "../../components/atoms/CardGradient";

const About = () => {
  const { userProfile } = useUser();
  const [donator, setDonator] = useState();

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

  const getDonator = async () => {
    try {
      const response = await USER.getDonatorList();
      setDonator(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonator();
  }, []);

  return (
    <Layout>
      <Box flex="1" mb="6">
        <Box display="flex" alignItems="center">
          <Logo />
          <Text mt="3" fontSize="2xl" fontWeight="bold">
            About
          </Text>
        </Box>
        <Image
          mt="1"
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
        <Box display="flex" alignItems="center" justifyContent="center">
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
        </Box>
        <Text my="3">
          Aplikasi JKT48 Showroom saat ini masih dalam tahap{" "}
          <Text fontWeight="semibold">Open Beta Test</Text> dan masih terus di
          develop sampai saat ini. Jika kamu ingin mendukung perkembangan
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
        <Divider mt="4" />
        <Text mt="2" fontSize="2xl" fontWeight="bold">
          Social Media
        </Text>
        <HStack mt="4" space={4} overflowX="scroll">
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://x.com/JKT48_SHOWROOM"),
                trackAnalytics("twitter_click", {
                  username: userProfile?.name ?? "Guest"
                });
            }}
          >
            <VStack alignItems="center" space={2} justifyContent="center">
              <Image
                alt="twitter"
                borderRadius="xl"
                width={50}
                size="sm"
                source={{
                  uri: "https://www.shutterstock.com/image-vector/new-design-twitter-logo-600nw-2346506357.jpg"
                }}
              />
              <Text fontWeight="semibold" fontSize="16">
                Follow X
              </Text>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://github.com/jkt48-showroom"),
                trackAnalytics("github_click", {
                  username: userProfile?.name ?? "Guest"
                });
            }}
          >
            <VStack space={2} alignItems="center" justifyContent="center">
              <GithubIcon />
              <Text fontWeight="semibold" fontSize="16">
                GitHub
              </Text>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://discord.com/servers/jkt48-showroom-fanmade-1076511743909564506"
              ),
                trackAnalytics("discord_about_click", {
                  username: userProfile?.name ?? "Guest"
                });
            }}
          >
            <VStack space={2} alignItems="center" justifyContent="center">
              <DiscordIcon />
              <Text fontWeight="semibold" fontSize="16">
                Discord
              </Text>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://play.google.com/store/apps/details?id=com.inzoid.jkt48showroom"
              ),
                trackAnalytics("play_store_click", {
                  username: userProfile?.name ?? "Guest"
                });
            }}
          >
            <VStack space={2} alignItems="center" justifyContent="center">
              <GooglePlayIcon />
              <Text mt="1" fontWeight="semibold" fontSize="16">
                Play Store
              </Text>
            </VStack>
          </TouchableOpacity>
        </HStack>

        <Divider mt="4" mb="2" />
        <Text mb="2" fontSize="2xl" fontWeight="bold">
          Donator
        </Text>
        <Text mb="3">
          Jika kamu sudah mendukung project ini akan mendapatkan role Donator di
          server discord dan foto profile dengan username kalian akan di
          tampilkan di bawah ini, Terima kasih.
        </Text>
        <CardGradient color="light" isRounded>
          <HStack
            space="3"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
          >
            {donator?.map((item, idx) => (
              <VStack key={idx} my="4" alignItems="center" width="20%">
                <Image
                  borderRadius="6"
                  alt={item.user.username}
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri: `https://cdn.discordapp.com/avatars/${item.user.id}/${item.user.avatar}.png`
                  }}
                />
                <Text mt="2" fontSize="sm" fontWeight="semibold" isTruncated>
                  {item.user.global_name ?? item.user.username}
                </Text>
              </VStack>
            ))}
          </HStack>
        </CardGradient>
        <Divider mt="4" mb="2" />
      </Box>
    </Layout>
  );
};

export default About;
