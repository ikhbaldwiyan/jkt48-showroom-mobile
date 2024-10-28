import React, { useEffect, useState } from "react";
import { Box, HStack, Image, Text, Button, Spinner } from "native-base";
import moment from "moment";
import "moment/locale/id";
import SkeletonSchedule from "../../atoms/Skeleteon";
import { SCHEDULES } from "../../../services";
import {
  BirthdayIcon,
  Calendar,
  GraduateIcon,
  LoadingIcon,
  RightArrow
} from "../../../assets/icon";
import { TouchableOpacity } from "react-native";

const Schedule = ({ refreshing, isWeek, navigation }) => {
  const [schedules, setSchedules] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(1);
    fetchSchedules(1, true);
  }, [refreshing]);

  const fetchSchedules = async (pageNum, reset = false) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    const theater = isWeek
      ? await SCHEDULES.getScheduleWeek()
      : await SCHEDULES.getScheduleList(pageNum);

    const { data } = theater;

    if (isWeek) {
      setSchedules(data);
    } else {
      setSchedules((prev) => (reset ? data?.data : [...prev, ...data?.data]));
    }

    if (data?.paginator?.currentPage >= data?.paginator?.totalPage) {
      setHasMore(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (page > 1) {
      fetchSchedules(page);
    }
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      setPage(page + 1);
    }
  };

  return (
    <Box>
      <HStack alignItems="center" justifyContent="space-between">
        {isWeek && (
          <>
            <Text color="white" fontSize="2xl" mb="1" fontWeight="semibold">
              Jadwal Theater
            </Text>
            <TouchableOpacity
              onPress={() => navigation.replace("Main", { screen: "Theater" })}
            >
              <HStack alignItems="center" space={2}>
                <Text fontSize="md">See All</Text>
                <RightArrow />
              </HStack>
            </TouchableOpacity>
          </>
        )}
      </HStack>
      {schedules.length > 0
        ? schedules?.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("ScheduleDetail", { item })}
            >
              <HStack space={3} py="3">
                <Box w="40%">
                  <Box bg="primary" py="1" borderRadius="md" mb="2">
                    <HStack
                      space={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Calendar size={12} />
                      <Text
                        textAlign="center"
                        fontSize="12"
                        fontWeight="medium"
                      >
                        {moment(item.showDate)
                          .locale("id")
                          .format("ddd, DD MMM")}
                      </Text>
                      <Text
                        textAlign="center"
                        fontSize="11.5"
                        fontWeight="medium"
                      >
                        - {item.showTime}
                      </Text>
                    </HStack>
                  </Box>
                  <Box position="relative">
                    <Image
                      height="235"
                      size="xl"
                      borderRadius="md"
                      alt="Theater"
                      source={{
                        uri:
                          item.setlist.image ??
                          "https://static.showroom-live.com/image/room/cover/73f495d564945090f4af7338a42ce09ffa12d35fbfa8ce35c856220bcf96c5f3_m.png?v=1715261567"
                      }}
                      style={{ width: "100%" }}
                    />
                    {item.isGraduationShow && (
                      <Box
                        position="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                        bg="teal"
                        px="2"
                        borderBottomRadius="md"
                      >
                        <HStack
                          justifyContent="center"
                          alignItems="center"
                          space={2}
                        >
                          <GraduateIcon size={12} />
                          <Text
                            color="white"
                            fontSize="12"
                            fontWeight="bold"
                            isTruncated
                          >
                            {item?.graduateMember?.stage_name}
                          </Text>
                        </HStack>
                      </Box>
                    )}
                    {item.isBirthdayShow && (
                      <Box
                        position="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                        bg="teal"
                        px="2"
                        py="1"
                        borderBottomRadius="md"
                      >
                        <HStack
                          justifyContent="center"
                          alignItems="center"
                          space={2}
                        >
                          <BirthdayIcon size={13} />
                          <Text
                            color="white"
                            fontSize="12"
                            fontWeight="bold"
                            isTruncated
                          >
                            {item?.birthdayMemberName ??
                              item?.birthdayMember?.stage_name}
                          </Text>
                        </HStack>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box w="60%">
                  <HStack space={1} alignItems="center">
                    <Text fontSize="md" fontWeight="semibold">
                      {item.setlist.name}
                    </Text>
                  </HStack>
                  <Text mt="2" color="gray.300">
                    {item.setlist.description.slice(0, 150)}...
                  </Text>
                </Box>
              </HStack>
            </TouchableOpacity>
          ))
        : [...Array(5)].map((_, idx) => <SkeletonSchedule key={idx} />)}

      {hasMore && !isLoading && !isWeek && (
        <TouchableOpacity onPress={handleLoadMore}>
          <Button
            my="2"
            variant="filled"
            borderRadius="8"
            bg="teal"
            onPress={handleLoadMore}
          >
            <HStack alignItems="center" space={2}>
              <LoadingIcon />
              <Text fontWeight="bold" fontSize="14">
                Load More Schedules
              </Text>
            </HStack>
          </Button>
        </TouchableOpacity>
      )}

      {isLoading && !isWeek && (
        <HStack justifyContent="center" my="4">
          <Spinner color="white" size="lg" />
        </HStack>
      )}
    </Box>
  );
};

export default Schedule;
