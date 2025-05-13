import React, { useEffect, useState } from "react";
import { Box, HStack, Image, Text, Spinner, VStack } from "native-base";
import moment from "moment";
import "moment/locale/id";
import SkeletonSchedule from "../../atoms/Skeleteon";
import { SCHEDULES } from "../../../services";
import {
  BirthdayIcon,
  Calendar,
  GraduateIcon,
  RightArrow,
  TheaterIcon,
  TimesIcon,
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
                <Box p="2.5" bg="teal" borderRadius={10}>
                  <HStack space={2} alignItems="center">
                    <TheaterIcon size="22" color="white" />
                    <Text fontSize="md" fontWeight="bold">
                      {item?.setlist?.name}
                    </Text>
                  </HStack>
                </Box>
                <Box p="2.5" bg="#865CD6" borderRadius={10}>
                  <HStack space={4}>
                    <HStack space={2} alignItems="center">
                      <Calendar size={18} color="white" />
                      <Text fontWeight="bold">
                        {moment(item.showDate)
                          .locale("id")
                          .format("dddd, DD MMM YYYY")}
                      </Text>
                    </HStack>
                    <HStack alignItems="center" space={2}>
                      <TimesIcon />
                      <Text fontWeight="bold">{item?.showTime} WIB</Text>
                    </HStack>
                  </HStack>
                </Box>
                {item?.isBirthdayShow && (
                  <Box background="cyan.700" p="2.5" borderRadius="lg">
                    <HStack alignItems="center" space={2}>
                      <BirthdayIcon size={18} />
                      <Text fontWeight="bold">
                        Birthday {item?.birthdayMember?.name}
                      </Text>
                    </HStack>
                  </Box>
                )}
                {item?.isGraduationShow && (
                  <Box background="cyan.700" p="2.5" borderRadius="lg">
                    <HStack alignItems="center" space={2}>
                      <GraduateIcon size={18} />
                      <Text fontWeight="bold">
                        Graduation {item?.graduateMember?.name}
                      </Text>
                    </HStack>
                  </Box>
                )}
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
                    <Text fontSize="14" fontWeight="medium">
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
