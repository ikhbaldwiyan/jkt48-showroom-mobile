import React, { useEffect, useState } from "react";
import {
  Divider,
  HStack,
  ScrollView,
  Text,
  View,
  VStack
} from "native-base";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import useProfileStore from "../../../../store/profileStore";
import { parseDescription } from "../../../../utils/helpers";
import {
  BirthdayIcon,
  Dna,
  Homeplace,
  Horoscope,
  Instagram,
  LiveIcon,
  Star,
  Twitter
} from "../../../../assets/icon";
import moment from "moment";

export const Profile = () => {
  const { profile, historyLive } = useProfileStore();
  const [description, setDescription] = useState();

  useEffect(() => {
    const parseDesc = parseDescription(profile.description);
    setDescription(parseDesc);
  }, []);

  console.log(description);
  return (
    <LinearGradient
      colors={["#24A2B7", "#3B82F6"]}
      style={styles.linearGradient}
    >
      <ScrollView mt="2">
        <VStack space={4}>
          <HStack space={2}>
            <LiveIcon />
            <Text fontWeight="semibold">Last Live:</Text>
            <Text>
              {historyLive &&
                moment(historyLive[0].live_info.date.start).format(
                  "dddd, D MMMM hh:mm"
                ) + " WIB"}
            </Text>
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
          {!description?.Twitter.includes("www") && (
            <>
              <Divider />
              <Text>Social Media:</Text>
              <HStack direction="row" space={4}>
                <HStack space={1}>
                  <Twitter />
                  <Text>
                    <Text>{description?.Twitter ?? "-"}</Text>
                  </Text>
                </HStack>
                <HStack space={1}>
                  <Instagram />
                  <Text>
                    <Text>{description?.Instagram ?? "-"}</Text>
                  </Text>
                </HStack>
              </HStack>
            </>
          )}
        </VStack>
      </ScrollView>
    </LinearGradient>
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
