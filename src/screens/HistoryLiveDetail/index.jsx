import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import { useEffect, useLayoutEffect, useState } from "react";
import {
  useHistoryDetail,
  useHistoryLiveDetail,
} from "../../services/hooks/useHistoryLive";
import {
  estimateIDNGift,
  estimateSRGift,
  formatLongDate,
  formatViews,
  getLiveDurationMinutes,
} from "../../utils/helpers";

import {
  Box,
  Divider,
  HStack,
  Image,
  PlayIcon,
  Spinner,
  Text,
  VStack,
} from "native-base";
import {
  Calendar,
  Dashboard,
  Donate,
  EyeIcon,
  GiftFill,
  IDNLiveIcon,
  LiveIcon,
  StartIcon,
  StopIcon,
  TimesIcon,
} from "../../assets/icon";
import Loading from "../../components/atoms/Loading";
import TabButton from "../../components/atoms/TabButton";
import Layout from "../../components/templates/Layout";
import Screenshot from "./components/Screenshot";
import MenuHistoryLive from "./components/Menu";
import YoutubePlayer from "react-native-youtube-iframe";
import { useRefresh, useUser } from "../../utils/hooks";
import useApiConfig from "../../store/useApiConfig";

const HistoryLiveDetail = ({ route }) => {
  const navigation = useNavigation();
  const { liveId, title } = route.params;
  const { data, isLoading } = useHistoryLiveDetail(liveId);
  const { refreshing, onRefresh } = useRefresh();
  const isShowroom = data?.type === "showroom";
  const images = data?.live_info?.screenshot?.list;
  const folder = data?.live_info?.screenshot?.folder;
  const format = data?.live_info?.screenshot?.format;
  const liveSlug = isShowroom ? data?.live_id : data?.idn?.slug;

  const {
    data: history,
    isSuccess,
    isLoading: isLoadingReplay,
    refetch,
  } = useHistoryDetail(data?.type, liveSlug);
  const replay = history?.youtube;
  const [type, setType] = useState("screenshot");

  const { user } = useUser();
  const { IS_REPLAY_RELEASED, ADMIN_USERS } = useApiConfig();
  const adminUserIds = ADMIN_USERS?.split(",").map(Number);
  const isAdmin = adminUserIds.includes(parseInt(user?.user_id));

  useEffect(() => {
    refetch();
  }, [refreshing]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Detail Live",
    });
  }, [navigation, title]);

  return isLoading ? (
    <Box justifyContent="center" alignItems="center" flex="1" bg="secondary">
      <Loading />
    </Box>
  ) : (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <HStack justifyContent="space-between" alignItems="center">
        <Box>
          {data?.room_info?.nickname && (
            <Text fontSize="xl" fontWeight="semibold">
              {data?.room_info?.nickname}
            </Text>
          )}
          <Text color="gray.400">{data?.room_info?.fullname}</Text>
        </Box>
        {isShowroom ? (
          <Image
            size="md"
            alt="showroom"
            source={{
              uri: "https://play-lh.googleusercontent.com/gf9vm7y3PgUGzGrt8pqJNtqb6x0AGzojrKlfntGvPyGQSjmPwAls35zZ-CXj_jryA8k",
            }}
            width="42"
            height="42"
            rounded="md"
          />
        ) : (
          <IDNLiveIcon />
        )}
      </HStack>

      <HStack space={3} mt="3" mb="1">
        <TabButton
          type="screenshot"
          currentType={type}
          onPress={() => setType("screenshot")}
          label="Screenshot"
          customIcon={<Dashboard size="16" color="#24A2B7" />}
        />
        {((replay && IS_REPLAY_RELEASED) || (replay && isAdmin)) && (
          <TabButton
            type="replay"
            currentType={type}
            onPress={() => setType("replay")}
            label="Replay"
            customIcon={<PlayIcon size="sm" color="#24A2B7" />}
          />
        )}
        {((isLoadingReplay && IS_REPLAY_RELEASED) || (isAdmin && isLoadingReplay)) && (
           <Spinner color="white" />
        )}
      </HStack>

      {type === "screenshot" ? (
        <Screenshot
          thumbnail={data?.room_info?.img}
          images={images}
          folder={folder}
          isShowroom={isShowroom}
          room_name={data?.room_info?.fullname}
          format={format}
        />
      ) : (
        <Box
          mt="3"
          borderRadius={6}
          overflow="hidden"
          width="100%"
          height={200}
        >
          {replay && isSuccess && replay.length > 1 && (
            <YoutubePlayer height={200} width={"100%"} videoId={replay} />
          )}
        </Box>
      )}

      <Box my="3">
        <Text fontSize="xl" fontWeight="semibold">
          Detail
        </Text>

        <HStack flexWrap="wrap" mt="3">
          <VStack w="50%" mb="4" pr="2" space={1}>
            <HStack space={1.5} alignItems="center">
              <Calendar color="#A3A3A3" />
              <Text color="gray.400" fontSize={13}>
                Tanggal
              </Text>
            </HStack>
            <Text>
              {moment(data?.live_info?.date?.start).format("dddd, DD MMM YYYY")}
            </Text>
          </VStack>

          <VStack w="50%" mb="4" pl="2" space={1}>
            <HStack space={1.5} alignItems="center">
              <TimesIcon color="#A3A3A3" size={15} />
              <Text color="gray.400" fontSize={13}>
                Durasi Live
              </Text>
            </HStack>
            <Text>{getLiveDurationMinutes(data?.live_info?.duration)}</Text>
          </VStack>

          <VStack w="50%" mb="4" pr="2" space={1}>
            <HStack space={1.5} alignItems="center">
              <StartIcon size={20} />
              <Text color="gray.400" fontSize={13}>
                Mulai
              </Text>
            </HStack>
            <Text>{formatLongDate(data?.live_info?.date?.start, true)}</Text>
          </VStack>

          <VStack w="50%" mb="4" pl="2" space={1}>
            <HStack space={1.5} alignItems="center">
              <StopIcon size={20} />
              <Text color="gray.400" fontSize={13}>
                Selesai
              </Text>
            </HStack>
            <Text>{formatLongDate(data?.live_info?.date?.end, true)}</Text>
          </VStack>

          <VStack w="50%" mb="4" pr="2" space={1}>
            <HStack space={1.5} alignItems="center">
              <LiveIcon size="16" color="#A3A3A3" />
              <Text color="gray.400" fontSize={13}>
                Judul Live
              </Text>
            </HStack>
            <Text>{data?.idn?.title ?? "-"}</Text>
          </VStack>
          <VStack w="50%" mb="4" pl="2" space={1}>
            <HStack space={1.5} alignItems="center">
              <EyeIcon color="#A3A3A3" size="17" />
              <Text color="gray.400" fontSize={13}>
                Penonton
              </Text>
            </HStack>
            <Text>{formatViews(data?.live_info?.viewers?.num)}</Text>
          </VStack>

          <VStack w="50%" mb="4" pr="2" space={1}>
            <HStack space={1.5} alignItems="center">
              <Donate color="#A3A3A3" size="17" />
              <Text color="gray.400" fontSize={13}>
                Estimasi Total Gift
              </Text>
            </HStack>
            <Text>
              {isShowroom
                ? ` Rp ${formatViews(estimateSRGift(data?.total_gifts))}`
                : ` Rp ${formatViews(estimateIDNGift(data?.total_gifts))}`}
            </Text>
          </VStack>
          <VStack w="50%" mb="4" pl="2" space={1}>
            <HStack space={1.5} alignItems="center">
              <GiftFill size="16" color="#A3A3A3" />
              <Text color="gray.400" fontSize={13}>
                Gifts
              </Text>
            </HStack>
            <Text>{formatViews(data?.total_gifts)} Gold</Text>
          </VStack>
        </HStack>
        <Divider color="white" />

        <MenuHistoryLive
          gifts={data?.live_info?.gift?.list}
          podium={data?.users}
          isShowroom={isShowroom}
          liveId={liveSlug}
        />
      </Box>
    </Layout>
  );
};

export default HistoryLiveDetail;
