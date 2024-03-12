import React from "react";
import { Box, Text } from "native-base";
import Layout from "../../components/templates/Layout";

const Home = () => {
  return (
    <Layout>
      <Box flex="1" justifyContent="center" alignItems="center">
        <Text color="white">Welcome To Home Screen</Text>
      </Box>
    </Layout>
  );
};

export default Home;
