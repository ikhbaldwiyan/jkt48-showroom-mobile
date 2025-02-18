import React from "react";
import { IDCard, StarIcon } from "../../../assets/icon";
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

const UserModal = ({ selectedUser, setSelectedUser }) => {
  const isDonator = false;

  return (
    selectedUser && (
      <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)}>
        <Modal.Content
          width="85%"
          height={isDonator ? "65%" : "60%"}
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
                  />
                </Box>
                {isDonator && (
                  <HStack
                    py="1.5"
                    px="3"
                    space={2}
                    alignItems="center"
                    bgColor="#EBC840"
                    borderRadius="10"
                  >
                    <StarIcon size={16} color="#434A52" />
                    <Text fontSize="15" fontWeight="bold" color="#434A52">
                      Donator
                    </Text>
                  </HStack>
                )}
                <LinearGradient
                  colors={["#495057", "#282C34"]}
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    width: "100%"
                  }}
                >
                  <Box p="3.5" py="3">
                    <HStack
                      space={2.5}
                      alignItems="center"
                      justifyContent="center"
                    >
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
                        style={{ width: 110, height: 65, borderRadius: 8 }}
                        source={{
                          uri: "https://static.showroom-live.com/image/room/cover/58f3d939319e28956fd771e0f587a347ea0fec6b5c3415067e122f4794fd3514_m.jpeg?v=1716898519"
                        }}
                      />
                      <VStack>
                        <Text fontSize="16" fontWeight="semibold">
                          Indah JKT48
                        </Text>
                        <Text>48x Watch</Text>
                      </VStack>
                    </HStack>
                  </Box>
                </LinearGradient>
                <HStack space={8}>
                  <VStack alignItems="center" space={2}>
                    <Text color="blueLight" fontWeight="semibold">
                      Watch Showroom
                    </Text>
                    <Box
                      bgColor="blueLight"
                      p="2"
                      py="1"
                      width="60"
                      borderRadius={8}
                    >
                      <Text
                        color="primary"
                        fontWeight="extrabold"
                        textAlign="center"
                        fontSize="15"
                      >
                        200x
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
                      width="60"
                      borderRadius={8}
                    >
                      <Text
                        color="primary"
                        fontWeight="extrabold"
                        textAlign="center"
                        fontSize="15"
                      >
                        200x
                      </Text>
                    </Box>
                  </VStack>
                </HStack>
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
