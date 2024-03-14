import React from "react";
import { Box, ScrollView, Text } from "native-base";
import Layout from "../../components/templates/Layout";
import RoomLive from "../../components/organisms/RoomLive";
import RoomList from "../../components/organisms/RoomList";
import IDNLIve from "../../components/organisms/IDNLive";

const Home = () => {
  return (
    <Layout>
      <ScrollView>
        <Box flex="1" p={3}>
          <RoomLive />
          <IDNLIve />
          <RoomList />
        </Box>
      </ScrollView>
    </Layout>
  );
};

export default Home;
