import moment from "moment";
import { Box, HStack, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import {
  BirthdayIcon,
  Calendar,
  FireIcon,
  GraduateIcon,
  LoveIcon,
  StarIcon,
  TheaterIcon,
} from "../../../assets/icon";
import { useNavigation } from "@react-navigation/native";

export const getTeamBadge = (team) => {
  switch (team) {
    case "Team Love":
      return {
        color: "#CD4B96",
        icon: <LoveIcon color="#CD4B96" size="14" />,
      };
    case "Team Passion":
      return {
        color: "#F69220",
        icon: <FireIcon color="#F69220" size="14" />,
      };
    case "Team Dream":
      return {
        color: "#24A2B7",
        icon: <StarIcon color="#24A2B7" size="14" />,
      };
    case "Trainee":
      return {
        color: "#865CD6",
        icon: <GraduateIcon color="#865CD6" size="13" />,
      };
    case "JKT48":
      return {
        color: "#E13944",
        icon: <TheaterIcon color="#E13944" size="14" />,
      };
    default:
      return {
        color: "#CD4B96",
        icon: <TheaterIcon color="#CD4B96" size="14" />,
      };
  }
};

const ScheduleCard = ({ item, index }) => {
  const navigation = useNavigation();
  const badge = getTeamBadge(item?.setlist?.team);

  return (
    <Box pt={index === 0 || index === 1 ? 0 : 6}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("ScheduleDetail", { item })}
      >
        <VStack space={2} mr="3">
          <Box>
            <Image
              width="100%"
              height={140}
              source={{ uri: item?.setlist?.image }}
              borderRadius="xl"
              alt="Theater"
            />

            {(item?.isBirthdayShow || item?.isGraduationShow) && (
              <Box
                position="absolute"
                left={0}
                top={-0}
                bg="rgba(0, 0, 0, 0.5)"
                px="2"
                py="1"
                borderTopLeftRadius="xl"
                borderBottomRightRadius="lg"
              >
                <HStack alignItems="center" space={2}>
                  {item?.isBirthdayShow ? (
                    <BirthdayIcon size={14} />
                  ) : (
                    <GraduateIcon size={13} />
                  )}
                  <Text color="white" fontSize={10} fontWeight="bold">
                    {item?.isBirthdayShow
                      ? item?.birthdayMember?.name
                      : item?.graduateMember?.name}
                  </Text>
                </HStack>
              </Box>
            )}
          </Box>
          <Text fontSize={16} fontWeight="medium">
            {item?.setlist?.name.length > 16
              ? item?.setlist?.name.slice(0, 15) + "..."
              : item?.setlist?.name}
          </Text>
          {item?.setlist?.team &&
            moment(item?.showDate).isSameOrAfter("2026-04-01") && (
              <Box
                px="2"
                py="0.4"
                borderWidth={1}
                justifyContent="center"
                width="auto"
                bg="blueLight"
                borderRadius="lg"
                borderColor={badge.color}
              >
                <HStack alignItems="center" space={1.5}>
                  {badge.icon}
                  <Text color={badge.color} fontWeight="semibold" fontSize={13}>
                    {item?.setlist?.team}
                  </Text>
                </HStack>
              </Box>
            )}
          <HStack alignItems="center" space={1.5}>
            <Calendar size={14} color="#d4d4d8" />
            <Text fontSize={13} color="gray.300">
              {moment(item?.showDate).format("dddd, D MMM")} - {item?.showTime}
            </Text>
          </HStack>
        </VStack>
      </TouchableOpacity>
    </Box>
  );
};

export default ScheduleCard;
