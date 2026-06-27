import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  CheckCircleIcon,
  HStack,
  IconButton,
  SearchIcon,
  Select,
} from "native-base";
import {
  CloseIcon,
  FireIcon,
  LoveIcon,
  SearchMember,
  StarIcon,
} from "../../assets/icon";
import Layout from "../../components/templates/Layout";
import { useRefresh } from "../../utils/hooks/useRefresh";
import { useNavigation } from "@react-navigation/native";
import debounce from "lodash/debounce";
import FormInput from "../../components/atoms/FormInput";
import MemberRoomList from "../../components/organisms/MemberRoomlist";
import TabButton from "../../components/atoms/TabButton";

const MemberList = () => {
  const [activeTab, setActiveTab] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { refreshing, onRefresh } = useRefresh();
  const { setOptions } = useNavigation();
  const [isSearch, setIsSearch] = useState(false);
  const inputRef = useRef(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("regular");

  const debouncedChangeHandler = useCallback(
    debounce((value) => {
      setDebouncedSearch(value);
    }, 600),
    []
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveTab("")
    debouncedChangeHandler(query);
  };

  useLayoutEffect(() => {
    setOptions({
      headerTitle: "Member List",
      headerRight: () =>
        isSearch ? (
          <FormInput
            mt="1"
            mr="3"
            w="90%"
            mb={0}
            autoFocus
            ref={inputRef}
            placeholder="Cari member"
            value={searchQuery}
            onChange={handleSearch}
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
                variant="unstyled"
                p="0"
              >
                <CloseIcon color="secondary" />
              </Button>
            }
          />
        ) : (
          <IconButton
            icon={<SearchIcon color="white" size={25} />}
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

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <Box flex="1" mb="6">
        {!searchQuery && (
          <HStack justifyContent="space-between" space={1.5} mb="2">
            <Select
              borderRadius="2xl"
              selectedValue={category}
              onValueChange={(value) => {
                if (value === "trainee") {
                  setCategory(value);
                  setActiveTab("");
                } else {
                  setCategory(value);
                }
              }}
              placeholder="Select Platform"
              color="white"
              minW={115}
            >
              <Select.Item
                label="Regular"
                value="regular"
                endIcon={
                  category === "regular" ? (
                    <Box mt="1">
                      <CheckCircleIcon size="4" color="primary" />
                    </Box>
                  ) : null
                }
              />
              <Select.Item
                label="Trainee"
                value="trainee"
                endIcon={
                  category === "trainee" ? (
                    <Box mt="1">
                      <CheckCircleIcon size="4" color="primary" />
                    </Box>
                  ) : null
                }
              />
            </Select>
            {category === "regular" && (
              <>
                <TabButton
                  label="Love"
                  type="love"
                  currentType={activeTab}
                  onPress={() => setActiveTab("love")}
                  customIcon={<LoveIcon color="#23A1B7" size={16} />}
                />
                <TabButton
                  label="Dream"
                  type="dream"
                  currentType={activeTab}
                  onPress={() => setActiveTab("dream")}
                  customIcon={<StarIcon color="#23A1B7" size={16} />}
                />
                <TabButton
                  label="Passion"
                  type="passion"
                  currentType={activeTab}
                  onPress={() => setActiveTab("passion")}
                  customIcon={<FireIcon color="#23A1B7" size={17} />}
                />
              </>
            )}
          </HStack>
        )}
        <MemberRoomList
          memberCategory={category}
          team={activeTab}
          refreshing={refreshing}
          searchQuery={debouncedSearch}
        />
      </Box>
    </Layout>
  );
};

export default MemberList;
