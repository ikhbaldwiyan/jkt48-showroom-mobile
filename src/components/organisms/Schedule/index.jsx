import React, { useEffect, useState } from 'react'
import { Box, Divider, HStack, Image, Pressable, Text } from "native-base"
import moment from "moment";
import "moment/locale/id";
import SkeletonSchedule from "../../atoms/Skeleteon";
import { SCHEDULES } from "../../../services";

const Schedule = ({ refreshing, isWeek, navigation }) => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    async function getTheaterList() {
      const theater = isWeek ? await SCHEDULES.getScheduleWeek() : await SCHEDULES.getScheduleList();
      setSchedules(theater.data.reverse());
    }
    getTheaterList();
  }, [refreshing]);

  return (
    <Box>
      <HStack alignItems="center" justifyContent="space-between">
        <Text color="white" fontSize="2xl" mb="2" fontWeight="semibold">
          Theater Schedule
        </Text>
        {isWeek && (
          <Pressable onPress={() => navigation.replace('Main', { screen: 'Theater' })}>
            <Text fontSize="md">See More</Text>
          </Pressable>
        )}
      </HStack>
      {schedules.length > 0 ? (
        schedules?.map((item, idx) => (
          <HStack py="3" key={idx} alignItems="center">
            <Box>
              <Box bg="primary" borderRadius="md" mb="1">
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
        ))
      ) : (
        [...Array(4)].map((_, idx) => (
          <SkeletonSchedule key={idx} />
        ))
      )}
      {isWeek && (
        <Box py="2">
          <Divider />
        </Box>
      )}
    </Box>
  )
}

export default Schedule