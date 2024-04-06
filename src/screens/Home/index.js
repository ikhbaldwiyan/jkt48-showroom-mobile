import React from "react";
import Layout from "../../components/templates/Layout";
import { Box } from "native-base";
import { IDNLIve, PremiumLive, RoomList, RoomLive } from "../../components/organisms";
import { useRefresh } from "../../utils/hooks/useRefresh";

const Home = () => {
  const { refreshing, onRefresh } = useRefresh();

  return (
    <Layout isHeader refreshing={refreshing} onRefresh={onRefresh}>
      <Box flex="1" mb="6">
        <PremiumLive refreshing={refreshing} />
        <RoomLive refreshing={refreshing} />
        <RoomList refreshing={refreshing} />
        <IDNLIve refreshing={refreshing} />
      </Box>
    </Layout>
  );
};

export default Home;
