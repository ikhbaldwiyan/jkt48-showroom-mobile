import { useQuery } from "@tanstack/react-query";
import { REPLAY } from "..";

export const useReplaylist = () => {
  return useQuery({
    queryKey: ["replaylist"],
    queryFn: async () => {
      const response = await REPLAY.getReplays();
      return response?.data;
    },
  });
};

export const useReplayDetail = (id) => {
  return useQuery({
    queryKey: ["replay-detail", id],
    queryFn: async () => {
      const response = await REPLAY.getReplayDetail(id);
      return response?.data;
    },
    enabled: !!id,
  });
};

