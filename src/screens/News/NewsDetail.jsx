import React, { useLayoutEffect, useState } from "react";
import {
  Box,
  Text,
  Divider,
  Spinner,
  VStack,
  HStack,
  Image,
} from "native-base";
import { useRoute } from "@react-navigation/native";
import { useNewsDetail } from "../../services/hooks/useNews";
import Layout from "../../components/templates/Layout";
import moment from "moment";
import { getNewsCategory } from "../../utils/helpers";
import HTMLView from "react-native-htmlview";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import ImagePreviewModal from "../../components/atoms/Modal/ImagePreviewModal";

const NewsDetail = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;
  const { data, isLoading } = useNewsDetail(id);
  const { width: windowWidth } = Dimensions.get("window");
  const [imagePreviewModal, setImagePreviewModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

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
        <TouchableOpacity
          key={index}
          onPress={() => {
            setSelectedImage(src);
            setImagePreviewModal(true);
          }}
        >
          <Image
            source={{ uri: src }}
            style={{
              width: windowWidth - 40,
              height: 200,
            }}
            borderRadius="lg"
            resizeMode="contain"
          />
        </TouchableOpacity>
      );
    }

    if (node.name === "table") {
      return (
        <VStack
          key={index}
          borderWidth="0.5"
          borderColor="gray.300"
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
          borderWidth="1"
          borderRightWidth={1}
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
        {data?.background_image && (
          <Image
            source={{ uri: data?.background_image }}
            style={{
              width: "100%",
              height: 250,
            }}
            borderRadius="xl"
            resizeMode="contain"
          />
        )}
        <Divider bg="gray.600" mb="4" />
        <Box px="1">
          <HTMLView
            value={htmlContent}
            stylesheet={htmlStyles}
            renderNode={renderNode}
          />
        </Box>
      </VStack>
      <ImagePreviewModal
        isOpen={imagePreviewModal}
        onClose={() => setImagePreviewModal(false)}
        imageUri={selectedImage}
      />
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
  ol: { color: "#cbd5e1" },
  ul: { color: "#cbd5e1" },
  li: { color: "#cbd5e1" },
});

export default NewsDetail;
