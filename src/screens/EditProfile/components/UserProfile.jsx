import {
  Actionsheet,
  Box,
  Button,
  FormControl,
  HStack,
  Image,
  Input,
  ScrollView,
  Spinner,
  Text,
  VStack,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import { IDCard, StarIcon, UserIcon } from "../../../assets/icon";
import CardGradient from "../../../components/atoms/CardGradient";
import useAuthStore from "../../../store/authStore";
import { useUser } from "../../../utils/hooks";
import {
  useProfile,
  useShowroomProfile,
  useUpdateProfile,
  useUpdateUserProfile,
} from "../../../services/hooks/useProfile";
import { useNavigation } from "@react-navigation/native";
import { Oshimen } from "../../../components/organisms";
import { Linking } from "react-native";
import ToastAlert from "../../../components/atoms/ToastAlert";

export const UserProfile = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const { user, session, profile, userProfile } = useUser();
  const { data } = useShowroomProfile(user?.user_id);
  const { setProfile } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const { data: profileUser, isRefetching } = useProfile(user?.account_id);

  const [formData, setFormData] = useState({
    name: profile?.name,
    about: "",
  });

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      about: data?.description,
    }));
  }, [data]);

  const updateProfileMutation = useUpdateProfile();
  const updateUserProfileMutation = useUpdateUserProfile();

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    updateProfileMutation.mutate(
      {
        name: formData.name,
        description: formData.about,
        csrf_token: session.csrf_token,
        cookies_id: session.cookie_login_id,
        residence: 48,
      },
      {
        onSuccess: () => {
          setProfile({
            ...profile,
            name: formData?.name,
            avatar: data?.avatar_url,
          });

          updateUserProfileMutation.mutate({
            user_id: userProfile?.user_id,
            name: formData.name,
          });

          toast.show({
            render: () => (
              <ToastAlert
                variant="left-accent"
                status="success"
                title="Success"
                description="Berhasil update profil"
              />
            ),
            placement: "top-right",
          });

          navigation.navigate("Profile");
        },
      },
      {
        onError: (error) => {
          console.log(error);
          toast.show({
            render: () => (
              <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
                <Text color="white">Failed to update profile</Text>
              </Box>
            ),
            placement: "bottom",
          });
        },
      }
    );
  };

  return (
    <>
      <CardGradient halfCard>
        <ScrollView mt="3">
          <FormControl>
            <VStack space={3}>
              <HStack space={2} alignItems="center">
                <UserIcon size="14" />
                <Box flex={1}>
                  <Text color="gray.300" fontSize="14">
                    Name
                  </Text>
                </Box>
              </HStack>
              <Input
                bgColor="white"
                variant="filled"
                w="100%"
                fontSize="md"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChangeText={(value) => handleChange("name", value)}
              />
              <HStack space={2} alignItems="center">
                <StarIcon color="white" size="14" />
                <Box flex={1}>
                  <Text color="gray.300" fontSize="14">
                    Oshimen
                  </Text>
                </Box>
              </HStack>
              <Box>
                {profileUser?.oshimen && !isRefetching ? (
                  <HStack alignItems="center">
                    <VStack w="30%">
                      <Image
                        alt="Member"
                        style={{ width: 84, height: 110 }}
                        source={{ uri: profileUser?.oshimen?.image }}
                        rounded="lg"
                      />
                    </VStack>
                    <VStack w="70%" space={1}>
                      <Text fontWeight="semibold" flexWrap="nowrap">
                        {profileUser?.oshimen?.name}
                      </Text>
                      <Text fontSize="xs" flexWrap="wrap">
                        {profileUser?.oshimen?.jiko}
                      </Text>
                      <Button
                        px="3"
                        width={120}
                        size="sm"
                        bg="blueLight"
                        onPress={() => setIsOpen(true)}
                      >
                        <Text
                          fontSize="xs"
                          color="primary"
                          fontWeight="semibold"
                        >
                          Ubah Oshimen
                        </Text>
                      </Button>
                    </VStack>
                  </HStack>
                ) : isRefetching ? (
                  <Box>
                    <HStack space={2}>
                      <Spinner color="white" size={14} />
                      <Text>Loading Oshimen</Text>
                    </HStack>
                  </Box>
                ) : (
                  <Button
                    px="3"
                    width={120}
                    size="sm"
                    bg="blueLight"
                    onPress={() => setIsOpen(true)}
                  >
                    <Text fontSize="xs" color="primary" fontWeight="semibold">
                      Pilih Oshimen
                    </Text>
                  </Button>
                )}
              </Box>
              <Button
                my="3"
                bg="primary"
                borderRadius="md"
                onPress={handleUpdate}
                isLoading={updateProfileMutation.isPending}
                _pressed={{ bg: "cyan.700" }}
                isLoadingText="Updating Profile"
              >
                <Text color="white" fontWeight="bold">
                  Update Profile
                </Text>
              </Button>
            </VStack>
          </FormControl>

          <Oshimen isOpen={isOpen} setIsOpen={setIsOpen} />
        </ScrollView>
      </CardGradient>
      <Button
        borderColor="red"
        variant="outline"
        borderRadius="md"
        mt="4"
        onPress={() =>
          Linking.openURL("https://www.jkt48showroom.com/remove-account")
        }
      >
        <Text color="red" fontWeight="bold">
          Delete Account
        </Text>
      </Button>
    </>
  );
};
