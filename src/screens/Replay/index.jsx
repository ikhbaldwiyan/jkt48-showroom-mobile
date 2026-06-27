import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import moment from "moment";
import {
  Box,
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  HStack,
  Image,
  SearchIcon,
  Text,
  VStack,
} from "native-base";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  RefreshControl,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  Calendar,
  CloseIcon,
  SearchMember,
  TimesIcon,
} from "../../assets/icon";
import TabButton from "../../components/atoms/TabButton";
import Layout from "../../components/templates/Layout";
import { useReplaylist } from "../../services/hooks/useReplay";

const ReplayList = ({ refreshing }) => {
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const itemsPerPage = 10;
  const { data, refetch, isRefetching } = useReplaylist();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Replay Live",
      headerRight: () => (
        <HStack mr={4} space={2} alignItems="center">
          {isSearch && (
            <HStack
              alignItems="center"
              bg="gray.700"
              borderRadius="lg"
              px="3"
              py="1"
              space={2}
            >
              <SearchMember size={15} color="#9ca3af" />
              <TextInput
                ref={inputRef}
                value={search}
                onChangeText={(val) => {
                  setSearch(val);
                  setPage(1);
                }}
                placeholder="Cari member..."
                placeholderTextColor="#9ca3af"
                style={styles.searchInput}
                autoFocus
              />
            </HStack>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setIsSearch(!isSearch);
              setSearch("");
            }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {isSearch ? (
              <CloseIcon size={20} color="#ffff" />
            ) : (
              <SearchIcon size={25} color="white" />
            )}
          </TouchableOpacity>
        </HStack>
      ),
    });
  }, [isSearch, search]);

  useEffect(() => {
    if (isSearch) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isSearch]);

  const filteredData = data?.filter((item) => {
    const titleLower = item?.title?.toLowerCase() ?? "";
    const matchesType =
      type === "all" ||
      (type === "idn" && titleLower.includes("idn")) ||
      (type === "showroom" &&
        (titleLower.includes("showroom") || !titleLower.includes("idn")));

    const matchesSearch = !search || titleLower.includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage) || 1;
  const paginatedData = filteredData?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("ReplayDetail", { item })}
    >
      <Box mb="4">
        <VStack space={1.5}>
          <Image
            source={{
              uri: `https://img.youtube.com/vi/${
                item.youtube_id ?? item?.id
              }/mqdefault.jpg`,
            }}
            fallbackSource={{
              uri: "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg",
            }}
            alt="image"
            width="100%"
            height={200}
            borderRadius="md"
            resizeMode="cover"
          />
          <Text fontSize="md" fontWeight="semibold" color="white" mt="1">
            {item?.title?.replace("WIB", "").replace("LIVE IDN ", "")}
          </Text>
          <HStack alignItems="center" space={1.5}>
            <Calendar size={14} color="#d4d4d8" />
            <Text fontSize={13} color="gray.300">
              {item?.title?.includes("|")
                ? item?.title?.split(" - ")?.pop()?.split(" | ")?.[0]?.trim()
                : moment(item.date).format("DD MMM YYYY")}
            </Text>
            <Text color="gray.300">-</Text>
            <TimesIcon size={14} color="#d4d4d8" />
            <Text fontSize={13} color="gray.300">
              {item?.title?.includes("|")
                ? item?.title?.split(" | ")?.[1]?.trim()
                : moment(item.added_at).format("HH:mm")}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );

  return (
    <Layout title="Replay Live" onRefresh={refetch} refreshing={isRefetching}>
      <Box pb="4" flex={1}>
        <HStack space={3} mb="4">
          <TabButton
            onPress={() => {
              setType("all");
              setPage(1);
            }}
            type="all"
            currentType={type}
            label="All Platform"
          />
          <TabButton
            onPress={() => {
              setType("idn");
              setPage(1);
            }}
            type="idn"
            currentType={type}
            label="IDN Live"
          />
          <TabButton
            onPress={() => {
              setType("showroom");
              setPage(1);
            }}
            type="showroom"
            currentType={type}
            label="Showroom"
          />
        </HStack>

        <Box flex={1} mt="1">
          <FlashList
            data={paginatedData}
            keyExtractor={(item) => item?.youtube_id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={300}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refetch}
                tintColor="white"
              />
            }
          />
        </Box>

        <HStack
          alignItems="center"
          justifyContent="space-between"
          mt={4}
          mb="8"
        >
          <Button
            borderRadius="lg"
            disabled={page === 1}
            bg={page === 1 ? "gray.500" : "blueGray.600"}
            opacity={page === 1 ? 0.7 : 1}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handlePrevPage}
              disabled={page === 1}
            >
              <HStack alignItems="center" space="1">
                <ChevronLeftIcon color="white" />
                <Text>Prev</Text>
              </HStack>
            </TouchableOpacity>
          </Button>

          <Text fontSize="15" fontWeight="bold">
            {page} / {totalPages}
          </Text>

          <Button
            borderRadius="lg"
            disabled={page === totalPages}
            bg={page === totalPages ? "gray.500" : "blueGray.600"}
            opacity={page === totalPages ? 0.7 : 1}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleNextPage}
              disabled={page === totalPages}
            >
              <HStack alignItems="center" space="1">
                <Text>Next</Text>
                <ChevronRightIcon color="white" />
              </HStack>
            </TouchableOpacity>
          </Button>
        </HStack>
      </Box>
    </Layout>
  );
};

export default ReplayList;

const styles = StyleSheet.create({
  searchInput: {
    color: "white",
    fontSize: 14,
    minWidth: 120,
    paddingVertical: 2,
  },
});
