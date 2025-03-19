import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  Box,
  FlatList,
  HStack,
  VStack,
  Text,
  Select,
  Avatar,
  Badge,
  Spinner,
  CheckCircleIcon,
} from "native-base";
import { getLeaderboardUser } from "../../services/leaderboard";
import moment from "moment";
import Loading from "../../components/atoms/Loading";

const LeaderboardUser = ({ navigation }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState("");
  const [month, setMonth] = useState(moment().format("MM-YYYY"));
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  const monthNames = [
    { name: "January", short: "01" },
    { name: "February", short: "02" },
    { name: "Maret", short: "03" },
    { name: "April", short: "04" },
    { name: "Mei", short: "05" },
    { name: "June", short: "06" },
    { name: "July", short: "07" },
    { name: "August", short: "08" },
    { name: "September", short: "09" },
    { name: "October", short: "10" },
    { name: "November", short: "11" },
    { name: "December", short: "12" },
  ];

  const currentYear = moment().year();
  const previousYear = currentYear - 1;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Top Leaderboard User",
    });
  }, []);

  const fetchLeaderboardData = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await getLeaderboardUser({
        page,
        month,
        platform,
        filterBy: month !== "" ? "month" : "",
      });
      console.log(data);
      setLeaderboardData(data.data);
      setTotalData(data.pagination.totalData);
      setPage(data.pagination.currentPage);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  }, [month, platform, page]);

  useEffect(() => {
    fetchLeaderboardData();
  }, [month, platform, page]);

  const handlePlatformChange = (value) => {
    setPlatform(value);
    setPage(1);
  };

  const handleMonthChange = (value) => {
    setMonth(value);
    setPage(1);
  };

  const ListHeader = () => (
    <Box
      p={3}
      mb={2}
      bg="cyan.600"
      borderBottomWidth={1}
      borderBottomColor="blueLight"
      rounded="lg"
      borderBottomLeftRadius={0}
      borderBottomRightRadius={0}
    >
      <HStack space={4} alignItems="center">
        <Box w={8} alignItems="center">
          <Text fontSize="sm" color="white" fontWeight="bold">
            Rank
          </Text>
        </Box>

        <Box w={12} alignItems="center">
          <Text fontSize="sm" color="white" fontWeight="bold">
            Avatar
          </Text>
        </Box>

        <Box flex={1}>
          <Text fontSize="sm" color="white" fontWeight="bold">
            Username
          </Text>
        </Box>

        <Box alignItems="center">
          <Text fontSize="sm" color="white" fontWeight="bold">
            Total Watch
          </Text>
        </Box>
      </HStack>
    </Box>
  );

  const renderItem = ({ item, index }) => {
    return (
      <Box mb={2} p={3} shadow={1} rounded="lg" key={item.rank} bg="cyan.700">
        <HStack space={4} alignItems="center">
          <Box w={8} alignItems="center">
            <Text
              fontSize="lg"
              fontWeight="bold"
              color={index < 3 ? "amber.400" : "gray.200"}
            >
              {item.rank}
            </Text>
          </Box>

          <Avatar size="md" source={{ uri: item.avatar }} />

          <VStack flex={1}>
            <Text
              color="blueLight"
              fontSize="md"
              fontWeight="semibold"
              isTruncated
            >
              {item.user_id.length > 13
                ? `${item.user_id.slice(0, 13)}...`
                : item?.user_id}
            </Text>
          </VStack>

          <HStack space={2} alignItems="center">
            <VStack alignItems="center">
              <Badge colorScheme="info" rounded="full" width={"auto"}>
                <Text fontWeight="bold" color="primary">
                  {platform === "Showroom"
                    ? item.watchShowroomMember
                    : platform === "IDN"
                    ? item.watchLiveIDN
                    : item.watchShowroomMember + item.watchLiveIDN}
                  x
                </Text>
              </Badge>
            </VStack>
          </HStack>
        </HStack>
      </Box>
    );
  };

  return (
    <Box flex={1} bg="secondary" safeAreaBottom>
      <VStack space={4} p={4} pb="32">
        <HStack space={4} justifyContent="space-between">
          <Select
            flex={1}
            selectedValue={platform}
            onValueChange={handlePlatformChange}
            placeholder="Select Platform"
            color="white"
          >
            <Select.Item
              label="All Platform Live"
              value=""
              endIcon={
                platform === "" ? (
                  <Box mt="1">
                    <CheckCircleIcon size="4" color="primary" />
                  </Box>
                ) : null
              }
            />
            <Select.Item
              label="Showroom"
              value="Showroom"
              endIcon={
                platform === "Showroom" ? (
                  <Box mt="1">
                    <CheckCircleIcon size="4" color="primary" />
                  </Box>
                ) : null
              }
            />
            <Select.Item
              label="IDN Live"
              value="IDN"
              endIcon={
                platform === "IDN" ? (
                  <Box mt="1">
                    <CheckCircleIcon size="4" color="primary" />
                  </Box>
                ) : null
              }
            />
          </Select>

          <Select
            flex={1}
            selectedValue={month}
            onValueChange={handleMonthChange}
            placeholder="Select Month"
            color="white"
          >
            <Select.Item
              label="All Time"
              value=""
              endIcon={
                month === "" ? (
                  <Box mt="1">
                    <CheckCircleIcon size="4" color="primary" />
                  </Box>
                ) : null
              }
            />
            {monthNames.map((m) => {
              if (m.short > moment().format("MM")) return null;
              return (
                <Select.Item
                  key={`${m.short}-${currentYear}`}
                  label={`${m.name} ${currentYear}`}
                  value={`${m.short}-${currentYear}`}
                  endIcon={
                    month === `${m.short}-${currentYear}` ? (
                      <Box mt="1">
                        <CheckCircleIcon size="4" color="primary" />
                      </Box>
                    ) : null
                  }
                />
              );
            })}
            {monthNames.map((m) => (
              <Select.Item
                key={`${m.short}-${previousYear}`}
                label={`${m.name} ${previousYear}`}
                value={`${m.short}-${previousYear}`}
                endIcon={
                  month === `${m.short}-${previousYear}` ? (
                    <Box mt="1">
                      <CheckCircleIcon size="4" color="primary" />
                    </Box>
                  ) : null
                }
              />
            ))}
          </Select>
        </HStack>

        {loading && page === 1 ? (
          <Spinner mt={60} color="white" size="lg" />
        ) : (
          <Box>
            <FlatList
              data={leaderboardData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.5}
              ListHeaderComponent={ListHeader}
              stickyHeaderIndices={[0]}
              ListFooterComponent={() =>
                loading && page > 1 ? (
                  <Box
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                    h="full"
                  >
                    <Loading size="30" />
                  </Box>
                ) : null
              }
            />
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default LeaderboardUser;
