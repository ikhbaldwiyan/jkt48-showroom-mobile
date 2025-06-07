import { ROOMS } from "..";
import { useQuery } from "@tanstack/react-query";

export const useShowroomLive = () => {
  return useQuery({
    queryKey: ["showroomLive"],
    queryFn: async () => {
      const response = await ROOMS.getRoomLive();
      return response?.data.data;
    },
  });
};
