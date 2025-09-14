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
    <HStack key={id} w="100%" maxW="400" mt="4" space={8} rounded="md">
      <Skeleton flex="2.5" h="130" rounded="md" startColor="coolGray.100" />
      <VStack flex="3" space="4">
        <Skeleton h="2" flex="1" rounded="md" />
        <Skeleton.Text />
        <HStack space="2" alignItems="center">
          <Skeleton h="3" flex="3" rounded="full" />
        </HStack>
      </VStack>
    </HStack>
  );
};

export default SkeletonSchedule;
