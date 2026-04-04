import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  Box,
  HStack,
  Text,
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  VStack,
  Skeleton,
} from "native-base";
import Layout from "../../components/templates/Layout";
import { useRefresh } from "../../utils/hooks/useRefresh";
import { useNavigation } from "@react-navigation/native";
import { useNews } from "../../services/hooks/useNews";
import moment from "moment";
import { getNewsCategory } from "../../utils/helpers";
import { TouchableOpacity } from "react-native";

const NewsList = () => {
  const { refreshing, onRefresh } = useRefresh();
  const { setOptions, navigate } = useNavigation();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useNews(page);
  const newsItems = data?.data || [];
  const totalItems = data?.meta?.total_count || 0;
  const perPage = data?.meta?.perpage || 10;
  const totalPages = Math.ceil(totalItems / perPage) || 1;

  useLayoutEffect(() => {
    setOptions({
      headerTitle: "News List",
    });
  }, [setOptions]);

  useEffect(() => {
    if (refreshing) {
      setPage(1);
    }
  }, [refreshing]);

  const handlePrevPage = () => {
    setPage(Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    setPage(Math.min(totalPages, page + 1));
  };

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <VStack space={3} mb="6" mt="2">
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <Skeleton key={i} h="100" rounded="xl" mb="1" />
          ))
        ) : (
          <>
            {newsItems.map((item) => {
              const category = getNewsCategory(item?.category);
              return (
                <TouchableOpacity
                  key={item?.news_id}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigate("NewsDetail", {
                      id: item.url,
                    })
                  }
                >
                  <VStack
                    space={3}
                    p="4"
                    bg="black"
                    rounded="xl"
                    borderColor="gray.600"
                    borderWidth="1"
                  >
                    <HStack justifyContent="space-between" alignItems="center">
                      <Box p="1" px="2.5" borderRadius="md" bg={category.color}>
                        <Text fontSize="xs" fontWeight="semibold" color="white">
                          {category.text}
                        </Text>
                      </Box>
                      <Text color="gray.400">
                        {moment(item?.date).format("DD MMM YYYY")}
                      </Text>
                    </HStack>
                    <Text fontSize="md">{item?.title}</Text>
                  </VStack>
                </TouchableOpacity>
              );
            })}

            <HStack
              alignItems="center"
              justifyContent="space-between"
              mt={4}
              mb={8}
            >
              <Button
                borderRadius="lg"
                disabled={page === 1}
                bg={page === 1 ? "gray.500" : "blueGray.600"}
                opacity={page === 1 ? 0.7 : 1}
                onPress={handlePrevPage}
                leftIcon={<ChevronLeftIcon color="white" />}
              >
                Prev
              </Button>

              <Text fontSize="15" fontWeight="bold">
                {page} / {totalPages}
              </Text>

              <Button
                borderRadius="lg"
                disabled={page === totalPages}
                bg={page === totalPages ? "gray.500" : "blueGray.600"}
                opacity={page === totalPages ? 0.7 : 1}
                onPress={handleNextPage}
                rightIcon={<ChevronRightIcon color="white" />}
              >
                Next
              </Button>
            </HStack>
          </>
        )}
      </VStack>
    </Layout>
  );
};

export default NewsList;
