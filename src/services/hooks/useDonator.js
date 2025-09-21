import { useQuery } from "@tanstack/react-query";
import { USER } from "..";

export const useDonatorUser = () => {
  return useQuery({
    queryKey: ["donator-user"],
    queryFn: async () => {
      const response = await USER.getDonatorUser();
      return response?.data?.data;
    },
  });
};