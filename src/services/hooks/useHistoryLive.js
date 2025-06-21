import { ROOMS } from "..";
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