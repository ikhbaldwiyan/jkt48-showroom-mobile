import React, { useState, useEffect, useCallback } from "react";
import { Box, HStack, Image, Text } from "native-base";
import Layout from "../../components/templates/Layout";
import { SCHEDULES } from "../../services";
import moment from "moment";
import "moment/locale/id";
import SkeletonSchedule from "../../components/atoms/Skeleteon";

const ThetaerList = () => {
  const [schedules, setSchedules] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    async function getTheaterList() {
      const theater = await SCHEDULES.getScheduleList();
      setSchedules(theater.data.reverse());
    }
    getTheaterList();
  }, [refreshing]);

  return schedules.length > 0 ? (
    <Layout isHeader refreshing={refreshing} onRefresh={onRefresh}>
      <Text color="white" fontSize="2xl" fontWeight="semibold">
        Theater Schedule
      </Text>
      <Box py="2">
        {schedules?.map((item, idx) => (
          <HStack py="3" key={idx} alignItems="center">
            <Box>
              <Box bg="primary" borderRadius="md" mb="2">
                <Text textAlign="center" fontSize="xs" fontWeight="semibold">
                  {moment(item.showDate).locale("id").format("dddd, DD MMMM")}
                </Text>
              </Box>
              <Image
                width="100%"
                height="215"
                size="xl"
                borderRadius="md"
                alt="Theater image"
                source={{
                  uri: item.setlist.image
                }}
              />
              <Box bg="teal" borderRadius="md" mt="2">
                <Text textAlign="center" fontSize="xs" fontWeight="semibold">
                  {item.showTime} WIB
                </Text>
              </Box>
            </Box>
            <Box ml="3" maxW="200">
              <Text fontSize="md" fontWeight="bold">
                {item.setlist.name}
              </Text>
              <Text mt="2" color="gray.300">
                {item.setlist.description.slice(0, 170)}...
              </Text>
            </Box>
          </HStack>
        ))}
      </Box>
    </Layout>
  ) : (
    <Layout isHeader>
      <Text color="white" fontSize="2xl" fontWeight="semibold">
        Theater Schedule
      </Text>
      {[...Array(4)].map((_, idx) => (
        <SkeletonSchedule key={idx} />
      ))}
    </Layout>
  );
};

export default ThetaerList;
