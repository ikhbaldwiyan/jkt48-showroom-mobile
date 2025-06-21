import React from "react";
import Layout from "../../../components/templates/Layout";
import { Box, VStack, Text, Button, HStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Info, LoginIcon } from "../../../assets/icon";
import AvatarUser from "./AvatarUser";

const NoLogin = ({
  navigation,
  handleAbout,
  userProfile,
  profile,
  isLogin
}) => {
  return (
    <Layout>
      <Box py="45" justifyContent="center" alignItems="center">
        <VStack space={5} alignItems="center">
          <AvatarUser
            profile={profile}
            userProfile={userProfile}
            isLogin={isLogin}
          />
          <Text>Silakan login untuk mengakses menu profile</Text>
          <Button
            onPress={() => navigation.replace("Login")}
            borderRadius="lg"
            variant="filled"
            bg="primary"
          >
            <TouchableOpacity onPress={() => navigation.replace("Login")}>
              <HStack alignItems="center" space={1}>
                <LoginIcon size={24} />
                <Text color="white" fontWeight="bold" mr="2" isTruncated>
                  Login Disini
                </Text>
              </HStack>
            </TouchableOpacity>
          </Button>
          <Button
            mt="1"
            variant="ghost"
            borderRadius="lg"
            onPress={handleAbout}
          >
            <TouchableOpacity onPress={handleAbout}>
              <HStack alignItems="center" space={1}>
                <Info color="white" />
                <Text fontWeight="semibold">About Application</Text>
              </HStack>
            </TouchableOpacity>
          </Button>
        </VStack>
      </Box>
    </Layout>
  );
};

export default NoLogin;
