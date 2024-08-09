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
  VStack
} from "native-base";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PencilIcon } from "../../assets/icon";
import Layout from "../../components/templates/Layout";
import useUser from "../../utils/hooks/useUser";

const EditAvatar = ({ navigation }) => {
  const { profile } = useUser();
  const [selectedAvatar, setSelectedAvatar] = React.useState(null);
  const [avatarImage, setAvatarImage] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Avatar"
    });
  }, []);

  const avatars = [
    {
      user_id: 7056968,
      avatar_id: 1035785,
      last_used_at: 1715785824,
      is_fav: 0,
      image_url:
        "https://static.showroom-live.com/image/avatar/1045785.png?v=103",
      room_name: "Super ZeeOshi Room",
      created_at: 1715785768,
      updated_at: 1715785824
    },
    {
      user_id: 7056968,
      avatar_id: 1036659,
      last_used_at: 0,
      is_fav: 0,
      image_url:
        "https://static.showroom-live.com/image/avatar/1034659.png?v=103",
      room_name: "Super ZeeOshi Room",
      created_at: 1715785768,
      updated_at: 1715785768
    },
    {
      user_id: 7056968,
      avatar_id: 1036683,
      last_used_at: 1723220121,
      is_fav: 0,
      image_url:
        "https://static.showroom-live.com/image/avatar/1038683.png?v=103",
      room_name: "Super ZeeOshi Room",
      created_at: 1715785768,
      updated_at: 1723220121
    },
    {
      user_id: 7056968,
      avatar_id: 1038309,
      last_used_at: 0,
      is_fav: 0,
      image_url:
        "https://static.showroom-live.com/image/avatar/1038319.png?v=103",
      room_name: "Super ZeeOshi Room",
      created_at: 1715785768,
      updated_at: 1715785768
    },
    {
      user_id: 7056968,
      avatar_id: 1038679,
      last_used_at: 0,
      is_fav: 0,
      image_url:
        "https://static.showroom-live.com/image/avatar/1038669.png?v=103",
      room_name: "Super ZeeOshi Room",
      created_at: 1715785768,
      updated_at: 1715785768
    },
    {
      user_id: 7056968,
      avatar_id: 1039403,
      last_used_at: 0,
      is_fav: 0,
      image_url:
        "https://static.showroom-live.com/image/avatar/1039413.png?v=103",
      room_name: "Super ZeeOshi Room",
      created_at: 1715785768,
      updated_at: 1715785768
    },
    {
      user_id: 7056968,
      avatar_id: 1042177,
      last_used_at: 1716993054,
      is_fav: 0,
      image_url:
        "https://static.showroom-live.com/image/avatar/1042177.png?v=103",
      room_name: "Super ZeeOshi Room",
      created_at: 1715785768,
      updated_at: 1716993054
    },
    {
      user_id: 7056968,
      avatar_id: 1042180,
      last_used_at: 0,
      is_fav: 0,
      image_url:
        "https://static.showroom-live.com/image/avatar/1042180.png?v=103",
      room_name: "Super ZeeOshi Room",
      created_at: 1715785768,
      updated_at: 1715785768
    },
    {
      user_id: 7056968,
      avatar_id: 1045791,
      last_used_at: 0,
      is_fav: 0,
      image_url:
        "https://static.showroom-live.com/image/avatar/1045791.png?v=103",
      room_name: "Super ZeeOshi Room",
      created_at: 1715785768,
      updated_at: 1715785768
    },
    {
      user_id: 7056968,
      avatar_id: 39,
      last_used_at: 1703410593,
      is_fav: 0,
      image_url: "https://static.showroom-live.com/image/avatar/20.png?v=103",
      room_name: null,
      created_at: 1689154484,
      updated_at: 1703410593
    },
    {
      user_id: 7056968,
      avatar_id: 40,
      last_used_at: 0,
      is_fav: 0,
      image_url: "https://static.showroom-live.com/image/avatar/40.png?v=103",
      room_name: null,
      created_at: 1689154484,
      updated_at: 1689154484
    },
    {
      user_id: 7056968,
      avatar_id: 37,
      last_used_at: 1716905901,
      is_fav: 0,
      image_url: "https://static.showroom-live.com/image/avatar/37.png?v=103",
      room_name: null,
      created_at: 1688819356,
      updated_at: 1716905901
    }
  ];

  const handleChangeAvatar = (avatarId, image) => {
    setSelectedAvatar(avatarId);
    setAvatarImage(image);
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
          <Button borderRadius="full" w="100%" bg="teal">
            <HStack alignItems="center" space={2}>
              <PencilIcon color="white" size="16" />
              <Text fontWeight="bold">Update Avatar</Text>
            </HStack>
          </Button>
        </VStack>
      </Box>
      <VStack mt="2" space={4}>
        <Text fontWeight="semibold" color="white">
          Unlocked Avatar: 29
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

        <HStack justifyContent="space-between" mt={2}>
          <Button borderRadius="lg" bg="primary">
            <HStack alignItems="center" space="1">
              <ChevronLeftIcon color="white" />
              <Text>Prev</Text>
            </HStack>
          </Button>
          <Button borderRadius="lg" bg="primary">
            <HStack alignItems="center" space="1">
              <Text>Next</Text>
              <ChevronRightIcon color="white" />
            </HStack>
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
