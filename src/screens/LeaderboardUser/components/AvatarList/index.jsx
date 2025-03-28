import React, { useState } from 'react';
import { Badge, Box, HStack, Image, Pressable, Text, VStack } from 'native-base';
import { useMostWatchIDN } from '../../../../services/hooks/useMostWatchIDN';
import { formatViews } from '../../../../utils/helpers';
import LinearGradient from 'react-native-linear-gradient';
import UserModal from '../../../../components/atoms/UserModal';
import trackAnalytics from "../../../../utils/trackAnalytics";

const AvatarList = ({ item, isYou, platform }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: mostWatch } = useMostWatchIDN(selectedUser?._id);

  const favMember = Array.isArray(mostWatch?.data)
    ? mostWatch.data.filter((item) => item?.member?.name !== "JKT48")
    : [];

  const watchCount = platform === "Showroom"
    ? item.watchShowroomMember
    : platform === "IDN"
      ? item.watchLiveIDN
      : item.watchShowroomMember + item.watchLiveIDN;

  const handlePress = () => {
    trackAnalytics("leaderboard_user_click", {
      name: item.name,
      user_id: item.user_id
    });
    setSelectedUser(item);
  };

  const ListContent = () => (
    <HStack space={4} alignItems="center">
      <RankBadge rank={item.rank} />
      <UserAvatar avatar={item.avatar} />
      <UserInfo userId={item.name} isYou={isYou} />
      <WatchCount count={watchCount} />
    </HStack>
  );

  return (
    <>
      <Pressable onPress={handlePress}>
        {({ isPressed }) => (
          isYou ? (
            <Box mb={2} borderTopLeftRadius="0" borderBottomRightRadius="0" shadow={1} rounded="lg" overflow="hidden" opacity={isPressed ? 0.8 : 1}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={["#004A66", "#009FCB"]}
                style={{
                  padding: 12,
                }}
              >
                <ListContent />
              </LinearGradient>
            </Box>
          ) : (
            <Box mb={2} p={3} shadow={1} rounded="lg" bg="cyan.700" borderTopLeftRadius="0" borderBottomRightRadius="0" opacity={isPressed ? 0.8 : 1}>
              <ListContent />
            </Box>
          )
        )}
      </Pressable>

      <UserModal
        showID
        favMember={favMember[0]?.member?.name ? favMember[0] : favMember[1]}
        userInfo={mostWatch?.user}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </>
  );
};

const RankBadge = ({ rank }) => (
  <Box w={8} alignItems="center">
    {rank <= 3 ? (
      <Box
        w="7"
        h="7"
        bg={
          rank === 1 ? "amber.500" :
            rank === 2 ? "gray.400" :
              "amber.700"
        }
        rounded="full"
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
    <HStack justifyContent={isYou ? "space-between" : "flex-start"}>
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
        <Box bgColor="blueGray.700" rounded="full" px={2} py={1} mr="2">
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