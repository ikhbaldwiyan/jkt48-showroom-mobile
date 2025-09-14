import { useQuery } from "@tanstack/react-query";
import { SCHEDULES } from "..";

export const useScheduleList = (params) => {
  return useQuery({
    queryKey: ["schedules", params],
    queryFn: async () => {
      const response = await SCHEDULES.getScheduleList(params);
      return response?.data?.data
    },
  });
};

export const useScheduleDetail = (id) => {
  return useQuery({
    queryKey: ["scheduleDetail", id],
    queryFn: async () => {
      const response = await SCHEDULES.getScheduleDetail(id);
      return response?.data
    },
  });
};