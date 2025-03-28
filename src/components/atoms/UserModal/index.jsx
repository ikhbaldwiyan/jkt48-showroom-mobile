import React from "react";
import { AndroidIcon, Donate, IDCard, ThropyIcon } from "../../../assets/icon";
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Modal,
  Text,
  VStack
} from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { formatViews } from "../../../utils/helpers";
import Loading from "../../atoms/Loading";

const UserModal = ({ selectedUser, setSelectedUser, favMember, userInfo, showID = false }) => {
  const isMostWatch =
    userInfo?.watchShowroomMember > 1000 || userInfo?.watchLiveIDN > 1000;
  const isDonator = userInfo?.is_donator;
  const isDeveloper = userInfo?.is_developer;
  const topLeaderboard = userInfo?.top_leaderboard;

  return (
    selectedUser && (
      <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)}>
        <Modal.Content
          width="85%"
          height={(() => {
            const MODAL_HEIGHT = {
              DONATOR_WITH_TOP: "72%",
              SPECIAL_USER: "66%",
              WITH_ID: "62%",
              DEFAULT: "58%"
            };

            if (isDonator && topLeaderboard) return MODAL_HEIGHT.DONATOR_WITH_TOP;
            if (isDonator || isDeveloper || topLeaderboard) return MODAL_HEIGHT.SPECIAL_USER;
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
                <Text
                  mt="1"
                  textAlign="center"
                  fontSize="sm"
                  color="white"
                >
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
                    source={{ uri: selectedUser.avatar }}
                    alt="avatar"
                    defaultSource={require("../../../assets/image/ava.png")}
                  />
                </Box>
                {isDonator && (
                  <HStack
                    py="1.5"
                    px="3"
                    space={2}
                    alignItems="center"
                    bg="#E49C20"
                    borderRadius="10"
                    shadow={4}
                  >
                    <Donate size={18} color="white" />
                    <Text fontSize="15" fontWeight="bold" color="white">
                      Donator
                    </Text>
                  </HStack>
                )}
                {isDeveloper && (
                  <HStack
                    py="1.5"
                    px="3"
                    space={2}
                    alignItems="center"
                    bgColor="teal"
                    borderWidth="1"
                    borderColor="gray.300"
                    borderRadius="10"
                    shadow={4}
                  >
                    <AndroidIcon size={16} color="white" />
                    <Text fontSize="15" fontWeight="bold" color="white">
                      Developer
                    </Text>
                  </HStack>
                )}
                {topLeaderboard && (
                  <HStack
                    py="1.5"
                    px="3"
                    space={2}
                    alignItems="center"
                    bgColor="blueLight"
                    borderRadius="10"
                    shadow={4}
                  >
                    <ThropyIcon size={16} color="#24A2B7" />
                    <Text fontSize="15" fontWeight="bold" color="primary">
                      Top Leaderboard
                    </Text>
                  </HStack>
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
