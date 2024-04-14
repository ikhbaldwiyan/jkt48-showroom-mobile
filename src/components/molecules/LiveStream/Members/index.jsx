import { HStack, Image, ScrollView, Text, View, VStack } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { STREAM } from "../../../../services";

export const Members = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function getMemberTheater() {
      const response = await STREAM.getTodaySchedule();
      setMembers(response.data.memberList);
    }
    getMemberTheater();
  }, []);

  return (
    <LinearGradient
      colors={["#24A2B7", "#3B82F6"]}
      style={styles.linearGradient}
    >
      <ScrollView>
        {members?.length ? (
          Array.from(
            { length: Math.ceil(members.length / 4) },
            (_, rowIndex) => (
              <HStack key={rowIndex} space="2" alignItems="center">
                {members
                  .slice(rowIndex * 4, rowIndex * 4 + 4)
                  .map((member, idx) => (
                    <VStack
                      key={idx}
                      py="2"
                      alignItems="center"
                      justifyItems="center"
                      justifyContent="space-around"
                    >
                      <Image
                        alt={member.name}
                        style={{ width: 70, height: 92 }}
                        source={{ uri: member?.image }}
                        rounded="lg"
                      />
                      <View justifyContent="center" alignItems="center">
                        <Text mt="1" fontSize="md" fontWeight="semibold">
                          {member.stage_name}
                        </Text>
                      </View>
                    </VStack>
                  ))}
              </HStack>
            )
          )
        ) : (
          <Text>No members found.</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  }
});
