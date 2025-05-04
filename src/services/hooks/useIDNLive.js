import { ROOMS } from "..";
import { useQuery } from "@tanstack/react-query";

export const useIDNLive = () => {
  return useQuery({
    queryKey: ["idnLives"],
    queryFn: async () => {
      const response = await ROOMS.getIDNLIveRoom();
      return response?.data;
    },
  });
};
