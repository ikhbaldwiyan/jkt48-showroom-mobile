import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  Center,
  Box,
  Modal,
  HStack,
  FavouriteIcon,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Donate, LogoNormal } from "../../../assets/icon";
import { activityLog } from "../../../utils/activityLog";
import trackAnalytics from "../../../utils/trackAnalytics";
import useUser from "../../../utils/hooks/useUser";
import { useNavigation } from "@react-navigation/native";

const SupportApp = ({ isVisible, onOpen, onClose }) => {
  const { profile } = useUser();
  const navigation = useNavigation();
  const [supportCount, setSupportCount] = useState(0);

  useEffect(() => {
    const checkSupportOpenCount = async () => {
      try {
        // Retrieve the support modal count from AsyncStorage
        const count = await AsyncStorage.getItem("supportOpenCount");
        let currentCount = count ? parseInt(count, 10) : 0;
        currentCount += 1;
        setSupportCount(currentCount);

        // Store the updated count
        await AsyncStorage.setItem("supportOpenCount", currentCount.toString());

        // Show modal at specific counts
        const triggerCounts = [
          16, 34, 55, 89, 144, 233, 300, 377, 610, 987, 1200, 1500, 1800, 2100,
          2400, 2700, 3000,
        ];
        if (triggerCounts.includes(currentCount)) {
          onOpen(); // Show the support modal
        }
      } catch (error) {
        console.log("Error accessing AsyncStorage:", error);
      }
    };

    checkSupportOpenCount();
  }, []);

  const handleSupportProject = () => {
    activityLog({
      logName: "Support",
      description: `User opened support at ${supportCount} opens`,
      userId: "id",
    });
    trackAnalytics("support_project", {
      username: profile?.name,
    });
    navigation.navigate("SupportProject");
    onClose();
  };

  const closeSupportModal = () => {
    trackAnalytics("close_support_modal", {
      username: profile?.name,
    });
    onClose();
  };

  return (
    <Modal size="full" isOpen={isVisible} onClose={onClose} avoidKeyboard>
      <Box bg="secondary" p={5} rounded="xl" shadow={3} width="85%">
        <Text fontWeight="bold" textAlign="center" fontSize="18" mb={4}>
          Support Project JKT48 Showroom Fanmade
        </Text>
        <Center>
          <LogoNormal width={100} height={100} />
        </Center>
        <Text mt="4" textAlign="center" mb={2}>
          Jika kamu menyukai aplikasi ini, bantu kami terus berkembang dengan
          dukunganmu, kalian bisa donasi ke project ini untuk biaya server dan
          pengembangan fitur baru.
        </Text>
        <Button
          mt="2"
          borderRadius="xl"
          onPress={handleSupportProject}
          mb={2}
          colorScheme="cyan"
          py="2.5"
        >
          <HStack space={2} alignItems="center">
            <Donate size={20} />
            <Text fontWeight="bold" fontSize="md">
              Dukung Project
            </Text>
          </HStack>
        </Button>
        <Button variant="ghost" onPress={closeSupportModal} colorScheme="gray">
          <Text>Nanti deh</Text>
        </Button>
      </Box>
    </Modal>
  );
};

export default SupportApp;
