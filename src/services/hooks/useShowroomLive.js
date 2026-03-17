import { ROOMS, STREAM } from "..";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useShowroomLive = () => {
  return useQuery({
    queryKey: ["showroomLive"],
    queryFn: async () => {
      const response = await ROOMS.getRoomLive();
      return response?.data.data;
    },
  });
};

export function useLiveInfo(roomId, cookieLoginId) {
  return useQuery({
    queryKey: ["liveInfo", roomId],
    queryFn: async () => {
      const res = await STREAM.getStreamInfo(roomId, cookieLoginId ?? "cookies");
      return res.data;
    },
    enabled: !!roomId,
    refetchInterval: 5 * 60 * 1000, // refetch query every 5 minutes
  });
}

export function useStreamUrl(roomId, cookieLoginId) {
  return useQuery({
    queryKey: ["streamUrl", roomId],
    queryFn: async () => {
      const res = await STREAM.getStreamUrl(roomId, cookieLoginId);
      return res?.data?.[0]?.url ?? null;
    },
    enabled: !!roomId,
  });
}

export function useStreamOptions(roomId, cookieLoginId) {
  return useQuery({
    queryKey: ["streamOptions", roomId],
    queryFn: async () => {
      const res = await STREAM.getStreamUrlOptions(roomId, cookieLoginId);
      return res?.data ?? [];
    },
    enabled: !!roomId,
  });
}

export function useRegisterUserRoom() {
  return useMutation({
    mutationFn: async ({ session, profile }) => {
      return STREAM.visitRoom({
        cookies_login_id: session?.cookie_login_id,
        room_id: profile?.room_id,
      });
    },
  });
}