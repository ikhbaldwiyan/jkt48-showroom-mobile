import React from "react";
import { Box, Text } from "native-base";
import Layout from "../../components/templates/Layout";

import Schedule from "../../components/organisms/Schedule";
import { useRefresh } from "../../utils/hooks/useRefresh";

const ThetaerList = () => {
  const { refreshing, onRefresh } = useRefresh();

  return (
    <Layout isHeader refreshing={refreshing} onRefresh={onRefresh}>
      <Box mb="4">
        <Schedule refreshing={refreshing} />
      </Box>
    </Layout>
  );
};

export default ThetaerList;
