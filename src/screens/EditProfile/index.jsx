import React from "react";
import { Box, HStack, Text, VStack } from "native-base";
import { useProfile } from "../../services/hooks/useProfile";
import { useUser } from "../../utils/hooks";
import AvatarUser from "../Profile/components/AvatarUser";
import EditProfileTabs from "./components/EditProfileTabs";

const EditProfile = () => {
  const { user, profile } = useUser();
  const { data: userProfile } = useProfile(user?.account_id);

  return (
    <Box flex={1} bg="secondary">
      <VStack mt="2" flex={1} space={2}>
        <VStack space={3} alignItems="center">
          <AvatarUser
            profile={profile}
            userProfile={userProfile}
            isLogin={true}
          />
          <HStack space={2} alignItems="center">
            <Text fontWeight="bold" mt="2" fontSize="2xl">
              {profile?.name}
            </Text>
          </HStack>
        </VStack>
        <Box flex={1} pt="0" p="3">
          <EditProfileTabs />
        </Box>
      </VStack>
    </Box>
  );
};

export default EditProfile;
