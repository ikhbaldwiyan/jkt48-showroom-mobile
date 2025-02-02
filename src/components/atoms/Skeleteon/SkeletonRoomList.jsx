import { Box, HStack, Skeleton, VStack } from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";

const SkeletonRoomList = () => {
  const skeletonItems = Array.from({ length: 4 });
  const { width } = useWindowDimensions();
  const columnCount = width > 600 ? 3 : 2;

  return (
    <HStack space={4}>
      {Array.from({ length: columnCount }).map((_, colIdx) => (
        <VStack key={colIdx} space={4}>
          {skeletonItems.map((_, idx) => (
            <Box key={idx}>
              <Skeleton
                borderRadius={8}
                width={width / columnCount - 20}
                height={(width / columnCount - 16) * 0.85}
              />
            </Box>
          ))}
        </VStack>
      ))}
    </HStack>
  );
};

export default SkeletonRoomList;
