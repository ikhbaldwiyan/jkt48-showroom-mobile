import React, { useLayoutEffect, useState } from "react";
import { Box, CheckCircleIcon, Select } from "native-base";
import Layout from "../../components/templates/Layout";
import Schedule from "../../components/organisms/Schedule";
import { useRefresh } from "../../utils/hooks/useRefresh";
import { useNavigation } from "@react-navigation/native";
import { useFilterSetlist } from "../../services/hooks/useSchedules";

const ScheduleList = ({ navigation }) => {
  const { refreshing, onRefresh } = useRefresh();
  const { setOptions } = useNavigation();
  const { data } = useFilterSetlist();
  const [setlist, setSetlist] = useState("");

  useLayoutEffect(() => {
    setOptions({
      headerTitle: "Jadwal Theater"
    });
  }, [setOptions]);

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <Select
        selectedValue={setlist ?? ""}
        onValueChange={(value) => {
          setSetlist(value);
        }}
        placeholder="Filter Setlist"
        color="white"
        borderRadius="xl"
      >
        <Select.Item
          label="Semua Setlist"
          value=""
          endIcon={
            setlist === "" ? (
              <Box mt="1">
                <CheckCircleIcon size="4" color="primary" />
              </Box>
            ) : null
          }
        />
        {data?.map((item, idx) => (
          <Select.Item
            key={idx}
            label={item?.title}
            value={item?._id}
            endIcon={
              item?._id === setlist ? (
                <Box mt="1">
                  <CheckCircleIcon size="4" color="primary" />
                </Box>
              ) : null
            }
          />
        ))}
      </Select>
      <Box mt="2" mb="4">
        <Schedule
          navigation={navigation}
          setlistId={setlist}
          refreshing={refreshing}
        />
      </Box>
    </Layout>
  );
};

export default ScheduleList;
