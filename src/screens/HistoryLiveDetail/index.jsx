import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { Box, HStack, Image, Text, VStack } from "native-base";
import { useLayoutEffect } from "react";
import {
  Calendar,
  ChatIcon,
  EyeIcon,
  GiftFill,
  IDNLiveIcon,
  LiveIcon,
  StartIcon,
  StopIcon,
  TimesIcon,
} from "../../assets/icon";
import Loading from "../../components/atoms/Loading";
import {
  useHistoryDetail,
  useHistoryLiveDetail,
  usePodiumList,
} from "../../services/hooks/useHistoryLive";
import {
  formatLongDate,
  formatViews,
  getLiveDurationMinutes,
} from "../../utils/helpers";
import Layout from "../../components/templates/Layout";
import Screenshot from "./components/Screenshot";
import HistoryLiveTabs from "../../components/molecules/HistoryLiveTabs";
import WebView from "react-native-webview";
import { WatchingUser } from "../../components/molecules/HistoryLiveTabs/components";

const HistoryLiveDetail = ({ route }) => {
  const navigation = useNavigation();
  const { liveId, title } = route.params;
  const { data, isLoading } = useHistoryLiveDetail(liveId);
  const isShowroom = data?.type === "showroom";
  const images = data?.live_info?.screenshot?.list;
  const folder = data?.live_info?.screenshot?.folder;

  const liveSlug = isShowroom ? data?.live_id : data?.idn?.slug;

  const { data: history, isSuccess } = useHistoryDetail(data?.type, liveSlug);
  const replay = history?.youtube;

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
    <>
      <Layout>
        <HStack justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="xl" fontWeight="semibold">
              {data?.room_info?.nickname}
            </Text>
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

        {replay !== undefined && isSuccess && replay.length > 1 ? (
          <Box mt="3" borderRadius={6} overflow="hidden">
            <WebView
              style={{
                width: "100%",
                height: isShowroom ? 188 : 412,
              }}
              source={{
                uri:
                  replay !== undefined && isSuccess
                    ? `https://www.youtube.com/embed/${replay}`
                    : null,
              }}
              allowsFullscreenVideo
            />
          </Box>
        ) : (
          <Screenshot
            thumbnail={data?.room_info?.img}
            images={images}
            folder={folder}
            isShowroom={isShowroom}
          />
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
                {moment(data?.live_info?.date?.start).format(
                  "dddd, DD MMM YYYY"
                )}
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
                <ChatIcon color="#A3A3A3" size="18" />
                <Text color="gray.400" fontSize={13}>
                  Komentar
                </Text>
              </HStack>
              <Text>{formatViews(data?.live_info?.comments?.num)} chat</Text>
            </VStack>
            <VStack w="50%" mb="4" pl="2" space={1}>
              <HStack space={1.5} alignItems="center">
                <GiftFill size="16" color="#A3A3A3" />
                <Text color="gray.400" fontSize={13}>
                  Gifts
                </Text>
              </HStack>
              <Text>{formatViews(data?.total_gifts)}</Text>
            </VStack>
          </HStack>
          <WatchingUser
            platform={isShowroom ? "showroom" : "idn"}
            liveId={liveSlug}
          />
        </Box>
      </Layout>
    </>
  );
};

export default HistoryLiveDetail;
