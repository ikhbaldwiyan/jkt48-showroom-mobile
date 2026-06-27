import React from "react";
import {
  Box,
  ChevronRightIcon,
  Divider,
  HStack,
  Text,
  VStack,
} from "native-base";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useNews } from "../../../services/hooks/useNews";
import { getNewsCategory } from "../../../utils/helpers";

const News = () => {
  const navigation = useNavigation();
  const { data, isSuccess } = useNews(1);
  const news = data?.data;

  if (!news) return null;

  return (
    isSuccess && (
      <Box mb="3">
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="2xl" mb="3" fontWeight="semibold">
            News
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("NewsList")}>
            <HStack alignItems="center" mb="1" space={1.5}>
              <Text fontSize="sm" color="gray.400">
                Lihat semua
              </Text>
              <ChevronRightIcon size="3" />
            </HStack>
          </TouchableOpacity>
        </HStack>
        <VStack space={3}>
          {news.slice(0, 3).map((item, idx) => {
            const category = getNewsCategory(item?.category);
            return (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("NewsDetail", {
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
        </VStack>
        <Divider mt="4" />
      </Box>
    )
  );
};

export default News;
