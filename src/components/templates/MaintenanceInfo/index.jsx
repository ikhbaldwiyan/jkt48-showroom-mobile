import React, { useEffect, useState } from "react";
import { Button, Text, Center, Box, Modal, WarningIcon } from "native-base";
import firestore from "@react-native-firebase/firestore";

const MaintenanceInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [maintenanceData, setMaintenanceData] = useState({});

  useEffect(() => {
    const fetchMaintenanceStatus = async () => {
      try {
        const doc = await firestore()
          .collection("app_config")
          .doc("maintenance")
          .get();
        if (doc.exists) {
          setMaintenanceData(doc.data());
        }
      } catch (error) {
        console.error("Error fetching maintenance data:", error);
      }
    };

    fetchMaintenanceStatus();
  }, []);

  useEffect(() => {
    if (maintenanceData?.is_active) {
      setIsOpen(true);
    }
  }, [maintenanceData]);

  return (
    <Modal size="full" isOpen={isOpen} avoidKeyboard>
      <Box
        bg="secondary"
        py="8"
        p={5}
        rounded="xl"
        shadow={3}
        width="80%"
        justifyContent="center"
      >
        <Center mb={4}>
          <WarningIcon size="20" />
        </Center>
        <Text fontWeight="bold" textAlign="center" fontSize="18" mb={3}>
          {maintenanceData?.title || "Pemeliharaan Sedang Berlangsung"}
        </Text>
        <Text textAlign="center" mb={4}>
          {maintenanceData?.description ||
            "Kami sedang melakukan pemeliharaan. Silakan coba lagi nanti."}
        </Text>
        <Button
          mt="2"
          borderRadius="xl"
          onPress={() => setIsOpen(false)}
          colorScheme="cyan"
        >
          <Text fontWeight="semibold">Close</Text>
        </Button>
      </Box>
    </Modal>
  );
};

export default MaintenanceInfo;
