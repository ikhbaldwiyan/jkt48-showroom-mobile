import React, { useEffect, useState } from "react";
import { Divider, HStack, ScrollView, Text, VStack } from "native-base";
import { Linking, TouchableOpacity } from "react-native";
import useProfileStore from "../../../../store/profileStore";
import { parseDescription } from "../../../../utils/helpers";
import {
  BirthdayIcon,
  Dna,
  Homeplace,
  Horoscope,
  Instagram,
  Star,
  Twitter,
} from "../../../../assets/icon";
import CardGradient from "../../../atoms/CardGradient";
import { useMemberShowroomProfile } from "../../../../services/hooks/useMembers";

export const Profile = () => {
  const { profile } = useProfileStore();
  const [description, setDescription] = useState();
  const { data } = useMemberShowroomProfile(profile?.room_id);

  useEffect(() => {
    const parseDesc = parseDescription(profile?.description);
    setDescription(parseDesc);
  }, []);

  return (
    <CardGradient>
      <ScrollView mt="2">
        {profile?.room_url_key !== "officialJKT48" ? (
          <VStack space={3}>
            <HStack space={2} flexWrap="wrap">
              <Dna />
              <Text fontWeight="semibold">Jikoshoukai</Text>
              <Text mt="1">{data?.profile?.jiko ?? ""}</Text>
            </HStack>
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
              <Text fontWeight="semibold">Zodiac :</Text>
              <Text>{description?.["Zodiac signs"] ?? "-"}</Text>
            </HStack>
            <HStack space={2} flexWrap="wrap">
              <Star />
              <Text fontWeight="semibold">Hobby:</Text>
              <Text flexShrink={1}>{description?.Hobby ?? "-"}</Text>
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
