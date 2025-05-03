import React, { useEffect, useState } from "react";
import { Box, HStack, Image, Text, Button, Spinner, VStack } from "native-base";
import moment from "moment";
import "moment/locale/id";
import SkeletonSchedule from "../../atoms/Skeleteon";
import { SCHEDULES } from "../../../services";
import {
  BirthdayIcon,
  Calendar,
  GraduateIcon,
  LoadingIcon,
  RightArrow,
  TheaterIcon,
  TimesFill,
  TimesIcon
} from "../../../assets/icon";
import { TouchableOpacity } from "react-native";

const ScheduleHome = ({ refreshing, isWeek, navigation }) => {
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

  return (
    <Box>
      <HStack mb="3" alignItems="center" justifyContent="space-between">
        <>
          <Text color="white" fontSize="2xl" mb="1" fontWeight="semibold">
            Jadwal Theater
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Theater")}>
            <HStack alignItems="center" space={2}>
              <Text fontSize="sm">Lihat semua</Text>
              <RightArrow />
            </HStack>
          </TouchableOpacity>
        </>
      </HStack>
      {schedules.length > 0
        ? schedules?.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("ScheduleDetail", { item })}
            >
              <VStack space={2} mb="4">
                <Box p="3" bg="teal" borderRadius={10}>
                  <HStack space={3}>
                    <TheaterIcon color="white" />
                    <Text fontSize={15} fontWeight="bold">
                      {item?.setlist?.name}
                    </Text>
                  </HStack>
                </Box>
                <Box p="3" bg="#865CD6" borderRadius={10}>
                  <HStack space={4}>
                    <HStack space={3}>
                      <Calendar size={18} color="white" />
                      <Text fontSize={15} fontWeight="bold">
                        {moment(item.showDate)
                          .locale("id")
                          .format("dddd, DD MMM YYYY")}
                      </Text>
                    </HStack>
                    <HStack alignItems="center" space={2}>
                      <TimesIcon />
                      <Text fontSize={15} fontWeight="bold">
                        {item?.showTime} WIB
                      </Text>
                    </HStack>
                  </HStack>
                </Box>
                <Box mt="2">
                  <Image
                    width="100%"
                    height={200}
                    source={{ uri: item?.setlist?.image }}
                    borderRadius="8"
                    borderBottomLeftRadius={0}
                    borderBottomRightRadius={0}
                    alt="Theater"
                  />
                  <Box
                    p="3"
                    borderTopRightRadius={0}
                    borderTopLeftRadius={0}
                    borderRadius="8"
                    bg="cyan.600"
                  >
                    <Text fontSize="14" fontWeight="semibold">
                      {item.setlist.description.slice(0, 200)}...
                    </Text>
                  </Box>
                </Box>
              </VStack>
            </TouchableOpacity>
          ))
        : [...Array(5)].map((_, idx) => <SkeletonSchedule key={idx} />)}

      {isLoading && !isWeek && (
        <HStack justifyContent="center" my="4">
          <Spinner color="white" size="lg" />
        </HStack>
      )}
    </Box>
  );
};

export default ScheduleHome;
