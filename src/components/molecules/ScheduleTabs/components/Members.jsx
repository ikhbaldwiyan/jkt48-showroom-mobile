import { useRoute } from "@react-navigation/native";
import { HStack, Image, ScrollView, Text, View, VStack } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SCHEDULES } from "../../../../services";

export const Members = () => {
  const route = useRoute();
  const { params } = route;
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function getTheaterDetail() {
      try {
        const response = await SCHEDULES.getScheduleDetail(params.item._id);
        setMembers(response.data.memberList);
      } catch (error) {
        console.log(error);
      }
    }
    getTheaterDetail();
  }, [params]);

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
                        alt="Member"
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