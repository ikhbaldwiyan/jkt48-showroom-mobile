import moment from "moment";
import React, {
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import {
  Box,
  Button,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FlatList,
  HStack,
  Select,
  Spinner,
  Text,
  VStack
} from "native-base";
import { Medal } from '../../assets/icon';
import { getLeaderboardUser } from "../../services/leaderboard";
import useAuthStore from "../../store/authStore";
import { monthNames } from "../../utils/helpers";
import AvatarList from "./components/AvatarList";

const LeaderboardUser = ({ navigation }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState("");
  const [month, setMonth] = useState(moment().format("MM-YYYY"));
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [monthName, setMonthName] = useState(moment().format("MMMM"));

  const currentYear = moment().year();
  const previousYear = currentYear - 1;
  const { userProfile } = useAuthStore();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Top Leaderboard " + monthName
    });
  }, [monthName]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        const response = await getLeaderboardUser({
          page,
          month,
          platform,
          filterBy: month !== "" ? "month" : "",
        });

        if (response?.data?.data) {
          const { data } = response.data;
          setLeaderboardData(data?.data || []);
          setTotalData(data?.pagination?.totalData || 0);
          setTotalPages(data?.pagination?.totalPage || 1);
        }
      } catch (error) {
        console.log("Error fetching leaderboard:", error);
        setLeaderboardData([]);
        setTotalData(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [month, platform, page]);

  const handlePlatformChange = (value) => {
    setPlatform(value);
    setPage(1);
  };

  const handleMonthChange = (value) => {
    setMonth(value);
    setPage(1);
    if (value) {
      const [month] = value.split('-');
      const monthName = monthNames.find(m => m.short === month)?.name || 'All Time';
      setMonthName(monthName);
    } else {
      setMonthName("All Time");
    }
  };

  const handlePrevPage = () => {
    setPage(Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    setPage(Math.min(totalPages, page + 1));
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
            <Medal size={20} />
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

  const renderItem = ({ item }) => {
    const isYou = userProfile?.user_id === item.user_id;
    
    return (
      <AvatarList 
        key={item.rank}
        item={item}
        isYou={isYou}
        platform={platform}
      />
    );
  };

  return (
    <Box flex={1} bg="secondary" safeAreaBottom>
      <VStack space={4} p={4} pb="64">
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
              keyExtractor={(item) => item?.rank?.toString()}
              showsVerticalScrollIndicator={true}
              ListHeaderComponent={ListHeader}
              stickyHeaderIndices={[0]}
            />

            <HStack alignItems="center" justifyContent="space-between" mt={4}>
              <Button
                borderRadius="lg"
                onPress={handlePrevPage}
                disabled={page === 1}
                bg={page === 1 ? "gray.500" : "blueGray.600"}
                opacity={page === 1 ? 0.7 : 1}
              >
                <HStack alignItems="center" space="1">
                  <ChevronLeftIcon color="white" />
                  <Text>Prev</Text>
                </HStack>
              </Button>

              <Text fontSize="15" fontWeight="bold">
                {page} / {totalPages}
              </Text>

              <Button
                borderRadius="lg"
                onPress={handleNextPage}
                disabled={page === totalPages}
                bg={page === totalPages ? "gray.500" : "blueGray.600"}
                opacity={page === totalPages ? 0.7 : 1}
              >
                <HStack alignItems="center" space="1">
                  <Text>Next</Text>
                  <ChevronRightIcon color="white" />
                </HStack>
              </Button>
            </HStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default LeaderboardUser;
