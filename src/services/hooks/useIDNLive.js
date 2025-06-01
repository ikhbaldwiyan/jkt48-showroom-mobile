import { ROOMS } from "..";
import { useQuery } from "@tanstack/react-query";

export const useIDNLive = () => {
  return useQuery({
    queryKey: ["idnLives"],
    queryFn: async () => {
      const response = await ROOMS.getIDNLIveRoom();
      const data = response?.data || [];

      // Sort by highest viewers
      return data.sort((a, b) => b.view_count - a.view_count);
    },
  });
};
