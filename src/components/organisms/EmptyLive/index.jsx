import { Divider, Text, View, VStack } from "native-base";
import React from "react";
import { NoLive } from "../../../assets/icon";

const EmptyLive = () => {
  return (
    <View>
      <VStack mt="5" space={5} justifyContent="center" alignItems="center">
        <NoLive />
        <Text fontWeight="medium">
          Tidak ada member yang sedang live huhu
        </Text>
        <Divider />
      </VStack>
    </View>
  );
};

export default EmptyLive;
