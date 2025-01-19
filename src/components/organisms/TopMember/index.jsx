import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  VStack
} from "native-base";
import React, { useState } from "react";
import { Calendar, LiveIcon } from "../../../assets/icon";

const TopMember = () => {
  const [type, setType] = useState("showroom");

  const data = [
    {
      rank: 1,
      profile: {
        room_name: "Danella /ダネラ（JKT48）",
        image:
          "https://static.showroom-live.com/image/room/cover/002771d7d8969132b8749564920a354426fad0c56857e3818de960035c560ed7_m.jpeg?v=1730886135",
        image_square:
          "https://static.showroom-live.com/image/room/cover/002771d7d8969132b8749564920a354426fad0c56857e3818de960035c560ed7_square_m.jpeg?v=1730886135",
        is_onlive: false
      },
      username: "Danella JKT48",
      total_live: 3
    },
    {
      rank: 2,
      profile: {
        room_name: "Moreen / モリーン（JKT48）",
        image:
          "https://static.showroom-live.com/image/room/cover/97de05c98ac6f3e2af4000d4dee9283b2005664f59fdf8e421824e909b192132_m.jpeg?v=1716897452",
        image_square:
          "https://static.showroom-live.com/image/room/cover/97de05c98ac6f3e2af4000d4dee9283b2005664f59fdf8e421824e909b192132_square_m.jpeg?v=1716897452",
        is_onlive: false
      },
      username: "Moreen JKT48",
      total_live: 2
    },
    {
      rank: 3,
      profile: {
        room_name: "Michie /ミチー（JKT48）",
        image:
          "https://static.showroom-live.com/image/room/cover/fc878be06fb484b4edcb8051e8456a93279b2395e711aada3d7547b1b78e3720_m.jpeg?v=1730885919",
        image_square:
          "https://static.showroom-live.com/image/room/cover/fc878be06fb484b4edcb8051e8456a93279b2395e711aada3d7547b1b78e3720_square_m.jpeg?v=1730885919",
        is_onlive: false
      },
      username: "Michie JKT48",
      total_live: 1
    },
    {
      rank: 4,
      profile: {
        room_name: "Lana / ラナ（JKT48）",
        image:
          "https://static.showroom-live.com/image/room/cover/bbf5793ce9431e26532a55331376e1f2428e8bc1365960f1468602383361ad68_m.jpeg?v=1716897606",
        image_square:
          "https://static.showroom-live.com/image/room/cover/bbf5793ce9431e26532a55331376e1f2428e8bc1365960f1468602383361ad68_square_m.jpeg?v=1716897606",
        is_onlive: false
      },
      username: "Lana JKT48",
      total_live: 1
    },
    {
      rank: 5,
      profile: {
        room_name: "Greesel /グリーセル（JKT48）",
        image:
          "https://static.showroom-live.com/image/room/cover/940f5a1692b60af65bcec53d6db81138436b4ada3b796b7f0ac69aab2c4870bd_m.jpeg?v=1716897699",
        image_square:
          "https://static.showroom-live.com/image/room/cover/940f5a1692b60af65bcec53d6db81138436b4ada3b796b7f0ac69aab2c4870bd_square_m.jpeg?v=1716897699",
        is_onlive: false
      },
      username: "Greesel JKT48",
      total_live: 1
    },
    {
      rank: 6,
      profile: {
        room_name: "Nayla / ナイラ（JKT48）",
        image:
          "https://static.showroom-live.com/image/room/cover/7f0a24fb6d6d354299b727610887cba42d22cd4b15c15a708bdffea42ca623cb_m.jpeg?v=1716896733",
        image_square:
          "https://static.showroom-live.com/image/room/cover/7f0a24fb6d6d354299b727610887cba42d22cd4b15c15a708bdffea42ca623cb_square_m.jpeg?v=1716896733",
        is_onlive: false
      },
      username: "Nayla JKT48",
      total_live: 1
    },
    {
      rank: 7,
      profile: {
        room_name: "Lily / リリー（JKT48）",
        image:
          "https://static.showroom-live.com/image/room/cover/60d4c94941de7e2ab93f05ed5eb60dd1ae7b97936422b289335be63f23d61b27_m.jpeg?v=1716897487",
        image_square:
          "https://static.showroom-live.com/image/room/cover/60d4c94941de7e2ab93f05ed5eb60dd1ae7b97936422b289335be63f23d61b27_square_m.jpeg?v=1716897487",
        is_onlive: false
      },
      username: "Lily JKT48",
      total_live: 1
    },
    {
      rank: 8,
      profile: {
        room_name: "Aralie / アラリー（JKT48）",
        image:
          "https://static.showroom-live.com/image/room/cover/7bbb128443499700909dea11a4e2d9973c9f9c74974b3dafe269ec7b6dbc3315_m.jpeg?v=1716897666",
        image_square:
          "https://static.showroom-live.com/image/room/cover/7bbb128443499700909dea11a4e2d9973c9f9c74974b3dafe269ec7b6dbc3315_square_m.jpeg?v=1716897666",
        is_onlive: false
      },
      username: "Aralie JKT48",
      total_live: 1
    },
    {
      rank: 9,
      profile: {
        room_name: "Daisy /デイシー（JKT48）",
        image:
          "https://static.showroom-live.com/image/room/cover/a5054230e2eeeae789ccdf134345e4f3cf05801d689d9ec57397d34eae090343_m.jpeg?v=1730886174",
        image_square:
          "https://static.showroom-live.com/image/room/cover/a5054230e2eeeae789ccdf134345e4f3cf05801d689d9ec57397d34eae090343_square_m.jpeg?v=1730886174",
        is_onlive: false
      },
      username: "Daisy JKT48",
      total_live: 1
    },
    {
      rank: 10,
      profile: {
        room_name: "Erine / エリン（JKT48）",
        image:
          "https://static.showroom-live.com/image/room/cover/1dcb1281d3280600c17e1881a5a97e17051f795b65b26b0ae42841acc779facd_m.jpeg?v=1716897568",
        image_square:
          "https://static.showroom-live.com/image/room/cover/1dcb1281d3280600c17e1881a5a97e17051f795b65b26b0ae42841acc779facd_square_m.jpeg?v=1716897568",
        is_onlive: false
      },
      username: "Erine JKT48",
      total_live: 1
    }
  ];

  return (
    <View>
      <HStack alignItems="center" justifyContent="space-between">
        <Text fontSize="2xl" mb="3" fontWeight="semibold">
          Top Live Member
        </Text>
        <HStack space={2}>
          <Button
            py="1"
            px="1.5"
            bg={type === "showroom" ? "teal" : "blueGray.500"}
            onPress={() => setType("showroom")}
          >
            <Text fontSize="sm" fontWeight="semibold">
              Showroom
            </Text>
          </Button>
          <Button
            py="1"
            bg={type === "idn" ? "teal" : "blueGray.500"}
            onPress={() => setType("idn")}
          >
            <Text fontSize="sm" fontWeight="semibold">
              IDN
            </Text>
          </Button>
        </HStack>
      </HStack>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <HStack mt="4" space={4}>
          {data?.map((item, idx) => (
            <VStack key={idx} space={2} mb={4}>
              <Box position="relative" w="100px" h="100px">
                <Image
                  source={{ uri: item?.profile?.image_square ?? item?.image }}
                  alt={item?.profile?.room_name}
                  w="100px"
                  h="100px"
                  borderRadius="md"
                />
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  bg="cyan.600"
                  px={2}
                  py={1}
                  borderTopLeftRadius="md"
                  borderBottomRightRadius="md"
                >
                  <Text color="white" fontWeight="bold" fontSize="xs">
                    #{item.rank}
                  </Text>
                </Box>
              </Box>
              <HStack space={2} alignItems="center">
                <Text fontSize={14} fontWeight="semibold">
                  {item?.total_live}x Live
                </Text>
              </HStack>
            </VStack>
          ))}
        </HStack>
      </ScrollView>
      <HStack space={2}>
        <Button py="1.5" bg="blueGray.600" borderRadius="md">
          <HStack space={2}>
            <Calendar />
            <Text fontWeight="semibold">12 - 19 January 2025</Text>
          </HStack>
        </Button>
        <Button flex={1} py="1.5" bg="blueGray.500" borderRadius="md">
          <HStack alignItems="center" space={2}>
            <LiveIcon size={15} />
            <Text fontWeight="semibold">Total Stream: 10</Text>
          </HStack>
        </Button>
      </HStack>
      <Divider my="4" />
    </View>
  );
};

export default TopMember;
