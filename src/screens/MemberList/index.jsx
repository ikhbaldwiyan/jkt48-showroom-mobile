import React, { useState } from "react";
import { Box, Button, HStack, Input, Text } from "native-base";
import { Dashboard, GraduateIcon } from "../../assets/icon";
import RoomRegular from "../../components/organisms/RoomRegular";
import RoomTrainee from "../../components/organisms/RoomTrainee";
import Layout from "../../components/templates/Layout";

const MemberList = () => {
  const [activeTab, setActiveTab] = useState("regular");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

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
            value={searchQuery}
            onChangeText={handleSearch}
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
        {searchQuery !== "" ? (
          <>
            <RoomRegular searchQuery={searchQuery} />
            <RoomTrainee searchQuery={searchQuery} />
          </>
        ) : activeTab === "regular" ? (
          <RoomRegular searchQuery={searchQuery} />
        ) : activeTab === "trainee" ? (
          <RoomTrainee searchQuery={searchQuery} />
        ) : (
          <Text>Members Not found</Text>
        )}
      </Box>
    </Layout>
  );
};

export default MemberList;
