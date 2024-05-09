import { Box } from "native-base";
import React from "react";
import RoomRegular from "../../components/organisms/RoomRegular";
import Layout from "../../components/templates/Layout";

const MemberList = () => {
  return (
    <Layout isHeader>
      <Box flex="1" mb="6">
        <RoomRegular />
      </Box>
    </Layout>
  );
};

export default MemberList;
