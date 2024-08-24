import React, { useEffect, useState } from "react";
import Layout from "../../components/templates/Layout";
import Logo from "../../components/atoms/Logo";
import { Box, Divider, HStack, Image, Text, VStack } from "native-base";
import { DiscordIcon, Donate, GithubIcon, WebIcon } from "../../assets/icon";
import { Dimensions, Linking, TouchableOpacity } from "react-native";
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

  const socialMedia = [
    {
      url: "https://x.com/JKT48_SHOWROOM",
      icon: (
        <Image
          alt="twitter"
          borderRadius="xl"
          width={50}
          size="sm"
          source={{
            uri: "https://www.shutterstock.com/image-vector/new-design-twitter-logo-600nw-2346506357.jpg"
          }}
        />
      ),
      text: "Follow X",
      analyticsEvent: "twitter_click"
    },
    {
      url: "https://github.com/jkt48-showroom",
      icon: <GithubIcon />,
      text: "GitHub",
      analyticsEvent: "github_click"
    },
    {
      url: "https://www.jkt48showroom.com",
      icon: <WebIcon />,
      text: "Website",
      analyticsEvent: "website_click"
    },
    {
      url: "https://discord.com/servers/jkt48-showroom-fanmade-1076511743909564506",
      icon: <DiscordIcon />,
      text: "Discord",
      analyticsEvent: "discord_about_click"
    }
  ];

  return (
    <Layout>
      <Box flex="1" mb="6">
        <Box display="flex" alignItems="center">
          <Logo />
        </Box>
        <Image
          mt="4"
          mb="2"
          size="md"
          alt="banner"
          width="100%"
          height={Dimensions.get("window").width * 0.6}
          source={{
            uri: "https://res.cloudinary.com/dkkagbzl4/image/upload/v1721372451/enzbvfxozrq4xn7uiaeo.png"
          }}
          borderRadius="md"
        />
        <Text mt="2">
          <Text fontWeight="bold">JKT48 Showroom Fanmade</Text> adalah platform
          Live Streaming yang bertujuan untuk memfilter room member JKT48.
          disini kalian bisa menonton streaming Showroom atau IDN Live semua
          member JKT48, jangan lupa join komunitas discord kita untuk info
          update apk.
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
          <Text fontWeight="semibold">Open Beta Test</Text> di Play Store dan
          masih terus di develop sampai saat ini. Jika kamu ingin mendukung
          perkembangan project ini untuk biaya server dan lainnya kalian bisa
          donasi di link saweria berikut{" "}
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
        <HStack
          mt="4"
          space={3}
          overflowX="scroll"
          justifyContent="space-between"
          w="100%"
        >
          {socialMedia.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={{ flex: 1 }}
              onPress={() => {
                Linking.openURL(link.url);
                trackAnalytics(link.analyticsEvent, {
                  username: userProfile?.name ?? "Guest"
                });
              }}
            >
              <VStack space={2} alignItems="center" justifyContent="center">
                {link.icon}
                <Text fontWeight="semibold" fontSize="16">
                  {link.text}
                </Text>
              </VStack>
            </TouchableOpacity>
          ))}
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
