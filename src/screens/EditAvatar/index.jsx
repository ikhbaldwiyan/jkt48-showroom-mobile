import {
  Box,
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  FlatList,
  HStack,
  Image,
  Pressable,
  Text,
  useToast,
  VStack
} from "native-base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PencilIcon } from "../../assets/icon";
import Layout from "../../components/templates/Layout";
import { getAvatarList, updateAvatar } from "../../services/user";
import useUser from "../../utils/hooks/useUser";

const EditAvatar = ({ navigation }) => {
  const { profile, session } = useUser();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const [avatars, setAvatars] = useState([]);
  const [limit] = useState(12);
  const [totalAvatar, setTotalAvatar] = useState(0);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalAvatar / limit);
  const toast = useToast();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Avatar"
    });
  }, []);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await getAvatarList({
          csrf_token: session.csrf_token,
          cookies_id: session.cookie_login_id,
          limit,
          page
        });
        const { avatars, current_user_avatar, total_entries } = response.data;
        setAvatars(avatars);
        setTotalAvatar(total_entries);
        setSelectedAvatar(current_user_avatar.avatar_id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAvatar();
  }, [page]);

  const updateAvatarImage = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAvatar({
        csrf_token: session.csrf_token,
        cookies_id: session.cookie_login_id,
        avatar_id: selectedAvatar
      });
      toast.show({
        render: () => {
          return (
            <Box m="3" py="1" px="2" mt="10" mb={5} bg="green.600" rounded="sm">
              <Text>{response.data.message}</Text>
            </Box>
          );
        },
        placement: "bottom"
      });
      navigation.navigate("Profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAvatar = (avatarId, image) => {
    setSelectedAvatar(avatarId);
    setAvatarImage(image);
  };

  const handlePrevPage = () => {
    setPage(Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    setPage(Math.min(totalPages, page + 1));
  };

  return (
    <Layout>
      <Box py="3">
        <VStack
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          space={4}
        >
          <Text fontSize="xl" fontWeight="bold">
            Selected Avatar
          </Text>
          <LinearGradient
            colors={["#24A2B7", "#3B82F6"]}
            style={[styles.avatarImage]}
          >
            <Image
              style={{ width: 80, height: 80 }}
              source={{
                uri: avatarImage ?? profile?.avatar_url
              }}
              alt="avatar"
            />
          </LinearGradient>
          <Button
            onPress={updateAvatarImage}
            borderRadius="full"
            w="100%"
            bg="teal"
          >
            <HStack alignItems="center" space={2}>
              <PencilIcon color="white" size="16" />
              <Text fontWeight="bold">Update Avatar</Text>
            </HStack>
          </Button>
        </VStack>
      </Box>
      <VStack mt="2" space={4}>
        <Text fontWeight="semibold" color="white">
          Unlocked Avatar: {totalAvatar}
        </Text>

        <HStack space={2}>
          <Button bg="primary" borderRadius="xl" size="sm">
            All
          </Button>
          <Button bg="gray.500" borderRadius="xl" size="sm">
            Favorite
          </Button>
          <Button bg="gray.500" borderRadius="xl" size="sm">
            History
          </Button>
        </HStack>

        <FlatList
          data={avatars}
          numColumns={4}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <LinearGradient
              colors={["#4A5568", "#9FAEBD"]}
              style={[
                styles.gradientContainer,
                selectedAvatar === item.avatar_id && styles.selectedGradient
              ]}
            >
              <Pressable
                onPress={() =>
                  handleChangeAvatar(item.avatar_id, item.image_url)
                }
              >
                <Image
                  mt="2"
                  source={{ uri: item.image_url }}
                  alt="Avatar"
                  style={styles.image}
                />
              </Pressable>
            </LinearGradient>
          )}
          keyExtractor={(item) => item.avatar_id.toString()}
        />

        <HStack alignItems="center" justifyContent="space-between" mt={2}>
          <Button
            onPress={handlePrevPage}
            disabled={page === 1}
            borderRadius="lg"
            bg="primary"
          >
            <TouchableOpacity opacity="0.8" onPress={handlePrevPage}>
              <HStack alignItems="center" space="1">
                <ChevronLeftIcon color="white" />
                <Text>Prev</Text>
              </HStack>
            </TouchableOpacity>
          </Button>
          <Text fontWeight="bold">
            {page} / {totalPages}
          </Text>
          <Button
            onPress={handleNextPage}
            disabled={page === totalPages}
            borderRadius="lg"
            bg="primary"
          >
            <TouchableOpacity opacity="0.8" onPress={handleNextPage}>
              <HStack alignItems="center" space="1">
                <Text>Next</Text>
                <ChevronRightIcon color="white" />
              </HStack>
            </TouchableOpacity>
          </Button>
        </HStack>
      </VStack>
    </Layout>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 8 // Equivalent to mb={2} in NativeBase
  },
  avatarImage: {
    padding: 15,
    borderRadius: 20
  },
  gradientContainer: {
    width: "23%",
    borderRadius: 10,
    marginBottom: 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent"
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8, // Equivalent to rounded="md"
    marginVertical: 4,
    marginBottom: 8
  },
  selectedGradient: {
    borderRadius: 15,
    borderColor: "cyan"
  }
});

export default EditAvatar;
