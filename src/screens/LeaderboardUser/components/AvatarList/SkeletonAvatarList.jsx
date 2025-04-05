import React from 'react';
import { Box, HStack, Skeleton } from 'native-base';

const SkeletonAvatarList = () => {
  const ListContent = () => (
    <HStack space={4} mt="1" alignItems="center">
      <SkeletonBadge />
      <SkeletonUserInfo />
    </HStack>
  );

  return (
    <Box mb={2} p={3} shadow={1} h={70} rounded="lg" bg="cyan.700" borderTopLeftRadius="0" borderBottomRightRadius="0">
      <ListContent />
    </Box>
  );
};

const SkeletonBadge = () => (
  <Box w={8} alignItems="center">
    <Skeleton w="8" h="8" rounded="full" />
  </Box>
);



const SkeletonUserInfo = () => (
  <Box flex={1}>
    <Skeleton h="8" w="full" rounded="md" />
  </Box>
);


export default SkeletonAvatarList; 