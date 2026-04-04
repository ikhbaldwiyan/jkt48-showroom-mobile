import { useMutation, useQuery } from "@tanstack/react-query";
import { MEMBERS } from "..";

export const useMemberProfile = (category, search, team) => {
  return useQuery({
    queryKey: ["memberProfile", category, search, team],
    queryFn: async () => {
      const response = await MEMBERS.getMemberProfile(category, search, team);
      return response?.data?.data;
    },
    retry: 0
  });
};

export const useMemberShowroomProfile = (roomId) => {
  return useQuery({
    queryKey: ["memberShowroomProfile", roomId],
    queryFn: async () => {
      const response = await MEMBERS.getMemberShowroomProfile(roomId);
      return response?.data?.data;
    },
    retry: 0
  });
};

export const useUpdateOshimen = () => {
  return useMutation({
    mutationFn: (payload) => MEMBERS.updateOshimen(payload),
  });
}

export const useScheduleOshimen = (memberId) => {
  return useQuery({
    queryKey: ["scheduleOshimen", memberId],
    queryFn: async () => {
      const response = await MEMBERS.getScheduleOshimen(memberId);
      return response?.data?.data;
    },
    retry: 0,
    enabled: !!memberId
  });
};

export const useTotalWatchMember = (userId) => {
  return useQuery({
    queryKey: ["watcheMember", userId],
    queryFn: async () => {
      const response = await MEMBERS.getWatchStreamMember(userId);
      return response?.data?.data;
    },
    enabled: !!userId
  });
};
