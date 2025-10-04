import { useQuery } from "@tanstack/react-query";
import { getMemberProfile } from "../members";


export const useMemberProfile = (category, search) => {
  return useQuery({
    queryKey: ["memberProfile", category, search],
    queryFn: async () => {
      const response = await getMemberProfile(category, search);
      return response?.data?.data;
    },
    retry: 0
  });
};