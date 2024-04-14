import React, { useLayoutEffect } from "react";
import { Box, HStack, Image, Text } from "native-base";
import { Calendar, TimesIcon } from "../../assets/icon";
import Layout from "../../components/templates/Layout";
import ScheduleTabs from "../../components/molecules/ScheduleTabs";

const ScheduleDetail = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Cara Meminum Ramune"
    });
  }, []);

  return (
    <Layout>
      <Box mb="3" background="purple.600" p="2" borderRadius={10}>
        <HStack alignItems="center" space={2}>
          <Calendar />
          <Text fontWeight="bold">Kamis, 18 April 2024</Text>
          <TimesIcon />
          <Text fontWeight="bold">19:00</Text>
        </HStack>
      </Box>
      <Image
        width="100%"
        height="215"
        alt="image"
        borderRadius="md"
        borderBottomLeftRadius="0"
        borderBottomRightRadius="0"
        source={{
          uri: "http://res.cloudinary.com/dkkagbzl4/image/upload/v1712416570/members/92a85c640b3323b0d04b7a050aede24e_ejcltf.webp"
        }}
      />
      <Box
        p="3"
        background="teal"
        borderBottomLeftRadius="6"
        borderBottomRightRadius="6"
      >
        <Text fontWeight="semibold">
          Pernahkah kamu meminum Ramune? Meskipun tidak bisa diminum sekaligus,
          tapi Ramune tetap dapat kita rasakan kesegarannya dalam setiap
          tetesnya. Seperti nikmatnya Ramune tersebut, para member JKT48 New Era
          siap untuk memberikanmu keceriaan dan semangat baru, melalui setiap
          lagu yang ada di dalam setlist Cara Meminum Ramune (Ramune no
          Nomikata) ini.
        </Text>
      </Box>
      <Box flex={1} height="610" mt="3" mb="10">
        <ScheduleTabs />
      </Box>
    </Layout>
  );
};

export default ScheduleDetail;
