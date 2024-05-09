import React, { useState } from "react";
import { Box, Button, HStack, Input, Text } from "native-base";
import { Dashboard, GraduateIcon } from "../../assets/icon";
import RoomRegular from "../../components/organisms/RoomRegular";
import RoomTrainee from "../../components/organisms/RoomTrainee";
import Layout from "../../components/templates/Layout";

const MemberList = () => {
  const [activeTab, setActiveTab] = useState("regular");
  
  return (
    <Layout isHeader>
      <Box flex="1" mb="6">
        <HStack space={1.5} mb="6">
          <Input
            bgColor="white"
            variant="filled"
            w="45%"
            fontSize="sm"
            name="id"
            height="36px"
            placeholderTextColor="secondary"
            placeholder="Search member"
          />
          <Button
            p="2"
            height="36px"
            bg={activeTab === "regular" ? "primary" : "teal"}
            onPress={() => setActiveTab("regular")}
          >
            <HStack space={1} alignItems="center">
              <Dashboard />
              <Text fontWeight="semibold">Regular</Text>
            </HStack>
          </Button>
          <Button
            p="2"
            height="36px"
            bg={activeTab === "trainee" ? "primary" : "teal"}
            onPress={() => setActiveTab("trainee")}
          >
            <HStack space={1} alignItems="center">
              <GraduateIcon size={15} />
              <Text fontWeight="semibold">Trainee</Text>
            </HStack>
          </Button>
        </HStack>
        {activeTab == "regular" ? <RoomRegular /> : <RoomTrainee />}
      </Box>
    </Layout>
  );
};

export default MemberList;
