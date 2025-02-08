import React, { useState } from "react";
import {
  Button,
  DeleteIcon,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { Linking, TouchableOpacity } from "react-native";
import { AndroidIcon, Donate, GithubIcon } from "../../../../assets/icon";
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
        <VStack space={4}>
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
              <GithubIcon size={22} />
              <Text fontSize={14}>GitHub Source Code</Text>
            </HStack>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://saweria.co/Inzoid"),
                trackAnalytics("github_link_click");
            }}
          >
            <HStack space={2} alignItems="center">
              <Donate size={22} />
              <Text fontSize={14}>Support Project</Text>
            </HStack>
          </TouchableOpacity>
          <HStack space={2} alignItems="center">
            <AndroidIcon />
            <Text fontSize={14}>
              APK Version <Text fontWeight="semibold">{APK_VERSION}</Text>
            </Text>
          </HStack>
          <VStack space={2}>
            <Text fontSize={14} fontWeight="semibold">
              Delete Account:
            </Text>
            <Button
              onPress={handleRemoveAccount}
              variant="solid"
              background="red"
              borderRadius="10"
            >
              <TouchableOpacity
                onPress={handleRemoveAccount}
                activeOpacity={0.6}
              >
                <HStack space={1.5} alignItems="center">
                  <DeleteIcon size="4" color="white" />
                  <Text fontWeight="semibold">Delete showroom account</Text>
                </HStack>
              </TouchableOpacity>
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </CardGradient>
  );
};
