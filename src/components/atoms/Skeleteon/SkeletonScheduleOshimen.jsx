import React from "react";
import { Skeleton, VStack } from "native-base";

const SkeletonScheduleOshimen = ({ id }) => {
  return (
    <VStack key={id} w="100%" maxW="130" space={4} rounded="md">
      <Skeleton flex="2.5" h="130" rounded="md" startColor="coolGray.100" />
      <Skeleton.Text />
    </VStack>
  );
};
export default SkeletonScheduleOshimen;
