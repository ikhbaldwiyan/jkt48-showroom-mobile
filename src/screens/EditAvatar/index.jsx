import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { updateDetailUser } from "../../services/auth";
import { getAvatarList, updateAvatar } from "../../services/user";
import useAuthStore from "../../store/authStore";
import useAvatarStore from "../../store/avatarStore";
import useUser from "../../utils/hooks/useUser";
import trackAnalytics from "../../utils/trackAnalytics";
import { useNavigation, useRoute } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import CardGradient from "../../components/atoms/CardGradient";
import {
  Box,
  Button,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FlatList,
  HStack,
  Image,
  Pressable,
  Spinner,
  Text,
  useToast,
  VStack
} from "native-base";

const TabButton = ({ type, currentType, onPress, label }) => (
  <Button
    onPress={() => onPress(type)}
    bg={currentType === type ? "blueLight" : "#4A5568"}
    borderRadius="full"
    variant={currentType === type ? "filled" : "outline"}
    borderColor="primary"
    size="sm"
    py="1.5"
  >
    <HStack alignItems="center" space={1}>
      {currentType === type && <CheckIcon color="primary" />}
      <Text
        fontSize="13"
        fontWeight="semibold"
        color={currentType === type ? "primary" : "white"}
      >
        {label}
      </Text>
    </HStack>
  </Button>
);

const AvatarItem = ({ item, selectedAvatar, onSelect }) => (
  <LinearGradient
    start={{ x: -2, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={["#282C34", "#9FAEBD"]}
    style={[
      styles.gradientContainer,
      selectedAvatar === item.avatar_id && styles.selectedGradient
    ]}
  >
    <Pressable onPress={() => onSelect(item.avatar_id, item.image_url)}>
      <Image
        mt="2"
        source={{ uri: item.image_url }}
        alt="Avatar"
        style={styles.image}
      />
    </Pressable>
  </LinearGradient>
);

const PaginationControls = ({ page, totalPages, onPrevPage, onNextPage }) => (
  <HStack alignItems="center" justifyContent="space-between">
    <Button
      onPress={page !== 1 ? onPrevPage : undefined}
      borderRadius="lg"
      bg={page !== 1 ? "gray.500" : "blueGray.800"}
      opacity={page === 1 ? 0.7 : 1}
    >
      <HStack alignItems="center" space="1">
        <ChevronLeftIcon color="white" />
      </HStack>
    </Button>

    <Text fontSize="15" fontWeight="bold">
      {page} / {totalPages}
    </Text>

    <Button
      onPress={page !== totalPages ? onNextPage : undefined}
      borderRadius="lg"
      bg={page !== totalPages ? "gray.500" : "blueGray.800"}
      opacity={page === totalPages ? 0.7 : 1}
    >
      <HStack alignItems="center" space="1">
        <ChevronRightIcon color="white" />
      </HStack>
    </Button>
  </HStack>
);

const UpdateAvatarButton = ({ isLoading, onPress }) => (
  <Button
    mt="1"
    mb="2"
    onPress={onPress}
    borderRadius="lg"
    w="100%"
    bg="primary"
    variant="filled"
    isLoadingText="Updating Avatar"
    disabled={isLoading}
    opacity={isLoading ? "0.5" : "1"}
    _disabled={{
      bgColor: "gray.600"
    }}
  >
    <TouchableOpacity onPress={onPress}>
      <HStack alignItems="center" space={2}>
        {isLoading && <Spinner color="white" />}
        <Text fontWeight="bold">
          {isLoading ? "Updating Avatar" : "Update Avatar"}
        </Text>
      </HStack>
    </TouchableOpacity>
  </Button>
);

const EditAvatar = () => {
  const route = useRoute();
  const toast = useToast();
  const navigation = useNavigation();
  const isAvatarScreen = route?.name === "Avatar";

  const { setProfile } = useAuthStore();
  const { profile, session, userProfile } = useUser();
  const { setAvatarImage, resetAvatar } = useAvatarStore();

  const [limit] = useState(isAvatarScreen ? 20 : 12);
  const [avatars, setAvatars] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("all");
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [totalAvatar, setTotalAvatar] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = Math.ceil(totalAvatar / limit);

  useEffect(() => {
    fetchAvatars();
  }, [page, type]);

  useEffect(() => {
    return () => {
      resetAvatar();
    };
  }, []);

  const fetchAvatars = async () => {
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

  const updateUserAvatar = async () => {
    setIsLoading(true);
    try {
      await updateDetailUser(userProfile.user_id, {
        avatar: `https://static.showroom-live.com/image/avatar/${selectedAvatar}.png`
      });
      trackAnalytics("update_user_avatar", {
        userId: userProfile.user_id
      });
      showSuccessToast();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const showSuccessToast = () => {
    toast.show({
      render: () => (
        <Box m="3" py="1" px="2" mt="10" mb={5} bg="green.600" rounded="sm">
          <Text>Berhasil update avatar</Text>
        </Box>
      ),
      placement: "top-right"
    });
  };

  const updateAvatarImage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateAvatar({
        csrf_token: session.csrf_token,
        cookies_id: session.cookie_login_id,
        avatar_id: selectedAvatar
      });
      setProfile({
        ...profile,
        avatar_url: `https://static.showroom-live.com/image/avatar/${selectedAvatar}.png`
      });
      await updateUserAvatar();
      navigation.navigate("Profile");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeAvatar = (avatarId, image) => {
    setSelectedAvatar(avatarId);
    setAvatarImage(image);
  };

  const handlePrevPage = () => setPage(Math.max(1, page - 1));
  const handleNextPage = () => setPage(Math.min(totalPages, page + 1));

  const handleTab = (newType) => {
    setPage(1);
    setType(newType);
  };

  return (
    <CardGradient halfCard={!isAvatarScreen}>
      <VStack mt="2" space={4}>
        <HStack alignItems="center" justifyContent="space-between">
          <HStack space={2}>
            <TabButton
              type="all"
              currentType={type}
              onPress={handleTab}
              label="All"
            />
            <TabButton
              type="fav"
              currentType={type}
              onPress={handleTab}
              label="Favorite"
            />
            <TabButton
              type="recent_used"
              currentType={type}
              onPress={handleTab}
              label="History"
            />
          </HStack>
          <Text color="white">Total: {totalAvatar}</Text>
        </HStack>

        {totalAvatar === 0 && <Text mt="3">Avatar Not found</Text>}

        <FlatList
          data={avatars}
          numColumns={4}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <AvatarItem
              item={item}
              selectedAvatar={selectedAvatar}
              onSelect={handleChangeAvatar}
            />
          )}
          keyExtractor={(item) => item.avatar_id.toString()}
        />

        <PaginationControls
          page={page}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />

        <UpdateAvatarButton isLoading={isLoading} onPress={updateAvatarImage} />
      </VStack>
    </CardGradient>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 8
  },
  gradientContainer: {
    width: "24%",
    height: 70,
    borderRadius: 16,
    marginBottom: 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent"
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginVertical: 4,
    marginBottom: 8
  },
  selectedGradient: {
    borderRadius: 20,
    borderColor: "#24A2B7",
  }
});

export default EditAvatar;
