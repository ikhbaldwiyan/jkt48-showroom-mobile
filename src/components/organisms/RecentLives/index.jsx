import { Box, Divider, HStack, Image, Text, VStack } from "native-base";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Calendar,
  GiftFill,
  History,
  TimesFill,
  UsersFill
} from "../../../assets/icon";

const RecentLives = () => {
  const data = [
    {
      id: 1,
      imageUrl:
        "https://res.cloudinary.com/haymzm4wp/image/upload/v1709325731/wkw0lyltywbokl7twq9d.jpg",
      date: "Minggu, 14 April",
      views: "230.082 Views",
      duration: "2 hours",
      gold: "130.204 Gold",
      name: "Zee JKT48",
      timeAgo: "1 Hour ago"
    },
    {
      id: 2,
      imageUrl:
        "https://res.cloudinary.com/haymzm4wp/image/upload/v1709325993/gi5zzp4imkzl3bip8yay.jpg",
      date: "Kamis, 11 April",
      views: "23.082 Views",
      duration: "35 minutes",
      gold: "30.204 Gold",
      name: "Jessi JKT48",
      timeAgo: "46 minutes ago"
    }
  ];

  return (
    <View>
      <Text fontSize="2xl" mb="3" fontWeight="semibold">
        Recent Lives
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          <Box w="260" mr="3" key={item.id}>
            <LinearGradient
              colors={["#24A2B7", "#4724B7"]}
              style={styles.linearGradient} 
            >
              <Box>
                <HStack>
                  <Image
                    source={{ uri: item.imageUrl }}
                    size="md"
                    alt="image"
                    w="100"
                    h="auto"
                    borderTopLeftRadius={6}
                    borderBottomLeftRadius={6}
                  />
                  <Box>
                    <VStack space={2} p="3">
                      <HStack alignItems="center" space={2}>
                        <Calendar />
                        <Text fontWeight="semibold">{item.date}</Text>
                      </HStack>
                      <HStack alignItems="center" space={2}>
                        <UsersFill />
                        <Text fontWeight="semibold">{item.views}</Text>
                      </HStack>
                      <HStack alignItems="center" space={2}>
                        <TimesFill />
                        <Text fontWeight="semibold">{item.duration}</Text>
                      </HStack>
                      <HStack alignItems="center" space={2}>
                        <GiftFill />
                        <Text fontWeight="semibold">{item.gold}</Text>
                      </HStack>
                    </VStack>
                  </Box>
                </HStack>
              </Box>
            </LinearGradient>
            <HStack space={2}>
              <Box
                mt="3"
                py="1"
                borderRadius="md"
                px="2"
                w="48%"
                background="teal"
              >
                <Text fontWeight="bold">{item.name}</Text>
              </Box>
              <Box
                mt="3"
                py="1"
                borderRadius="md"
                px="1"
                w="49%"
                background="red"
              >
                <HStack>
                  <History />
                  <Text ml="0.5" fontSize="14" fontWeight="bold">
                    {item.timeAgo}
                  </Text>
                </HStack>
              </Box>
            </HStack>
          </Box>
        ))}
      </ScrollView>
      <Divider my="4" />
    </View>
  );
};

export default RecentLives;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 6
  }
});
