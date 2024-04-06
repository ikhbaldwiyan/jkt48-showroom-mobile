import React from "react";
import Layout from "../../components/templates/Layout";
import { Box } from "native-base";
import { IDNLIve, PremiumLive, RoomList, RoomLive } from "../../components/organisms";

const Home = () => {
  return (
    <Layout isHeader>
      <Box flex="1" mb="6">
        <PremiumLive />
        <RoomLive />
        <RoomList />
        <IDNLIve />
      </Box>
    </Layout>
  );
};

export default Home;
