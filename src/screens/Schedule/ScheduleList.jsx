import React from "react";
import { Box } from "native-base";
import Layout from "../../components/templates/Layout";
import Schedule from "../../components/organisms/Schedule";
import { useRefresh } from "../../utils/hooks/useRefresh";

const ScheduleList = ({ navigation }) => {
  const { refreshing, onRefresh } = useRefresh();

  return (
    <Layout isHeader refreshing={refreshing} onRefresh={onRefresh}>
      <Box mb="4">
        <Schedule navigation={navigation} refreshing={refreshing} />
      </Box>
    </Layout>
  );
};

export default ScheduleList;
