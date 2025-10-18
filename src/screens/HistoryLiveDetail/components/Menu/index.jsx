import React, { useState } from "react";
import { Box, HStack, Image, Text, View, VStack } from "native-base";
import TabButton from "../../../../components/atoms/TabButton";
import {
  GiftFill,
  ThropyIcon,
  UsersFill,
  UsersIcon
} from "../../../../assets/icon";
import CardGradient from "../../../../components/atoms/CardGradient";
import { FlashList } from "@shopify/flash-list";

const MenuHistoryLive = ({ gifts, isShowroom, podium }) => {
  const [type, setType] = useState("gift");

  console.log(podium);

  return (
    <Box mb="8">
      <HStack space={2.5} py="4">
        <TabButton
          type="gift"
          currentType={type}
          onPress={() => setType("gift")}
          label="Gift"
          customIcon={<GiftFill size="16" color="#24A2B7" />}
        />
        <TabButton
          type="podium"
          currentType={type}
          onPress={() => setType("podium")}
          label="Podium"
          customIcon={<ThropyIcon size="16" color="#24A2B7" />}
        />
        <TabButton
          type="watching"
          currentType={type}
          onPress={() => setType("watching")}
          label="Users"
          customIcon={<UsersFill size="16" color="#24A2B7" />}
        />
      </HStack>

      {type === "gift" ? (
        <Box flex={1}>
          <CardGradient isRounded flex={1}>
            <Box flex={1}>
              <FlashList
                data={gifts}
                renderItem={({ item, index }) => (
                  <Box
                    flex={1}
                    bg="black"
                    borderRadius="xl"
                    p="3"
                    key={index}
                    m="1"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      source={{ uri: item.img }}
                      alt={item.name}
                      size={isShowroom ? "xs" : "sm"}
                      resizeMode="contain"
                      mb="1"
                    />
                    <VStack alignItems="center" space={1.5}>
                      <Text color="white" fontWeight="semibold" fontSize="sm">
                        {item.name}
                      </Text>
                      <Box
                        bg="blue.500"
                        px="1.5"
                        borderRadius="full"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text color="white" fontSize="10" fontWeight="bold">
                          x{item.num}
                        </Text>
                      </Box>
                    </VStack>

                    <HStack alignItems="center" space={2} mt="1">
                      <Text color="gray.300" fontSize="11">
                        {item.point} pts
                      </Text>
                      <Text color="gray.400">•</Text>
                      <HStack alignItems="center" space={1}>
                        <UsersIcon size={12} color="#fff" />
                        <Text color="gray.300" fontSize="11">
                          {item.user_count}
                        </Text>
                      </HStack>
                    </HStack>
                  </Box>
                )}
                estimatedItemSize={100}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                contentContainerStyle={{
                  paddingHorizontal: 4,
                  paddingBottom: 10
                }}
              />
            </Box>
          </CardGradient>
        </Box>
      ) : type === "podium" ? (
        <CardGradient color="dark" isRounded>
          <FlashList
            data={podium}
            renderItem={({ item, index }) => (
              <Box>
                <HStack
                  py="1"
                  alignItems="center"
                  justifyItems="center"
                  px="3"
                  space={6}
                >
                  <Text fontWeight="bold">{index + 1}</Text>
                  <Box p="2">
                    <HStack
                      space={3}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        style={{ width: 45, height: 45 }}
                        rounded={isShowroom ? "none" : "md"}
                        source={{
                          uri: isShowroom
                            ? `https://static.showroom-live.com/image/avatar/${item?.avatar_id}.png`
                            : item?.avatar_url
                        }}
                        alt="avatar"
                      />
                      <View justifyContent="center" alignItems="center">
                        <Text fontWeight="semibold">{item?.name}</Text>
                      </View>
                    </HStack>
                  </Box>
                </HStack>
              </Box>
            )}
            estimatedItemSize={100}
            keyExtractor={(item, index) => index.toString()}
          />
        </CardGradient>
      ) : (
        ""
      )}
    </Box>
  );
};

export default MenuHistoryLive;
