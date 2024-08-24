import React, { useState } from "react";
import { Button, HStack, ScrollView, Text, VStack } from "native-base";
import { Linking, TouchableOpacity } from "react-native";
import { AndroidIcon, GithubIcon } from "../../../../assets/icon";
import CardGradient from "../../../atoms/CardGradient";
import ChangeLog from "./ChangeLog";
import { APK_VERSION } from "@env";
import trackAnalytics from "../../../../utils/trackAnalytics";

export const Settings = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleRemoveAccount = () => {
    Linking.openURL("https://www.jkt48showroom.com/remove-account");
  };

  return (
    <CardGradient halfCard>
      <ScrollView mt="2">
        <VStack space={3}>
          <HStack space={2} alignItems="center">
            <AndroidIcon />
            <Text fontSize={14}>
              APK Version <Text fontWeight="semibold">{APK_VERSION}</Text>
            </Text>
          </HStack>
          <ChangeLog modal={modal} toggleModal={toggleModal} />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://github.com/ikhbaldwiyan/jkt48-showroom-mobile"
              ),
                trackAnalytics("github_link_click");
            }}
          >
            <HStack space={2} alignItems="center">
              <GithubIcon size={24} />
              <Text fontSize={14}>GitHub Source Code</Text>
            </HStack>
          </TouchableOpacity>
          <HStack space={2} alignItems="center">
            <Text fontSize={14} fontWeight="semibold">
              Delete Account:
            </Text>
          </HStack>
          <Button
            onPress={handleRemoveAccount}
            variant="solid"
            size="sm"
            background="red"
          >
            <TouchableOpacity onPress={handleRemoveAccount} activeOpacity={0.6}>
              <Text>Delete showroom account</Text>
            </TouchableOpacity>
          </Button>
        </VStack>
      </ScrollView>
    </CardGradient>
  );
};
