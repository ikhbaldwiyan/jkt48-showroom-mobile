import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box, Button, HStack, Image, Pressable, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Linking, TouchableOpacity } from "react-native";
import { ROOMS } from "../../services";
import Layout from "../../components/templates/Layout";
import { formatViews, getIDNLiveTime } from "../../utils/helpers";
import { UserIcon } from "../../assets/icon";
import { useRefresh } from "../../utils/hooks/useRefresh";
import { FlashList } from "@shopify/flash-list";

const IDNLives = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const { navigate } = useNavigation();
  const { refreshing, onRefresh } = useRefresh();

  useEffect(() => {
    async function getIDNLive() {
      try {
        const response = await ROOMS.getIDNLIveRoom();
        setRooms(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getIDNLive();
  }, [refreshing]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "IDN Live List"
    });
  }, []);

  const renderItem = ({ item }) => (
    <Box mb="6">
      <Pressable
        onPress={() => {
          navigate("IDNStream", { item });
        }}
      >
        <HStack space={2}>
          <Box px="3" width="70%" mb="3" bg="cyan.700" borderRadius="8" p="2">
            <HStack
              space={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="16">{item?.title}</Text>
              <Text fontSize="15" fontWeight="medium">
                {getIDNLiveTime(item.live_at)}
              </Text>
            </HStack>
          </Box>
          <Box width="27%">
            <HStack
              p="2"
              bg="teal"
              justifyContent="center"
              alignItems="center"
              borderRadius={8}
              space="2"
            >
              <UserIcon size={16} />
              <Text fontSize="16" fontWeight="semibold">
                {formatViews(item?.view_count)}
              </Text>
            </HStack>
          </Box>
        </HStack>
        <Box>
          <Image
            size="xl"
            borderRadius={8}
            source={{ uri: item.image ?? item.user.avatar }}
            alt={item?.user?.name}
            height={350}
            width="100%"
            resizeMode="cover"
            opacity={0.9}
          />
          <Box mt="2" right="2" position="absolute" shadow="3">
            <Image
              width="140"
              height="42"
              alt="IDN Logo"
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/IDN_Live.svg/2560px-IDN_Live.svg.png"
              }}
            />
          </Box>
          {/* <Box mt="2" left="2" position="absolute" shadow="3">
            <Text fontWeight="semibold" fontSize="md">
              {getIDNLiveTime(item.live_at)}
            </Text>
          </Box> */}
        </Box>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigate("IDNStream", { item });
          }}
        >
          <HStack mt="3" alignItems="center" justifyContent="space-between">
            <Text
              fontSize="20"
              mr="2"
              fontWeight="semibold"
              color="white"
              py="1"
            >
              {item?.user?.name}
            </Text>
            <Button
              onPress={() =>
                Linking.openURL(
                  `https://www.idn.app/${item.user.username}/live/${item.slug}`
                )
              }
              borderRadius="md"
              size="sm"
              bg="red"
              variant="solid"
            >
              <Text>Watch in IDN App</Text>
            </Button>
          </HStack>
        </TouchableOpacity>
      </Pressable>
    </Box>
  );

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      {rooms.length > 0 && (
        <Box mb="4">
          <FlashList
            data={rooms}
            renderItem={renderItem}
            keyExtractor={(item, idx) => idx.toString()}
          />
        </Box>
      )}
    </Layout>
  );
};

export default IDNLives;
