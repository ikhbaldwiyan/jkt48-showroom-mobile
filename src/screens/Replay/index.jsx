import React, { useLayoutEffect, useState } from "react";
import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "native-base";
import Layout from "../../components/templates/Layout";
import TabButton from "../../components/atoms/TabButton";
import { useReplaylist } from "../../services/hooks/useReplay";
import { Calendar, TimesIcon } from "../../assets/icon";
import moment from "moment";
import { RefreshControl, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

const ReplayList = ({ refreshing }) => {
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const { data, refetch, isRefetching } = useReplaylist(1);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Replay Live",
    });
  }, [navigation]);

  const filteredData = data?.filter((item) => {
    if (type === "all") return true;
    if (type === "idn") return item?.title?.toLowerCase()?.includes("idn");
    if (type === "showroom")
      return (
        item?.title?.toLowerCase()?.includes("showroom") ||
        !item?.title?.toLowerCase()?.includes("idn")
      );
    return true;
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
        <HStack space={3} mb="4" mt="2">
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

        <Box flex={1}>
          <FlashList
            data={paginatedData}
            keyExtractor={(item, index) => index.toString()}
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
