import React from "react";
import {
  AndroidIcon,
  Donate,
  IDCard,
  PencilIcon,
  ThropyIcon
} from "../../../assets/icon";
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Modal,
  Popover,
  Text,
  VStack
} from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { formatViews } from "../../../utils/helpers";
import Loading from "../../atoms/Loading";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useMostWatchIDN } from "../../../services/hooks/useMostWatchIDN";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useUser from "../../../utils/hooks/useUser";

const UserModal = ({
  selectedUser,
  setSelectedUser,
  showID = false,
  isEdit = false
}) => {
  const { profile } = useUser();
  const navigation = useNavigation();
  const { data: mostWatch } = useMostWatchIDN(selectedUser?._id);
  const favorite = Array.isArray(mostWatch?.data)
    ? mostWatch.data.filter((item) => item?.member?.name !== "JKT48")
    : [];
  const favMember = favorite[0]?.member?.name ? favorite[0] : favorite[1];
  const userInfo = mostWatch?.user;

  const isMostWatch =
    userInfo?.watchShowroomMember > 1000 || userInfo?.watchLiveIDN > 1000;
  const isDonator = userInfo?.is_donator;
  const isDeveloper = userInfo?.is_developer;
  const topLeaderboard = userInfo?.top_leaderboard;
  

  const badgeList = [
    {
      condition: topLeaderboard,
      icon: <ThropyIcon size={16} color="#24A2B7" />,
      label: "Top Leaderboard",
      desc: "Badge special karena masuk Top 10 Leaderboard bulanan",
      bg: "blueLight",
      textColor: "primary"
    },
    {
      condition: isDonator,
      icon: <Donate size={18} color="white" />,
      label: "Donator",
      desc: "Badge special Donator karena sudah support project JKT48 Showroom Fanmade",
      bg: "#E49C20",
      textColor: "white"
    },
    {
      condition: isDeveloper,
      icon: <AndroidIcon size={16} color="white" />,
      label: "Developer",
      desc: "Badge khusus Developer Aplikasi JKT48 Showroom Fanmade",
      bg: "teal",
      textColor: "white",
      border: {
        width: 1,
        color: "gray.300"
      }
    }
  ];

  return (
    selectedUser && (
      <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)}>
        <Modal.Content
          width="85%"
          height={(() => {
            const MODAL_HEIGHT = {
              DONATOR_WITH_TOP: "72%",
              SPECIAL_USER: "70%",
              WITH_ID: "62%",
              DEFAULT: "60%"
            };

            if (isDonator && topLeaderboard)
              return MODAL_HEIGHT.DONATOR_WITH_TOP;
            if (isDonator || isDeveloper || topLeaderboard)
              return MODAL_HEIGHT.SPECIAL_USER;
            if (showID) return MODAL_HEIGHT.WITH_ID;
            return MODAL_HEIGHT.DEFAULT;
          })()}
          borderRadius="10"
        >
          <LinearGradient
            colors={["#055D7E", "#009FCB"]}
            style={{
              flex: 1
            }}
          >
            <Box py="4" pb="2">
              <Text
                textAlign="center"
                fontSize="xl"
                fontWeight="bold"
                color="white"
              >
                {selectedUser?.name}
              </Text>
              {showID && (
                <Text mt="1" textAlign="center" fontSize="sm" color="white">
                  ID: {selectedUser?.user_id}
                </Text>
              )}
            </Box>
            <Modal.Body>
              <VStack space={4} alignItems="center">
                <Box
                  width="116"
                  height="113"
                  borderWidth="6px"
                  borderColor="white"
                  justifyContent="center"
                  alignItems="center"
                  backgroundColor="#808DA5"
                  borderRadius="full"
                >
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={{
                      uri: isEdit ? profile?.avatar_url : selectedUser.avatar
                    }}
                    alt="avatar"
                    defaultSource={require("../../../assets/image/ava.png")}
                  />
                  {isEdit && (
                    <Button
                      top="88"
                      bg="white"
                      borderColor="primary"
                      borderWidth="2"
                      position="absolute"
                      w="8"
                      h="8"
                      borderRadius="50"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      onPress={() => navigation.navigate("Avatar")}
                    >
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("Avatar")}
                      >
                        <PencilIcon size="14" />
                      </TouchableOpacity>
                    </Button>
                  )}
                </Box>
                {badgeList.map(
                  (badge, index) =>
                    badge.condition && (
                      <Popover
                        key={index}
                        trigger={(triggerProps) => (
                          <Pressable {...triggerProps}>
                            <HStack
                              mt={isEdit ? "2" : "0"}
                              py="1.5"
                              px="3"
                              space={2}
                              alignItems="center"
                              bg={badge.bg}
                              borderRadius="10"
                              shadow={4}
                              borderWidth={badge.border?.width}
                              borderColor={badge.border?.color}
                            >
                              {badge.icon}
                              <Text
                                fontSize="15"
                                fontWeight="bold"
                                color={badge.textColor}
                              >
                                {badge.label}
                              </Text>
                            </HStack>
                          </Pressable>
                        )}
                      >
                        <Popover.Content
                          shadow={3}
                          accessibilityLabel="Badge Info"
                          w="64"
                        >
                          <Popover.Arrow />
                          <Popover.Body>
                            <Text
                              textAlign="center"
                              fontSize="xs"
                              color="gray.800"
                            >
                              {badge.desc}
                            </Text>
                          </Popover.Body>
                        </Popover.Content>
                      </Popover>
                    )
                )}

                {userInfo ? (
                  <>
                    {favMember && (
                      <LinearGradient
                        colors={["#495057", "#282C34"]}
                        style={{
                          flex: 1,
                          borderRadius: 10,
                          width: "100%"
                        }}
                      >
                        <Box p="3.5" py="3">
                          <HStack space={2.5} alignItems="center">
                            <IDCard size={16} />
                            <Text
                              textAlign="center"
                              fontSize={15}
                              fontWeight="semibold"
                            >
                              Favorite Member
                            </Text>
                          </HStack>
                          <Divider my="2" mb="3" />
                          <HStack space={4} alignItems="center">
                            <Image
                              style={{ width: 70, height: 70, borderRadius: 8 }}
                              source={{
                                uri: favMember?.member?.image
                              }}
                              alt="member fav"
                            />
                            <VStack>
                              <Text fontSize="16" fontWeight="semibold">
                                {favMember?.member?.name}
                              </Text>
                              <Text>{favMember?.watch}x Watch</Text>
                            </VStack>
                          </HStack>
                        </Box>
                      </LinearGradient>
                    )}
                    <HStack space={isMostWatch ? 4 : 8}>
                      <VStack alignItems="center" space={2}>
                        <Text color="blueLight" fontWeight="semibold">
                          Watch Showroom
                        </Text>
                        <Box
                          bgColor="blueLight"
                          p="2"
                          py="1"
                          width={
                            userInfo?.watchShowroomMember > 1000 ? "70" : "60"
                          }
                          borderRadius={8}
                        >
                          <Text
                            color="primary"
                            fontWeight="extrabold"
                            textAlign="center"
                            fontSize="15"
                          >
                            {formatViews(userInfo?.watchShowroomMember)}x
                          </Text>
                        </Box>
                      </VStack>
                      <VStack alignItems="center" space={2}>
                        <Text color="blueLight" fontWeight="semibold">
                          Watch IDN Live
                        </Text>
                        <Box
                          bgColor="blueLight"
                          p="2"
                          py="1"
                          width={userInfo?.watchLiveIDN > 1000 ? "70" : "60"}
                          borderRadius={8}
                        >
                          <Text
                            color="primary"
                            fontWeight="extrabold"
                            textAlign="center"
                            fontSize="15"
                          >
                            {formatViews(userInfo?.watchLiveIDN)}x
                          </Text>
                        </Box>
                      </VStack>
                    </HStack>
                  </>
                ) : (
                  <Box
                    mt="8"
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Loading size={30} />
                  </Box>
                )}
              </VStack>
            </Modal.Body>
            <Modal.Footer py="2" bg="transparent">
              <Button onPress={() => setSelectedUser(null)}>
                <Text fontWeight="semibold">Close</Text>
              </Button>
            </Modal.Footer>
          </LinearGradient>
        </Modal.Content>
      </Modal>
    )
  );
};

export default UserModal;
