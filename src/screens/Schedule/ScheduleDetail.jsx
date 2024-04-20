import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box, HStack, Image, Text } from "native-base";
import moment from "moment";
import { useRoute } from "@react-navigation/native";
import { SCHEDULES } from "../../services";
import { BirthdayIcon, Calendar, TimesIcon } from "../../assets/icon";
import Layout from "../../components/templates/Layout";
import ScheduleTabs from "../../components/molecules/ScheduleTabs";

const ScheduleDetail = ({ navigation }) => {
  const route = useRoute();
  const { params } = route;
  const [theater, setTheater] = useState();

  useEffect(() => {
    async function getTheaterDetail() {
      try {
        const response = await SCHEDULES.getScheduleDetail(params.item._id);
        setTheater(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTheaterDetail();
  }, [params]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params?.item?.setlist?.name
    });
  }, []);

  return (
    <Layout>
      {theater?.isBirthdayShow && (
        <Box mb="3" background="teal" p="2" borderRadius="lg">
          <HStack alignItems="center" space={2}>
            <BirthdayIcon />
            <Text fontWeight="bold">
              Birthday {theater?.birthdayMember?.name}
            </Text>
          </HStack>
        </Box>
      )}
      {theater?.isGraduationShow && (
        <Box mb="3" background="teal" p="2" borderRadius="lg">
          <HStack alignItems="center" space={2}>
            <BirthdayIcon />
            <Text fontWeight="bold">
              Birthday {theater?.graduateMember?.name}
            </Text>
          </HStack>
        </Box>
      )}
      <Box mb="3" background="purple.600" p="2" borderRadius="lg">
        <HStack alignItems="center" space={2}>
          <Calendar size={20} />
          <Text fontWeight="bold">
            {moment(theater?.showDate).format("DD MMM YYYY")}
          </Text>
          <TimesIcon />
          <Text fontWeight="bold">
            {theater?.showTime ? theater?.showTime + " WIB" : "00:00"}
          </Text>
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
          uri: theater?.setlist?.image
        }}
      />
      <Box
        p="3"
        background="teal"
        borderBottomLeftRadius="6"
        borderBottomRightRadius="6"
      >
        <Text fontWeight="semibold">{theater?.setlist?.description}</Text>
      </Box>
      <Box flex={1} height="610" mt="3" mb="10">
        <ScheduleTabs />
      </Box>
    </Layout>
  );
};

export default ScheduleDetail;
