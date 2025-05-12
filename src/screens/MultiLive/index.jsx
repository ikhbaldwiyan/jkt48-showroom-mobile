import React from "react";
import { useRefresh } from "../../utils/hooks";

import IDNLive from "../../components/organisms/IDNLive";
import Layout from "../../components/templates/Layout";
import ShowroomMulti from "./components/ShowroomMulti";

const MultiLive = () => {
  const { refreshing, onRefresh } = useRefresh();

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <ShowroomMulti />
      <IDNLive isMultiLive />
    </Layout>
  );
};

export default MultiLive;
