import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Button, HStack, IconButton, Input, Text } from "native-base";
import {
  CloseIcon,
  Dashboard,
  GraduateIcon,
  SearchMember
} from "../../assets/icon";
import RoomRegular from "../../components/organisms/RoomRegular";
import RoomTrainee from "../../components/organisms/RoomTrainee";
import Layout from "../../components/templates/Layout";
import { useRefresh } from "../../utils/hooks/useRefresh";
import { useNavigation } from "@react-navigation/native";

const MemberList = () => {
  const [activeTab, setActiveTab] = useState("regular");
  const [searchQuery, setSearchQuery] = useState("");
  const { refreshing, onRefresh } = useRefresh();
  const { setOptions } = useNavigation();
  const [isSearch, setIsSearch] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useLayoutEffect(() => {
    setOptions({
      headerTitle: "Member List",
      headerRight: () =>
        isSearch ? (
          <Input
            mt="1"
            mr="3"
            w="90%"
            autoFocus
            ref={inputRef}
            bgColor="white"
            variant="filled"
            fontSize="sm"
            name="id"
            height="35px"
            placeholderTextColor="secondary"
            placeholder="Cari member"
            value={searchQuery}
            onChangeText={handleSearch}
            borderRadius={6}
            InputLeftElement={
              <Box ml="2">
                <SearchMember />
              </Box>
            }
            InputRightElement={
              <Button
                onPress={() => {
                  handleSearch("");
                  setIsSearch(false);
                }}
                color="secondary"
                mr="2"
              >
                <CloseIcon />
              </Button>
            }
          />
        ) : (
          <IconButton
            icon={<SearchMember color="white" size={25} />}
            onPress={() => setIsSearch(true)}
            mt="2"
            mr="4"
          />
        )
    });
  }, [searchQuery, isSearch]);

  useEffect(() => {
    if (isSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearch]);

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <Box flex="1" mb="6">
        <HStack space={1.5} mb="4">
          <Button
            p="2"
            height="36px"
            bg={activeTab === "regular" ? "primary" : "teal"}
            onPress={() => setActiveTab("regular")}
            flex={1}
            borderRadius={6}
          >
            <HStack space={2} alignItems="center">
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
            <HStack space={2} alignItems="center">
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
