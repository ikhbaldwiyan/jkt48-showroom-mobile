import React from "react";
import Layout from "../../components/templates/Layout";
import { Box } from "native-base";
import {
  IDNLIve,
  ShowroomLive,
  PremiumLive,
  RecentLives,
  Schedule,
} from "../../components/organisms";
import { useRefresh } from "../../utils/hooks/useRefresh";

const Home = ({ navigation }) => {
  const { refreshing, onRefresh } = useRefresh();

  return (
    <Layout isHeader refreshing={refreshing} onRefresh={onRefresh}>
      <Box flex="1" mb="6">
        <PremiumLive refreshing={refreshing} />
        <ShowroomLive refreshing={refreshing} />
        <IDNLIve refreshing={refreshing} />
        <RecentLives refreshing={refreshing} />
        <Schedule refreshing={refreshing} navigation={navigation} isWeek />
      </Box>
    </Layout>
  );
};

export default Home;
