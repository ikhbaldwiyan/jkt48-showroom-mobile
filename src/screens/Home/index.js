import React from "react";
import { Box, ScrollView, Text } from "native-base";
import Layout from "../../components/templates/Layout";
import RoomLive from "../../components/molecules/RoomLive";
import RoomList from "../../components/molecules/RoomList";

const Home = () => {
  return (
    <Layout>
      <Box flex="1" p={3}>
        <ScrollView>
          <RoomLive />
          <RoomList />
        </ScrollView>
      </Box>
    </Layout>
  );
};

export default Home;
