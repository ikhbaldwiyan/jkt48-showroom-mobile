import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Box, Button, HStack, IconButton, Input, Text } from "native-base";
import {
  CloseIcon,
  Dashboard,
  GraduateIcon,
  SearchMember,
} from "../../assets/icon";
import RoomRegular from "../../components/organisms/RoomRegular";
import RoomTrainee from "../../components/organisms/RoomTrainee";
import Layout from "../../components/templates/Layout";
import { useRefresh } from "../../utils/hooks/useRefresh";
import { useNavigation } from "@react-navigation/native";
import debounce from "lodash/debounce";

const MemberList = () => {
  const [activeTab, setActiveTab] = useState("regular");
  const [searchQuery, setSearchQuery] = useState("");
  const { refreshing, onRefresh } = useRefresh();
  const { setOptions } = useNavigation();
  const [isSearch, setIsSearch] = useState(false);
  const inputRef = useRef(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debouncedChangeHandler = useCallback(
    debounce((value) => {
      setDebouncedSearch(value);
    }, 1000),
    []
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    debouncedChangeHandler(query);
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
        ),
    });
  }, [searchQuery, isSearch]);

  useEffect(() => {
    if (isSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearch]);

  const TabButton = ({ type, currentType, label }) => (
    <Button
      onPress={() => setActiveTab(type)}
      bg={currentType === type ? "blueLight" : "secondary"}
      borderRadius="2xl"
      variant={currentType === type ? "filled" : "outline"}
      borderColor="primary"
      size="md"
      py="1.5"
      flex={1}
    >
      <HStack alignItems="center" space={2}>
        {type === "regular" && (
          <Dashboard
            size="18px"
            color={currentType === type ? "#24A2B7" : "white"}
          />
        )}
        {type === "trainee" && (
          <GraduateIcon
            size="16px"
            color={currentType === type ? "#24A2B7" : "white"}
          />
        )}
        <Text
          fontWeight={currentType === type ? "extrabold" : "medium"}
          color={currentType === type ? "primary" : "white"}
        >
          {label}
        </Text>
      </HStack>
    </Button>
  );

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <Box flex="1" mb="6">
        {!searchQuery && (
          <HStack space={1.5} mb="4">
            <TabButton label="Regular" type="regular" currentType={activeTab} />
            <TabButton label="Trainee" type="trainee" currentType={activeTab} />
          </HStack>
        )}
        {activeTab === "regular" ? (
          <RoomRegular refreshing={refreshing} searchQuery={debouncedSearch} />
        ) : (
          <RoomTrainee refreshing={refreshing} searchQuery={debouncedSearch} />
        )}
      </Box>
    </Layout>
  );
};

export default MemberList;
