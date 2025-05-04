import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Pressable,
  Text,
  VStack
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Linking, TouchableOpacity } from "react-native";
import { ROOMS } from "../../services";
import Layout from "../../components/templates/Layout";
import { formatName, formatViews, getIDNLiveTime } from "../../utils/helpers";
import {
  IDNLiveIcon,
  LiveIcon,
  RefreshIcon,
  UserIcon
} from "../../assets/icon";
import { useRefresh } from "../../utils/hooks/useRefresh";
import { FlashList } from "@shopify/flash-list";
import { EmptyLive, HistoryLive, TopMember } from "../../components/organisms";
import Views from "../../components/atoms/Views";
import CardGradient from "../../components/atoms/CardGradient";

const IDNLives = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const { navigate } = useNavigation();
  const { refreshing, onRefresh } = useRefresh();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getIDNLive() {
      setIsLoading(true);
      try {
        const response = await ROOMS.getIDNLIveRoom();
        setRooms(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    getIDNLive();
  }, [refreshing]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "IDN Live",
      headerRight: () =>
        rooms.length > 0 ? (
          <HStack space={2} justifyContent="center" alignItems="center">
            <LiveIcon size={18} />
            <Text>{rooms?.length} Member Live</Text>
          </HStack>
        ) : (
          <TouchableOpacity activeOpacity={0.7} onPress={onRefresh}>
            <HStack space={2} justifyContent="center" alignItems="center">
              <RefreshIcon />
              <Text>Refresh</Text>
            </HStack>
          </TouchableOpacity>
        )
    });
  }, [rooms]);

  const renderItem = ({ item, index }) => (
    <Box flex={1} mb="3" mr={index % 2 === 0 ? "3" : 0}>
      <Pressable
        onPress={() => {
          navigate("IDNStream", { item });
        }}
      >
        <Box
          px="1"
          top="2"
          left="2"
          zIndex="99"
          position="absolute"
          bg="rgba(0,0,0,0.3)"
          borderRadius="sm"
          shadow={6}
        >
          <Text fontSize="12" fontWeight="semibold" color="muted.200">
            {getIDNLiveTime(item.live_at)}
          </Text>
        </Box>

        <Box
          position="absolute"
          top="2"
          right="2"
          zIndex="99"
          bg="rgba(0,0,0,0.2)"
          px="1"
          borderRadius="sm"
          shadow={4}
        >
          <IDNLiveIcon />
        </Box>

        <Box borderRadius={8} overflow="hidden" shadow={9} bg="coolGray.900">
          <Image
            size="xl"
            shadow={9}
            bg="coolGray.900"
            borderRadius={8}
            borderBottomLeftRadius="0"
            borderBottomRightRadius="0"
            source={{ uri: item.image ?? item.user.avatar }}
            alt={item?.user?.name}
            height={200}
            width="100%"
            resizeMode="cover"
            opacity={0.9}
          />
        </Box>

        <CardGradient color="lightDark">
          <Text fontWeight="medium" fontSize={13} isTruncated>
            {item?.title.length > 19
              ? item?.title?.slice(0, 18) + "..."
              : item?.title}
          </Text>
        </CardGradient>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigate("IDNStream", { item });
          }}
        >
          <HStack mt="2" alignItems="center">
            <Text
              fontSize="16"
              mr="2"
              fontWeight="semibold"
              color="white"
              py="1"
              numberOfLines={1}
            >
              {formatName(item?.user?.name, true)}
            </Text>
            <Views number={item?.view_count} />
          </HStack>
        </TouchableOpacity>
      </Pressable>
    </Box>
  );

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <VStack space={2}>
        {rooms.length > 0 ? (
          <>
            <FlashList
              numColumns={2}
              data={rooms}
              renderItem={renderItem}
              keyExtractor={(item, idx) => idx.toString()}
            />
            <Divider mb="1" />
          </>
        ) : (
          <EmptyLive isLoading={isLoading} />
        )}
        <TopMember liveType="idn" />
        <HistoryLive liveType="idn" />
      </VStack>
    </Layout>
  );
};

export default IDNLives;
