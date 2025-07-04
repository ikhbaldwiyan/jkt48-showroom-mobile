import { Box, Divider, Spinner, Text, View, VStack } from "native-base";
import React from "react";
import { NoLive } from "../../../assets/icon";

const EmptyLive = ({ isLoading, type }) => {
  return (
    <>
      {isLoading ? (
        <Box pt="12">
          <Spinner size="lg" color="white" />
        </Box>
      ) : (
        <VStack mt="5" space={5} justifyContent="center" alignItems="center">
          <NoLive />
          <Text>Tidak ada member yang sedang live {type} huhu</Text>
        </VStack>
      )}
    </>
  );
};

export default EmptyLive;
