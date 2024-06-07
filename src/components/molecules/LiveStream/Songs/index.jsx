import { Box, HStack, ScrollView, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { STREAM } from "../../../../services";
import CardGradient from "../../../atoms/CardGradient";

export const Songs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function getSetlistSongs() {
      const response = await STREAM.getTodaySchedule();
      setSongs(response.data.setlist.songs);
    }
    getSetlistSongs();
  }, []);

  return (
    <CardGradient
    >
      <ScrollView>
        <Box p="2">
          <VStack space={2}>
            {songs?.map((item, idx) => (
              <HStack space={3}>
                <Text fontWeight="semibold" fontSize="md">
                  {idx + 1}.
                </Text>
                <Text fontWeight="semibold" fontSize="md">
                  {item?.title}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      </ScrollView>
    </CardGradient>
  );
};


