import React from "react";
import { HStack, Skeleton, VStack } from "native-base";

const SkeletonSchedule = ({ id, isHome }) => {
  return isHome ? (
    <HStack key={id} w="100%" maxW="400" mt="4" space={8} rounded="md">
      <VStack flex="3" space="2">
        <Skeleton h="7" flex="1" rounded="md" />
        <Skeleton h="230" flex="1" rounded="md" />
        <Skeleton.Text />
      </VStack>
    </HStack>
  ) : (
    <HStack key={id} w="100%" maxW="400" mt="2" space={3} rounded="md">
      <Skeleton flex="2.5" h="130" rounded="md" startColor="coolGray.100" />
      <Skeleton flex="2.5" h="130" rounded="md" startColor="coolGray.100" />
    </HStack>
  );
};

export default SkeletonSchedule;
