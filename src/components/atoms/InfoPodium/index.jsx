import React from "react";
import { Box, Divider, HStack, InfoIcon, Popover, Text } from "native-base";
import { TouchableOpacity } from "react-native";

const InfoPodium = () => {
  return (
    <Popover
      trigger={(triggerProps) => (
        <TouchableOpacity {...triggerProps} activeOpacity={0.7}>
          <InfoIcon size="5" color="white" />
        </TouchableOpacity>
      )}
    >
      <Popover.Content mx="5" shadow="4" rounded="lg" bg="white">
        <Popover.Body>
          <Text mt="1" color="black" fontWeight="semibold">
            Apa itu Podium?
          </Text>
          <Popover.CloseButton mb="2" />
          <Divider my="2" mt="3" />
          <Text color="gray.700">
            Podium adalah daftar user yang sedang menonton di apk{" "}
            <Text fontWeight="semibold">JKT48 Showroom Fanmade</Text>, Jika kamu
            sering menonton dan masuk ke Top 10 Leaderboard bulanan akan
            mendapatkan badge{" "}
            <Text fontWeight="semibold">"Top Leaderboard"</Text> yang akan di
            tampilkan di nama dan detail profil kamu.
          </Text>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
};

export default InfoPodium;
