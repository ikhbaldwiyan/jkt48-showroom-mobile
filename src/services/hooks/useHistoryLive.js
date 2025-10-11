import { ROOMS, STREAM } from "..";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

// Basic query hook for single page data
export const useHistoryLive = (type = "all", search = "", page = 1) => {
  return useQuery({
    queryKey: ["historyLive", type, search, page],
    queryFn: async () => {
      const response = await ROOMS.getHistoryLives(type, search, page);
      return response?.data || { recents: [] };
    },
  });
};

// Infinite scroll hook for paginated data
export const useHistoryLiveInfinite = (type = "all", search = "") => {
  return useInfiniteQuery({
    queryKey: ["historyLiveInfinite", type, search],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await ROOMS.getHistoryLives(type, search, pageParam);
      return response?.data || { recents: [] };
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.recents.length === 0) return undefined;
      return pages.length + 1;
    },
    initialPageParam: 1,
  });
};

export const useHistoryLiveDetail = (id) => {
  return useQuery({
    queryKey: ["historyLiveDetail", id],
    queryFn: async () => {
      const response = await ROOMS.getHistoryLiveDetail(id);
      return response?.data;
    },
  });
};

export const usePodiumList = (platform, liveId) => {
  return useQuery({
    queryKey: ["historyLiveDetail", platform, liveId],
    queryFn: async () => {
      const response =
        platform === "showroom"
          ? await STREAM.getLivePodium(liveId)
          : await STREAM.getIDNLivePodium(liveId);
      return response?.data;
    },
  });
};


export const useHistoryDetail = (platform, liveId) => {
  return useQuery({
    queryKey: ["historyLiveDetailPlatform", platform, liveId],
    queryFn: async () => {
      const response =
        platform === "showroom"
          ? await ROOMS.getHistoryLiveShowroom(liveId)
          : await ROOMS.getHistoryLiveIDN(liveId);
      return response?.data?.data;
    },
  });
};
