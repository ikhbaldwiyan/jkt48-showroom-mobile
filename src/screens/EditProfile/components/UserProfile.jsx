import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Text,
  TextArea,
  VStack,
  useToast
} from "native-base";
import React, { useEffect, useState } from "react";
import { IDCard, UserIcon } from "../../../assets/icon";
import CardGradient from "../../../components/atoms/CardGradient";
import useAuthStore from "../../../store/authStore";
import { useUser } from "../../../utils/hooks";
import {
  useShowroomProfile,
  useUpdateProfile,
  useUpdateUserProfile
} from "../../../services/hooks/useProfile";
import { useNavigation } from "@react-navigation/native";

export const UserProfile = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const { user, session, profile, userProfile } = useUser();
  const { data } = useShowroomProfile(user?.user_id);
  const { setProfile } = useAuthStore();

  const [formData, setFormData] = useState({
    name: profile?.name,
    about: ""
  });

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      about: data?.description
    }));
  }, [data]);

  const updateProfileMutation = useUpdateProfile();
  const updateUserProfileMutation = useUpdateUserProfile();

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdate = async () => {
    updateProfileMutation.mutate(
      {
        name: formData.name,
        description: formData.about,
        csrf_token: session.csrf_token,
        cookies_id: session.cookie_login_id,
        residence: 48
      },
      {
        onSuccess: () => {
          setProfile({
            ...profile,
            name: formData?.name,
            avatar: data?.avatar_url
          });

          updateUserProfileMutation.mutate({
            user_id: userProfile?.user_id,
            name: formData.name
          });

          toast.show({
            render: () => (
              <Box bg="green.600" px="2" py="1" rounded="sm" mb={5}>
                <Text color="white">Update profile success</Text>
              </Box>
            ),
            placement: "top"
          });

          navigation.navigate("Profile");
        }
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
            placement: "bottom"
          });
        }
      }
    );
  };

  return (
    <CardGradient>
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
            <Box>
              <HStack space={2} alignItems="center">
                <IDCard size={15} />
                <Box flex={1}>
                  <Text color="gray.300" fontSize="14">
                    About Me
                  </Text>
                </Box>
              </HStack>
              <TextArea
                mt="2"
                bgColor="white"
                variant="filled"
                w="100%"
                fontSize="md"
                name="about"
                placeholder="Tell us about yourself"
                value={formData.about}
                onChangeText={(value) => handleChange("about", value)}
                autoCompleteType={false}
                h={100}
              />
            </Box>
            <Button
              mt="3"
              bg="primary"
              borderRadius="md"
              onPress={handleUpdate}
              isLoading={updateProfileMutation.isPending}
              _pressed={{ bg: "cyan.700" }}
            >
              <Text color="white" fontWeight="bold">
                Update Profile
              </Text>
            </Button>
          </VStack>
        </FormControl>
      </ScrollView>
    </CardGradient>
  );
};
