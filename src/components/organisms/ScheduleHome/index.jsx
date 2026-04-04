import moment from "moment";
import "moment/locale/id";
import {
  Box,
  Button,
  ChevronRightIcon,
  HStack,
  Image,
  PlayIcon,
  Text,
  VStack
} from "native-base";
import { useEffect } from "react";
import { Linking, TouchableOpacity } from "react-native";
import {
  BirthdayIcon,
  Calendar,
  GraduateIcon,
  TheaterIcon,
  TimesIcon,
  UsersIcon
} from "../../../assets/icon";
import { useScheduleWeek, useTodaySchedule } from "../../../services/hooks/useSchedules";
import SkeletonSchedule from "../../atoms/Skeleteon";
import CountdownTimer from "../CountdownTimer";

const ScheduleHome = ({ refreshing, navigation, isToday = false }) => {
  const { data: schedules, refetch } = useScheduleWeek();
  const { data: todayLive } = useTodaySchedule();

  useEffect(() => {
    refetch();
  }, [refreshing]);

  const filteredSchedules = schedules?.filter((item) => {
    const isSameDay = moment(item.showDate).isSame(moment(), "day");
    return isToday ? isSameDay : !isSameDay;
  });

  return (
    filteredSchedules?.length > 0 && (
      <Box>
        <HStack mb="3" alignItems="center" justifyContent="space-between">
          {isToday ? (
            <Text color="white" fontSize="2xl" mb="1" fontWeight="semibold">
              Theater Hari Ini
            </Text>
          ) : (
            <>
              <Text color="white" fontSize="2xl" mb="1" fontWeight="semibold">
                Jadwal Theater
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Theater")}>
                <HStack alignItems="center" mb="1" space={1.5}>
                  <Text fontSize="sm" color="gray.400">
                    Lihat semua
                  </Text>
                  <ChevronRightIcon />
                </HStack>
              </TouchableOpacity>
            </>
          )}
        </HStack>
        {schedules?.length > 0
          ? filteredSchedules?.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("ScheduleDetail", { item })}
              >
                <VStack space={2} mb="4">
                  <Box p="2.5" bg="cyan.600" borderRadius={10}>
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
                            .format("dddd, DD MMMM YYYY")}
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
                      borderTopRightRadius={4}
                      borderTopLeftRadius={4}
                      borderBottomLeftRadius={0}
                      borderBottomRightRadius={0}
                      alt="Theater"
                    />

                    {isToday &&
                      todayLive?.is_live &&
                      todayLive?.slug === item.liveId && (
                        <Box
                          p="2"
                          borderTopLeftRadius={4}
                          borderBottomRightRadius={6}
                          bg="red"
                          position="absolute"
                        >
                          <HStack alignItems="center" space={1}>
                            <UsersIcon color="white" size="16" />
                            <Text fontSize={13}>{todayLive?.view_count}</Text>
                          </HStack>
                        </Box>
                      )}
                    {!isToday && (
                      <Box
                        p="3"
                        borderTopRightRadius={0}
                        borderTopLeftRadius={0}
                        borderRadius="8"
                        bg="blueGray.700"
                      >
                        <Text fontSize="14" fontWeight="medium">
                          {item.setlist.description.slice(0, 200)}...
                        </Text>
                      </Box>
                    )}

                    {isToday && (
                      <Box>
                        <CountdownTimer
                          showDate={item?.showDate}
                          targetDateTime={item.showTime}
                          isLive={
                            todayLive?.slug === item.liveId &&
                            todayLive?.is_live
                          }
                        >
                          <Button
                            borderTopRightRadius={0}
                            borderTopLeftRadius={0}
                            borderRadius="lg"
                            variant="filled"
                            bg="blueLight"
                            onPress={() =>
                              Linking.openURL(item?.ticketShowroom)
                            }
                          >
                            <HStack space={2} alignItems="center">
                              <PlayIcon color="primary" />
                              <Text color="primary" fontWeight="bold">
                                Watch at IDN App
                              </Text>
                            </HStack>
                          </Button>
                        </CountdownTimer>
                      </Box>
                    )}
                  </Box>
                </VStack>
              </TouchableOpacity>
            ))
          : [...Array(5)].map((_, idx) => (
              <SkeletonSchedule isHome key={idx} />
            ))}
      </Box>
    )
  );
};

export default ScheduleHome;
