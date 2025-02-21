import { useQuery } from "@tanstack/react-query";
import { USER } from "..";

export const useMostWatchIDN = (userId) => {
  return useQuery({
    queryKey: ["mostWatchIDN", userId],
    queryFn: async () => {
      const response = await USER.getMostWatchIDN(userId);
      return response?.data || [];
    },
    enabled: !!userId
  });
};
