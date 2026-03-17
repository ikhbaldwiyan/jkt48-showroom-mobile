import { ROOMS, STREAM } from "..";
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

export const useIdnLiveDetail = (username, options = {}) => {
  return useQuery({
    queryKey: ["idnLiveDetail", username],
    queryFn: () => STREAM.getIDNLiveDetail(username).then((res) => res.data),
    enabled: !!username,
    staleTime: 60 * 1000, // cache 1 minute
    ...options,
  });
};

