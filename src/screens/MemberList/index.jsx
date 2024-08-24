import React, { useState } from "react";
import { Box, Button, HStack, Input, Text } from "native-base";
import { Dashboard, GraduateIcon } from "../../assets/icon";
import RoomRegular from "../../components/organisms/RoomRegular";
import RoomTrainee from "../../components/organisms/RoomTrainee";
import Layout from "../../components/templates/Layout";
import { useRefresh } from "../../utils/hooks/useRefresh";

const MemberList = () => {
  const [activeTab, setActiveTab] = useState("regular");
  const [searchQuery, setSearchQuery] = useState("");
  const { refreshing, onRefresh } = useRefresh();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Layout isHeader refreshing={refreshing} onRefresh={onRefresh}>
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
            placeholder="Cari member"
            value={searchQuery}
            onChangeText={handleSearch}
            borderRadius={6}
          />
          <Button
            p="2"
            height="36px"
            bg={activeTab === "regular" ? "primary" : "teal"}
            onPress={() => setActiveTab("regular")}
            flex={1}
            borderRadius={6}
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
            flex={1}
            borderRadius={6}
          >
            <HStack space={1} alignItems="center">
              <GraduateIcon size={15} />
              <Text fontWeight="semibold">Trainee</Text>
            </HStack>
          </Button>
        </HStack>
        {searchQuery !== "" ? (
          <>
            <RoomRegular searchQuery={searchQuery} refreshing={refreshing} />
            <RoomTrainee searchQuery={searchQuery} refreshing={refreshing} />
          </>
        ) : activeTab === "regular" ? (
          <RoomRegular searchQuery={searchQuery} refreshing={refreshing} />
        ) : activeTab === "trainee" ? (
          <RoomTrainee searchQuery={searchQuery} refreshing={refreshing} />
        ) : (
          <Text>Members Not found</Text>
        )}
      </Box>
    </Layout>
  );
};

export default MemberList;
