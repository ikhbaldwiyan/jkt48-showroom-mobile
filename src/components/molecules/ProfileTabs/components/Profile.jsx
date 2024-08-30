import React, { useEffect, useState } from "react";
import { Divider, HStack, ScrollView, Text, VStack } from "native-base";
import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import useProfileStore from "../../../../store/profileStore";
import { parseDescription } from "../../../../utils/helpers";
import {
  BirthdayIcon,
  Dna,
  Homeplace,
  Horoscope,
  Instagram,
  Star,
  Twitter
} from "../../../../assets/icon";
import CardGradient from "../../../atoms/CardGradient";

export const Profile = () => {
  const { profile } = useProfileStore();
  const [description, setDescription] = useState();

  useEffect(() => {
    const parseDesc = parseDescription(profile?.description);
    setDescription(parseDesc);
  }, []);

  return (
    <CardGradient>
      <ScrollView mt="2">
        {profile?.room_url_key !== "officialJKT48" ? (
          <VStack space={4}>
            <HStack space={2}>
              <BirthdayIcon />
              <Text fontWeight="semibold">Birthday:</Text>
              <Text>{description?.Birthday ?? "-"}</Text>
            </HStack>
            <HStack space={2}>
              <Homeplace />
              <Text fontWeight="semibold">Birthplace:</Text>
              <Text>{description?.Birthplace ?? "-"}</Text>
            </HStack>
            <HStack space={2}>
              <Horoscope />
              <Text fontWeight="semibold">Horoscope :</Text>
              <Text>{description?.["Zodiac signs"] ?? "-"}</Text>
            </HStack>
            <HStack space={2}>
              <Dna />
              <Text fontWeight="semibold">Blood type :</Text>
              <Text>{description?.["Blood type"] ?? "-"}</Text>
            </HStack>
            <HStack space={2}>
              <Star />
              <Text fontWeight="semibold">Hobby:</Text>
              <Text>{description?.Hobby ?? "-"}</Text>
            </HStack>
            {!description?.Twitter?.includes("www") &&
              !description?.Instagram?.includes("www") && (
                <>
                  <Divider />
                  <Text>Social Media:</Text>
                  <HStack direction="row" space={4}>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          `https://x.com/${description?.Twitter.replace(
                            " ",
                            ""
                          )}`
                        )
                      }
                    >
                      <HStack space={1}>
                        <Twitter />
                        <Text>{description?.Twitter ?? "-"}</Text>
                      </HStack>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          `https://www.instagram.com/${description?.Instagram.replace(
                            " ",
                            ""
                          )}`
                        )
                      }
                    >
                      <HStack space={1}>
                        <Instagram />
                        <Text>
                          <Text>{description?.Instagram ?? "-"}</Text>
                        </Text>
                      </HStack>
                    </TouchableOpacity>
                  </HStack>
                </>
              )}
          </VStack>
        ) : (
          <Text>{profile?.description}</Text>
        )}
      </ScrollView>
    </CardGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  }
});
