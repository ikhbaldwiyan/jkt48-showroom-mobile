import { Box, Divider, Spinner, Text, View, VStack } from "native-base";
import React from "react";
import { NoLive } from "../../../assets/icon";

const EmptyLive = ({ isLoading }) => {
  return (
    <View>
      {isLoading ? (
        <Box pt="8">
          <Spinner size="lg" color="white" />
          <Divider mt="12" />
        </Box>
      ) : (
        <VStack mt="5" space={5} justifyContent="center" alignItems="center">
          <NoLive />
          <Text>Tidak ada member yang sedang live huhu</Text>
          <Divider />
        </VStack>
      )}
    </View>
  );
};

export default EmptyLive;
