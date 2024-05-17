import React, { useEffect, useState } from "react";
import { Box, Divider, HStack, Image, Pressable, Text } from "native-base";
import moment from "moment";
import "moment/locale/id";
import SkeletonSchedule from "../../atoms/Skeleteon";
import { SCHEDULES } from "../../../services";
import { Calendar, RightArrow, TimesIcon } from "../../../assets/icon";
import { TouchableOpacity } from "react-native";

const Schedule = ({ refreshing, isWeek, navigation }) => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    async function getTheaterList() {
      const theater = isWeek
        ? await SCHEDULES.getScheduleWeek()
        : await SCHEDULES.getScheduleList();
      setSchedules(theater.data);
    }
    getTheaterList();
  }, [refreshing]);

  return (
    <Box>
      <HStack alignItems="center" justifyContent="space-between">
        <Text color="white" fontSize="2xl" mb="1" fontWeight="semibold">
          Jadwal Theater
        </Text>
        {isWeek && (
          <TouchableOpacity
            onPress={() => navigation.replace("Main", { screen: "Theater" })}
          >
            <HStack alignItems="center" space={2}>
              <Text fontSize="md">See All</Text>
              <RightArrow />
            </HStack>
          </TouchableOpacity>
        )}
      </HStack>
      {schedules.length > 0
        ? schedules?.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("ScheduleDetail", { item })}
            >
              <HStack py="3">
                <Box>
                  <Box bg="primary" py="0.8" borderRadius="md" mb="2">
                    <HStack
                      space={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Calendar size={13} />
                      <Text
                        textAlign="center"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        {moment(item.showDate)
                          .locale("id")
                          .format("dddd, DD MMMM")}
                      </Text>
                    </HStack>
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
                    <HStack
                      space={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <TimesIcon size={13} />
                      <Text
                        textAlign="center"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        {item.showTime} WIB
                      </Text>
                    </HStack>
                  </Box>
                </Box>
                <Box ml="3" maxW="200">
                  <Text fontSize="md" fontWeight="bold">
                    {item.setlist.name}
                  </Text>
                  <Text mt="2" color="gray.300">
                    {item.setlist.description.slice(0, 175)}...
                  </Text>
                </Box>
              </HStack>
            </TouchableOpacity>
          ))
        : [...Array(4)].map((_, idx) => <SkeletonSchedule key={idx} />)}
      {isWeek && (
        <Box py="2">
          <Divider />
        </Box>
      )}
    </Box>
  );
};

export default Schedule;
