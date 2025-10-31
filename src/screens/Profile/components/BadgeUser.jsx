import React from "react";
import { Donate, ThropyIcon } from "../../../assets/icon";
import { Button, HStack, Text } from "native-base";

const BadgeUser = ({ userProfile }) => {
  const Donator = () => (
    <Button py="1.5" flex={1}  borderRadius="2xl" bg="#FFA500" mb="2">
      <HStack justifyContent="center" alignItems="center" space={2.5}>
        <Donate size={20} />
        <Text fontSize="14" fontWeight="semibold" color="white">
          Donator
        </Text>
      </HStack>
    </Button>
  );

  const TopLeaderboard = () => (
    <Button  py="1.5" flex={1} borderRadius="2xl" bg="blueLight" mb="2">
      <HStack justifyContent="center" alignItems="center" space={2.5}>
        <ThropyIcon color="#24A2B7" size={20} />
        <Text fontSize="14" fontWeight="semibold" color="primary">
          Top Leaderboard
        </Text>
      </HStack>
    </Button>
  );

  if (userProfile?.is_donator && userProfile?.top_leaderboard) {
    return (
      <HStack space={2.5}>
        <Donator />
        <TopLeaderboard />
      </HStack>
    );
  }

  if (userProfile?.is_donator) {
    return <Donator />;
  }

  if (userProfile?.top_leaderboard) {
    return <TopLeaderboard />;
  }
};

export default BadgeUser;
