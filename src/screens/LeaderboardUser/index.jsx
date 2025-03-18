import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import {
  Box,
  FlatList,
  HStack,
  VStack,
  Text,
  Select,
  Avatar,
  Heading,
  Badge,
  Spinner,
} from 'native-base';
import { getLeaderboardUser } from '../../services/leaderboard';
import moment from 'moment';
import Loading from "../../components/atoms/Loading";

const LeaderboardUser = ({ navigation }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState("");
  const [month, setMonth] = useState(moment().format('MM-YYYY'));
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
    { name: "December", short: "12" }
  ];

  const currentYear = moment().year();
  const previousYear = currentYear - 1;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Top Leaderboard User"
    });
  }, []);

  const fetchLeaderboardData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { data } } = await getLeaderboardUser({
        page,
        month,
        platform,
        filterBy: month !== "" ? "month" : ""
      });
      console.log(data);
      setLeaderboardData(data.data);
      setTotalData(data.pagination.totalData);
      setPage(data.pagination.currentPage);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
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
    console.log(value);
    setMonth(value);
    setPage(1);
  };

  const ListHeader = () => (
    <Box bg="cyan.600" p={3} borderBottomWidth={1} borderBottomColor="blueLight" rounded="lg" borderBottomLeftRadius={0} borderBottomRightRadius={0} mb={2}>
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

        <Box w={16} alignItems="center">
          <Text fontSize="sm" color="white" fontWeight="bold">
            Total Watch
          </Text>
        </Box>
      </HStack>
    </Box>
  );

  const renderItem = ({ item, index }) => {
    return (
      <Box
        mb={2}
        p={3}
        shadow={1}
        rounded="lg"
        key={item.rank}
        bg="cyan.700"
      >
        <HStack space={4} alignItems="center">
          <Box w={8} alignItems="center">
            <Text
              fontSize="lg"
              fontWeight="bold"
              color={index < 3 ? 'amber.400' : 'gray.200'}
            >
              {item.rank}
            </Text>
          </Box>

          <Avatar
            size="md"
            source={{ uri: item.avatar }}
          />

          <VStack flex={1}>
            <Text color="blueLight" fontSize="md" fontWeight="semibold">
              {item.user_id}
            </Text>
          </VStack>

          <HStack space={2} alignItems="center">
            <VStack alignItems="center">
              <Badge colorScheme="info" rounded="full" width={platform ? 10 : 'auto'}>
                <Text fontWeight="bold" color="primary">
                  {platform === 'Showroom' ? item.watchShowroomMember :
                   platform === 'IDN' ? item.watchLiveIDN :
                   item.watchShowroomMember + item.watchLiveIDN}x
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
            <Select.Item label="All Platform" value="" />
            <Select.Item label="Showroom" value="Showroom" />
            <Select.Item label="IDN" value="IDN" />
          </Select>

          <Select
            flex={1}
            selectedValue={month}
            onValueChange={handleMonthChange}
            placeholder="Select Month"
            color="white"
          >
            <Select.Item label="All Time" value="" />
            <Select.Item
              label="This Month"
              value={moment().format('MM-YYYY')}
            />
            {monthNames.map((m) => {
              if (m.short > moment().format('MM')) return null;
              return (
                <Select.Item
                  key={`${m.short}-${currentYear}`}
                  label={`${m.name} ${currentYear}`}
                  value={`${m.short}-${currentYear}`}
                />
              );
            })}
            {monthNames.map((m) => (
              <Select.Item
                key={`${m.short}-${previousYear}`}
                label={`${m.name} ${previousYear}`}
                value={`${m.short}-${previousYear}`}
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
              ListFooterComponent={() => (
                loading && page > 1 ? (
                  <Box flex={1} justifyContent="center" alignItems="center" h="full">
                    <Loading size="30" />
                  </Box>
                ) : null
              )}
            />
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default LeaderboardUser;