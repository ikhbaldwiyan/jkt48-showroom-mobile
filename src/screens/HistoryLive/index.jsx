import moment from 'moment';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Box,
  Button,
  ChevronRightIcon,
  Divider,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from 'native-base';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Calendar, History, TimesFill, UsersFill} from '../../assets/icon';
import {ROOMS} from '../../services';
import {formatViews, getLiveDurationMinutes} from '../../utils/helpers';
import TimeAgo from 'react-native-timeago';
import {useNavigation} from '@react-navigation/native';
import Layout from '../../components/templates/Layout';
import {useRefresh} from '../../utils/hooks/useRefresh';

const HistoryLive = () => {
  const [recentLives, setRecentLives] = useState([]);
  const {navigate, setOptions} = useNavigation();
  const {refreshing, onRefresh} = useRefresh();
  const [type, setType] = useState('all');
  const [search, setSearch] = useState('');

  useLayoutEffect(() => {
    setOptions({
      headerTitle: 'History Live',
    });
  }, [setOptions]);

  useEffect(() => {
    async function getRecentLive() {
      try {
        const response = await ROOMS.getHistoryLives(type, search);
        setRecentLives(response.data.recents);
      } catch (error) {
        console.log(error);
      }
    }
    getRecentLive();
  }, [refreshing, type, search]);

  const handleSearch = query => {
    setSearch(query);
  };

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <Box flex="1" mb="4">
        <HStack space={1.5}>
          <Input
            bgColor="white"
            variant="filled"
            w="38%"
            fontSize="sm"
            name="id"
            height="36px"
            placeholderTextColor="secondary"
            placeholder="Cari member"
            value={search}
            onChangeText={handleSearch}
            borderRadius={6}
          />
          <Button
            p="2"
            height="36px"
            borderRadius={6}
            bg={type === 'all' ? 'teal' : 'blueGray.500'}
            onPress={() => setType('all')}>
            <HStack space={1} alignItems="center">
              <Text fontWeight="semibold">All</Text>
            </HStack>
          </Button>
          <Button
            p="2"
            height="36px"
            borderRadius={6}
            bg={type === 'showroom' ? 'teal' : 'blueGray.500'}
            onPress={() => setType('showroom')}>
            <HStack space={1} alignItems="center">
              <Text fontWeight="semibold">Showroom</Text>
            </HStack>
          </Button>
          <Button
            p="2"
            height="36px"
            borderRadius={6}
            bg={type === 'idn' ? 'teal' : 'blueGray.500'}
            onPress={() => setType('idn')}>
            <HStack space={1} alignItems="center">
              <Text fontWeight="semibold">IDN Live</Text>
            </HStack>
          </Button>
        </HStack>
      </Box>
      {recentLives.length > 0 && (
        <VStack space={4}>
          {recentLives?.map((log, idx) => {
            const {member, live_info} = log;
            return (
              <Box w="100%" mr="3" key={idx}>
                <LinearGradient
                  start={{x: -0, y: 0}}
                  end={{x: 1, y: 2}}
                  colors={['#004A66', '#009FCB']}
                  style={styles.linearGradient}>
                  <Box>
                    <HStack>
                      {log.type === 'showroom' ? (
                        <Image
                          size="md"
                          alt="showroom"
                          source={{
                            uri: 'https://play-lh.googleusercontent.com/gf9vm7y3PgUGzGrt8pqJNtqb6x0AGzojrKlfntGvPyGQSjmPwAls35zZ-CXj_jryA8k',
                          }}
                          width="50"
                          height="50"
                          position="absolute"
                          zIndex="99"
                          bottom={0}
                          borderRightRadius={6}
                          borderBottomRightRadius={0}
                          borderBottomLeftRadius={6}
                        />
                      ) : (
                        <Image
                          size="md"
                          alt="idn live"
                          source={{
                            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/IDN_Live.svg/2560px-IDN_Live.svg.png',
                          }}
                          width="120"
                          left={2}
                          height="35"
                          position="absolute"
                          zIndex="99"
                          bottom={1}
                          borderRightRadius={6}
                          borderBottomRightRadius={0}
                          shadow="4"
                        />
                      )}
                      <Image
                        source={{uri: member.img_alt}}
                        size="md"
                        alt="image"
                        w="130"
                        h="auto"
                        borderTopLeftRadius={6}
                        borderBottomLeftRadius={6}
                      />
                      <Box px="2">
                        <VStack space={2} p="3">
                          <HStack
                            alignItems="center"
                            justifyContent="space-between">
                            <Text
                              color="blueGray.100"
                              fontSize="xl"
                              fontWeight="bold">
                              {member.url === 'jkt48'
                                ? 'JKT48 Ofiicial'
                                : member?.nickname}
                            </Text>
                            {/* <ChevronRightIcon color="white" /> */}
                          </HStack>
                          <Divider />
                          <HStack alignItems="center" space={2}>
                            <Calendar size={20} />
                            <Text fontSize="15">
                              {moment(live_info?.date?.start).format(
                                'dddd, D MMMM',
                              )}
                            </Text>
                          </HStack>
                          <HStack alignItems="center" space={2}>
                            <UsersFill size={20} />
                            <Text fontSize="15">
                              {formatViews(live_info?.viewers?.num)} views
                            </Text>
                          </HStack>
                          <HStack alignItems="center" space={2}>
                            <TimesFill size={20} />
                            <Text fontSize="15">
                              {getLiveDurationMinutes(live_info?.duration)}
                            </Text>
                          </HStack>
                          <HStack space={2} alignItems="center">
                            <History size={20} />
                            <Text fontSize="15" fontWeight="semibold">
                              <TimeAgo
                                time={live_info?.date?.end}
                                interval={20000}
                              />
                            </Text>
                          </HStack>
                        </VStack>
                      </Box>
                    </HStack>
                  </Box>
                </LinearGradient>
              </Box>
            );
          })}
          <Divider my="4" />
        </VStack>
      )}
    </Layout>
  );
};

export default HistoryLive;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 6,
  },
});
