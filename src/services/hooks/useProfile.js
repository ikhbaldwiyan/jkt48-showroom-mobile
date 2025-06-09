import { AUTH } from "..";
import { useQuery } from "@tanstack/react-query";

export const useProfile = (userId) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const response = await AUTH.detailUserApi(userId);
      return response?.data;
    },
    enabled: !!userId,
  });
};
