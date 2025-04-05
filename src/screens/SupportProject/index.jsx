import React, { useEffect, useLayoutEffect, useState } from "react";
import { Linking, TouchableOpacity } from "react-native";

import Layout from "../../components/templates/Layout";
import CardGradient from "../../components/atoms/CardGradient";
import { Box, Divider, HStack, Image, Text, VStack } from "native-base";

import { USER } from "../../services";
import { Donate } from "../../assets/icon";
import useUser from "../../utils/hooks/useUser";
import { activityLog } from "../../utils/activityLog";
import trackAnalytics from "../../utils/trackAnalytics";
import useApiConfig from "../../store/useApiConfig";

const SupportProject = ({ navigation }) => {
  const { userProfile } = useUser();
  const [donator, setDonator] = useState();
  const { DONATION_IMG } = useApiConfig();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Support Project JKT48 Showroom",
      headerTitleStyle: {
        fontSize: 16
      }
    });
  }, []);

  const donateClick = () => {
    Linking.openURL("https://saweria.co/JKT48Showroom48");
    activityLog({
      userId: userProfile?._id,
      logName: "Donate",
      description: "Donate Support Project"
    });
    trackAnalytics("support_project_link_click", {
      username: userProfile?.user_id ?? "Guest"
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
        <Text mt="1">
          Halo guys terima kasih telah menggunakan aplikasi JKT48 Showroom
          Fanmade dan mendukung project hingga saat ini. Berkat dukungan kalian,
          aplikasi ini sudah di download oleh lebih dari 50.000 users! 🥳
        </Text>

        <Text my="3">
          Aplikasi ini gratis dan bebas iklan. Selama ini, biaya server dan
          pemeliharaan aplikasi ditanggung dari dana pribadi tim dan juga donasi
          kalian. Namun, seiring bertambahnya pengguna, biaya server semakin
          meningkat. Kami membutuhkan bantuan kalian untuk menjaga aplikasi ini
          tetap online dan lancar.
        </Text>

        <Text my="2">
          Jika kalian ingin mendukung perkembangan project untuk biaya server,
          domain dan service lainnya, kalian bisa memberikan donasi melalui link
          Saweria di bawah ini. Setiap donasi, sekecil apa pun, akan sangat
          berarti bagi kami. 🙏
        </Text>
        <TouchableOpacity activeOpacity={0.6} onPress={donateClick}>
          <Box mt="2" bg="#E49C20" p="3" py="2.5" borderRadius="xl">
            <HStack justifyContent="center" alignItems="center" space={3}>
              <Donate />
              <Text fontSize={16} fontWeight="semibold" color="white">
                Support Project via Saweria
              </Text>
            </HStack>
          </Box>
        </TouchableOpacity>
        <Divider mt="4" mb="2" />

        <Text mb="2" fontSize="2xl" fontWeight="semibold">
          Donator
        </Text>
        <VStack space={3}>
          <Text>Dengan mendukung project ini, kalian akan mendapatkan:</Text>
          <Image
            width="100%"
            height="280"
            borderRadius="md"
            alt="Donation Image"
            source={{
              uri: "https://res.cloudinary.com/dkkagbzl4/image/upload/v1743871040/zg6mjjisj1vkkxeipvng.jpg"
            }}
          />

          <VStack space={2} pl="3">
            <Text>
              - <Text fontWeight="bold">Special Badge Donator</Text> akan
              ditampilkan di profile dan detail akun showroom kamu.
            </Text>
            <Text>
              - <Text fontWeight="bold">Role Donator eksklusif</Text> di server
              Discord kami.
            </Text>
            <Text>
              -{" "}
              <Text fontWeight="bold">
                Foto profil dan username discord kalian
              </Text>{" "}
              akan ditampilkan di halaman support project ini.
            </Text>
          </VStack>
          <Text>Terima kasih banyak atas dukungannya guys!</Text>
        </VStack>
        <Divider my="3" />
        <Text fontWeight="semibold" fontSize="xl">
          Top Donation Saweria
        </Text>
        <Image
          my="3"
          width="100%"
          height="81"
          borderRadius="md"
          alt="Donation Image"
          source={{ uri: DONATION_IMG }}
        />
        <Text mb="3" fontWeight="semibold" fontSize="xl">
          Donator Discord Role
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

export default SupportProject;
