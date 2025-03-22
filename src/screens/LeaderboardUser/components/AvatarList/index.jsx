import React from 'react';
import { Box, HStack, VStack, Text, Badge, Image } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { formatViews } from '../../../../utils/helpers';

const AvatarList = ({ item, isYou, platform }) => {
  const watchCount = platform === "Showroom"
    ? item.watchShowroomMember
    : platform === "IDN"
      ? item.watchLiveIDN
      : item.watchShowroomMember + item.watchLiveIDN;

  if (isYou) {
    return (
      <Box mb={2} shadow={1} rounded="lg" overflow="hidden" borderTopLeftRadius={0} borderBottomRightRadius={0}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={["#004A66", "#009FCB"]}
          style={{
            padding: 12,
          }}
        >
          <HStack space={4} alignItems="center">
            <RankBadge rank={item.rank} />
            <UserAvatar avatar={item.avatar} />
            <UserInfo userId={item.user_id} isYou={isYou} />
            <WatchCount count={watchCount} />
          </HStack>
        </LinearGradient>
      </Box>
    );
  }

  return (
    <Box mb={2} p={3} shadow={1} rounded="lg" bg="cyan.700" borderTopLeftRadius={0} borderBottomRightRadius={0}>
      <HStack space={4} alignItems="center">
        <RankBadge rank={item.rank} />
        <UserAvatar avatar={item.avatar} />
        <UserInfo userId={item.user_id} isYou={false} />
        <WatchCount count={watchCount} />
      </HStack>
    </Box>
  );
};

const RankBadge = ({ rank }) => (
  <Box w={8} alignItems="center">
    {rank <= 3 ? (
      <Box
        bg={
          rank === 1 ? "amber.500" :
            rank === 2 ? "gray.400" :
              "amber.700"
        }
        rounded="full"
        w="7"
        h="7"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="md" fontWeight="bold" color="white">
          {rank}
        </Text>
      </Box>
    ) : (
      <Text fontSize={rank > 1000 ? "12" : "14"} fontWeight="bold" color="white">
        {formatViews(rank)}
      </Text>
    )}
  </Box>
);

const UserAvatar = ({ avatar }) => (
  <Image
    width={50}
    height={50}
    alt="avatar"
    source={avatar ? { uri: avatar } : require("../../../../assets/image/ava.png")}
  />
);

const UserInfo = ({ userId, isYou }) => (
  <VStack flex={1}>
    <HStack justifyContent={isYou ? "space-around" : "flex-start"}>
      <Text
        color="blueLight"
        fontSize="14"
        fontWeight="medium"
        isTruncated
      >
        {userId.length > 13
          ? `${userId.slice(0, 13)}...`
          : userId}
      </Text>
      {isYou && userId.length < 9 && (
        <Box bgColor="blueGray.700" rounded="full" px={2} py={1}>
          <Text color="gray.200" fontSize="11" fontWeight="medium">You</Text>
        </Box>
      )}
    </HStack>
  </VStack>
);

const WatchCount = ({ count }) => (
  <HStack space={2} alignItems="center">
    <VStack alignItems="center">
      <Badge colorScheme="info" rounded="full" width={"auto"}>
        <Text fontWeight="bold" color="primary">
          {formatViews(count)}x
        </Text>
      </Badge>
    </VStack>
  </HStack>
);

export default AvatarList; 