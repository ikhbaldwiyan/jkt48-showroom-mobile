import React from "react";
import { Box, ScrollView } from "native-base";
import { RefreshControl } from "react-native";
import Header from "../Header";

const Layout = ({ children, isHeader, refreshing, onRefresh }) => {
  return (
    <>
      {isHeader && <Header />}
      <ScrollView
        flex="1"
        p="3"
        bg="secondary"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Box>{children}</Box>
      </ScrollView>
    </>
  );
};

export default Layout;
