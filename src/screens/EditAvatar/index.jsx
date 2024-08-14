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
import { updateDetailUser } from "../../services/auth";
import { getAvatarList, updateAvatar } from "../../services/user";
import useAuthStore from "../../store/authStore";
import { activityLog } from "../../utils/activityLog";
import useUser from "../../utils/hooks/useUser";
import trackAnalytics from "../../utils/trackAnalytics";

const EditAvatar = ({ navigation }) => {
  const { profile, session, userProfile } = useUser();
  const { setProfile } = useAuthStore();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const [avatars, setAvatars] = useState([]);
  const [limit] = useState(12);
  const [totalAvatar, setTotalAvatar] = useState(0);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("all");
  const [title, setTitle] = useState("Unlocked");

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
          page,
          type
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
  }, [page, type]);

  const updateUserAvatar = async () => {
    try {
      await updateDetailUser(userProfile.user_id, {
        avatar: `https://static.showroom-live.com/image/avatar/${selectedAvatar}.png`
      });
      activityLog({
        logName: "User",
        description: "Update avatar image",
        userId: userProfile._id
      });
      trackAnalytics("update_user_avatar", {
        userId: userProfile.user_id,
      })
    } catch (err) {
      console.log(err);
    }
  };

  const updateAvatarImage = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAvatar({
        csrf_token: session.csrf_token,
        cookies_id: session.cookie_login_id,
        avatar_id: selectedAvatar
      });
      setProfile({
        ...profile,
        avatar_url: `https://static.showroom-live.com/image/avatar/${selectedAvatar}.png`
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
      await updateUserAvatar();

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

  const handleTab = (type, title) => {
    setPage(1);
    setType(type);
    setTitle(title);
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
          <LinearGradient
            colors={["#24A2B7", "#A9EDF9"]}
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
            <TouchableOpacity onPress={updateAvatarImage}>
              <HStack alignItems="center" space={2}>
                <PencilIcon color="white" size="16" />
                <Text fontWeight="bold">Update Avatar</Text>
              </HStack>
            </TouchableOpacity>
          </Button>
        </VStack>
      </Box>
      <VStack mt="2" space={4}>
        <Text color="white">
          {title} Avatar: {totalAvatar}
        </Text>

        <HStack space={2}>
          <Button
            onPress={() => handleTab("all", "Unlocked")}
            bg={type === "all" ? "primary" : "blueGray.500"}
            borderRadius="xl"
            size="sm"
          >
            <Text fontSize="13" fontWeight="semibold">
              All
            </Text>
          </Button>
          <Button
            onPress={() => handleTab("fav", "Favorite")}
            bg={type === "fav" ? "primary" : "blueGray.500"}
            borderRadius="xl"
            size="sm"
          >
            <Text fontSize="13" fontWeight="semibold">
              Favorite
            </Text>
          </Button>
          <Button
            onPress={() => handleTab("recent_used", "History")}
            bg={type === "recent_used" ? "primary" : "blueGray.500"}
            borderRadius="xl"
            size="sm"
          >
            <Text fontSize="13" fontWeight="semibold">
              History
            </Text>
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
          {page !== 1 ? (
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
          ) : (
            <Button opacity={0.7} borderRadius="lg" bg="cyan.700">
              <HStack alignItems="center" space="1">
                <ChevronLeftIcon color="white" />
                <Text>Prev</Text>
              </HStack>
            </Button>
          )}
          <Text fontSize="15" fontWeight="bold">
            {page} / {totalPages}
          </Text>
          {page !== totalPages ? (
            <Button onPress={handleNextPage} borderRadius="lg" bg="primary">
              <TouchableOpacity opacity="0.8" onPress={handleNextPage}>
                <HStack alignItems="center" space="1">
                  <Text>Next</Text>
                  <ChevronRightIcon color="white" />
                </HStack>
              </TouchableOpacity>
            </Button>
          ) : (
            <Button opacity={0.7} borderRadius="lg" bg="cyan.700">
              <HStack alignItems="center" space="1">
                <Text>Next</Text>
                <ChevronRightIcon color="white" />
              </HStack>
            </Button>
          )}
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
