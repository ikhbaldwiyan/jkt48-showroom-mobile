import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import { Button, Text, Center, Box, Modal, HStack } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAY_STORE_URL } from "@env";
import { StarIcon, LogoNormal } from "../../../assets/icon";
import { activityLog } from "../../../utils/activityLog";
import trackAnalytics from "../../../utils/trackAnalytics";
import useUser from "../../../utils/hooks/useUser";

const RatingModal = ({ isVisible, onOpen, onClose }) => {
  const [openCount, setOpenCount] = useState(0);
  const { profile } = useUser();

  useEffect(() => {
    const checkAppOpenCount = async () => {
      try {
        const count = await AsyncStorage.getItem("appOpenCount");
        let currentCount = count ? parseInt(count, 10) : 0;
        currentCount += 1;
        setOpenCount(currentCount);

        // Store the updated count
        await AsyncStorage.setItem("appOpenCount", currentCount.toString());

        // Show modal at specific count
        const triggerCounts = [30, 60, 100, 250, 330, 500, 800];
        if (triggerCounts.includes(currentCount)) {
          onOpen(); // Trigger the modal to be shown
        }
      } catch (error) {
        console.log("Error accessing AsyncStorage:", error);
      }
    };

    checkAppOpenCount();
  }, []);

  const handleRateApp = () => {
    activityLog({
      logName: "Rating",
      description: `Rate App at ${openCount} open count`,
      userId: "id"
    });
    trackAnalytics("rate_app", {
      username: profile?.name
    });
    Linking.openURL(PLAY_STORE_URL);
    onClose();
  };

  const closeRatingApp = () => {
    trackAnalytics("close_rate_app", {
      username: profile?.name
    });
    onClose();
  };

  return (
    <Modal size="full" isOpen={isVisible} onClose={onClose} avoidKeyboard>
      <Box bg="secondary" p={5} rounded="xl" shadow={3} width="80%">
        <Text fontWeight="bold" textAlign="center" fontSize="18" mb={4}>
          Enjoy dengan Aplikasi nya?
        </Text>
        <Center>
          <LogoNormal width={100} height={100} />
        </Center>
        <Text mt="4" textAlign="center" mb={2}>
          Jangan lupa kasih review dan rating aplikasi di Play Store, ya!
        </Text>
        <HStack
          mt="2"
          space={3}
          alignItems="center"
          justifyContent="center"
          mb="4"
        >
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </HStack>
        <Button
          mt="2"
          borderRadius="xl"
          onPress={handleRateApp}
          mb={2}
          colorScheme="cyan"
        >
          <Text fontWeight="semibold">Rate Sekarang</Text>
        </Button>
        <Button variant="ghost" onPress={closeRatingApp} colorScheme="gray">
          <Text>Nanti aja deh</Text>
        </Button>
      </Box>
    </Modal>
  );
};

export default RatingModal;
