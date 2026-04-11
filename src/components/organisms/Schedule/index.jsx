import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Text,
  Button,
  Spinner,
  ChevronRightIcon,
} from "native-base";
import moment from "moment";
import "moment/locale/id";
import SkeletonSchedule from "../../atoms/Skeleteon";
import { LoadingIcon } from "../../../assets/icon";
import { TouchableOpacity } from "react-native";
import { useScheduleList } from "../../../services/hooks/useSchedules";
import { FlashList } from "@shopify/flash-list";
import ScheduleCard from "../ScheduleCard";

const Schedule = ({ refreshing, isWeek, navigation, setlistId }) => {
  const [schedules, setSchedules] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading } = useScheduleList({
    page,
    setlistId,
    isOnWeekSchedule: isWeek,
  });

  useEffect(() => {
    setPage(1);
  }, [refreshing]);

  useEffect(() => {
    if (!data) return;

    const { items = [], meta } = data;

    if (isWeek) {
      setSchedules(items);
    } else {
      setSchedules((prev) => (page === 1 ? items : [...prev, ...items]));
    }

    if (meta && meta.currentPage >= meta.totalPages) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [data, page, isWeek]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const ListFooter = () => (
    <Box mt="4">
      {hasMore && !isLoading && !isWeek && (
        <TouchableOpacity onPress={handleLoadMore}>
          <Button
            my="1"
            variant="outline"
            borderRadius="xl"
            borderColor="primary"
            onPress={handleLoadMore}
          >
            <HStack alignItems="center" space={2}>
              <LoadingIcon />
              <Text fontWeight="bold" fontSize="14">
                Lihat jadwal lainnya
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

  return (
    <Box py="3">
      <HStack alignItems="center" justifyContent="space-between">
        {isWeek && (
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

      {schedules?.length > 0 ? (
        <FlashList
          data={schedules}
          numColumns={2}
          renderItem={({ item, index }) => (
            <ScheduleCard item={item} index={index} />
          )}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          estimatedItemSize={100}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={ListFooter}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        [...Array(5)].map((_, idx) => <SkeletonSchedule key={idx} id={idx} />)
      )}
    </Box>
  );
};

export default Schedule;
