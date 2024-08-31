import React, { useLayoutEffect } from "react";
import { Box } from "native-base";
import Layout from "../../components/templates/Layout";
import Schedule from "../../components/organisms/Schedule";
import { useRefresh } from "../../utils/hooks/useRefresh";
import { useNavigation } from "@react-navigation/native";

const ScheduleList = ({ navigation }) => {
  const { refreshing, onRefresh } = useRefresh();
  const { setOptions } = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: "Jadwal Theater"
    });
  }, [setOptions]);

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <Box mb="4">
        <Schedule navigation={navigation} refreshing={refreshing} />
      </Box>
    </Layout>
  );
};

export default ScheduleList;
