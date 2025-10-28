import React, { useState } from "react";
import {
  Actionsheet,
  Box,
  Button,
  Divider,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack
} from "native-base";
import {
  useMemberProfile,
  useUpdateOshimen
} from "../../../services/hooks/useMembers";
import Loading from "../../../components/atoms/Loading";
import { TouchableOpacity } from "react-native";
import TabButton from "../../../components/atoms/TabButton";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../../utils/hooks";

const Oshimen = ({ isOpen, setIsOpen, isRegister = false, setOshimen }) => {
  const { user } = useUser();
  const [type, setType] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const { data: members, isLoading } = useMemberProfile(type, "");
  const updateOshimen = useUpdateOshimen();
  const queryClient = useQueryClient();

  const handleMemberSelect = (member) => {
    setSelectedMember(member);
  };

  const handleConfirmSelection = () => {
    if (selectedMember && !isRegister) {
      updateOshimen.mutate(
        {
          user_id: user?.account_id,
          oshimen_id: selectedMember?._id
        },
        {
          onSuccess: () => {
            setIsOpen(false);
            queryClient.invalidateQueries(["profile", user?.account_id]);
            queryClient.invalidateQueries(["scheduleOshimen", selectedMember?._id]);
          },
          onError: (error) => {
            console.log(error);
          }
        }
      );
    } else {
      setIsOpen(false)
      setOshimen(selectedMember)
    }
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Actionsheet.Content bg="blueGray.600" position="relative">
        <ScrollView mb="24">
          {!selectedMember && (
            <Text textAlign="center" fontWeight="medium" fontSize="lg">
              Pilih member kesukaanmu
            </Text>
          )}

          <HStack mt="3" space={2}>
            <TabButton
              type=""
              currentType={type}
              onPress={() => setType("")}
              label="All Member"
              background="blueGray.600"
            />
            <TabButton
              type="regular"
              currentType={type}
              onPress={() => setType("regular")}
              label="Regular"
              background="blueGray.600"
            />
            <TabButton
              type="trainee"
              currentType={type}
              onPress={() => setType("trainee")}
              label="Trainee"
              background="blueGray.600"
            />
          </HStack>

          <Divider mt="4" />
          <Box mt="2">
            {members?.length &&
              Array.from(
                { length: Math.ceil(members.length / 4) },
                (_, rowIndex) => (
                  <HStack
                    key={rowIndex}
                    space="2"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {members
                      .slice(rowIndex * 4, rowIndex * 4 + 4)
                      .map((member, idx) => {
                        const isSelected = selectedMember?._id === member._id;
                        return (
                          <TouchableOpacity
                            key={idx}
                            activeOpacity={0.7}
                            onPress={() => handleMemberSelect(member)}
                          >
                            <VStack py="2" alignItems="center">
                              <Image
                                alt="Member"
                                style={{ width: 70, height: 92 }}
                                source={{ uri: member?.image }}
                                rounded={isSelected ? "3xl" : "lg"}
                                borderWidth={isSelected ? 4 : 0}
                                borderColor={
                                  isSelected ? "cyan.600" : "transparent"
                                }
                              />
                              <Text mt="1" fontSize="md">
                                {member.stage_name}
                              </Text>
                            </VStack>
                          </TouchableOpacity>
                        );
                      })}
                  </HStack>
                )
              )}
            {isLoading && (
              <Box
                height={500}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Loading size={30} color="white" />
              </Box>
            )}
          </Box>
        </ScrollView>

        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          bg="blueGray.700"
          p="4"
          borderTopWidth="1"
          borderColor="blueGray.500"
        >
          <Button
            onPress={handleConfirmSelection}
            bg="primary"
            borderRadius="lg"
            py="2.5"
            isDisabled={!selectedMember}
            _disabled={{ bg: "gray.400", opacity: 0.5 }}
          >
            <Text color="white" fontSize="md" fontWeight="semibold">
              {selectedMember
                ? `Pilih ${selectedMember?.stage_name}`
                : "Klik foto member untuk memilih"}
            </Text>
          </Button>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default Oshimen;
