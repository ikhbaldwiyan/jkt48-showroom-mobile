import { useMutation, useQuery } from "@tanstack/react-query";
import { MEMBERS } from "..";

export const useMemberProfile = (category, search) => {
  return useQuery({
    queryKey: ["memberProfile", category, search],
    queryFn: async () => {
      const response = await MEMBERS.getMemberProfile(category, search);
      return response?.data?.data;
    },
    retry: 0
  });
};

export const useUpdateOshimen = () => {
  return useMutation({
    mutationFn: (payload) => MEMBERS.updateOshimen(payload),
  });;
}