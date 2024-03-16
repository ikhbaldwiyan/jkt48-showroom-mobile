import React from "react";
import Layout from "../../components/templates/Layout";
import { Box, ScrollView } from "native-base";
import { IDNLIve, PremiumLive, RoomList, RoomLive } from "../../components/organisms";

const Home = () => {
  return (
    <Layout>
      <ScrollView>
        <Box flex="1" p={3}>
          <PremiumLive />
          <RoomLive />
          <IDNLIve />
          <RoomList />
        </Box>
      </ScrollView>
    </Layout>
  );
};

export default Home;
