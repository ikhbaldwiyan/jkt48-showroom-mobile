import { AUTH, ROOMS } from "..";
import { useQuery } from "@tanstack/react-query";

export const useProfile = (userId) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await AUTH.detailUserApi(userId);
      return response?.data;
    },
  });
};
