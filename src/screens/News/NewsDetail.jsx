import React, { useLayoutEffect } from "react";
import { Box, Text, Divider, Spinner, VStack, HStack } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useNewsDetail } from "../../services/hooks/useNews";
import Layout from "../../components/templates/Layout";
import moment from "moment";
import { getNewsCategory } from "../../utils/helpers";
import HTMLView from "react-native-htmlview";
import { StyleSheet, Image, Dimensions } from "react-native";

const NewsDetail = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;
  const { data, isLoading } = useNewsDetail(id);
  const { width: windowWidth } = Dimensions.get("window");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Detail News",
    });
  }, [navigation]);

  const category = getNewsCategory(data?.category);
  const htmlContent = (data?.content || "").replace(/#33333[3]?/gi, "white");

  const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name === "img") {
      const { src } = node.attribs;
      return (
        <Image
          key={index}
          source={{ uri: src }}
          style={{
            width: windowWidth - 40,
            height: 250,
            marginVertical: 10,
            borderRadius: 8,
          }}
          resizeMode="contain"
        />
      );
    }

    if (node.name === "table") {
      return (
        <VStack
          key={index}
          borderWidth="0.5"
          borderColor="gray.600"
          my="2"
          width="100%"
        >
          {defaultRenderer(node.children, node)}
        </VStack>
      );
    }

    if (node.name === "tr") {
      return (
        <HStack
          key={index}
          borderBottomWidth="0.5"
          borderColor="gray.600"
          width="100%"
        >
          {defaultRenderer(node.children, node)}
        </HStack>
      );
    }

    if (node.name === "td" || node.name === "th") {
      const style = node.attribs?.style || "";
      const bg = style.includes("background: #ff005f")
        ? "#23A1B7"
        : "transparent";
      const colSpan = parseInt(node.attribs?.colspan || "1");

      return (
        <Box
          key={index}
          flex={colSpan}
          p="2"
          bg={bg}
          borderRightWidth="0.5"
          borderColor="gray.600"
          justifyContent="center"
        >
          {defaultRenderer(node.children, node)}
        </Box>
      );
    }
  };

  if (isLoading) {
    return (
      <Box flex={1} bg="secondary" justifyContent="center" alignItems="center">
        <Spinner color="white" size="lg" />
      </Box>
    );
  }

  return (
    <Layout>
      <VStack space={2} bg="secondary" mb="10">
        <Text fontSize="xl" fontWeight="bold" color="white">
          {data?.title}
        </Text>
        <HStack justifyContent="space-between" alignItems="center" my={2}>
          <Box p="1" px="3" borderRadius="md" bg={category.color}>
            <Text fontSize="sm" fontWeight="semibold" color="white">
              {category.text}
            </Text>
          </Box>
          <Text color="gray.400" fontSize="sm">
            {moment(data?.date).format("DD MMMM YYYY")}
          </Text>
        </HStack>
        <Divider bg="gray.600" mb="4" />
        <Box px="1">
          <HTMLView
            value={htmlContent}
            stylesheet={htmlStyles}
            addLineBreaks={false}
            renderNode={renderNode}
          />
        </Box>
      </VStack>
    </Layout>
  );
};

const htmlStyles = StyleSheet.create({
  p: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 22,
  },
  strong: {
    color: "white",
    fontWeight: "bold",
  },
  a: {
    color: "#24A2B7",
    textDecorationLine: "underline",
  },
  span: {
    color: "#cbd5e1",
  },
  h1: { color: "white", fontSize: 22, fontWeight: "bold", marginBottom: 2 },
  h2: { color: "white", fontSize: 20, fontWeight: "bold", marginBottom: 2 },
  h3: { color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 2 },
  div: { color: "#cbd5e1" },
  ul: { color: "#cbd5e1" },
  li: { color: "#cbd5e1" },
});

export default NewsDetail;
