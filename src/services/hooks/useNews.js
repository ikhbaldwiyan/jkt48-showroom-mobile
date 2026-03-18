import { useQuery } from "@tanstack/react-query";
import { NEWS } from "..";

export const useNews = (page = 1) => {
  return useQuery({
    queryKey: ["news", page],
    queryFn: async () => {
      const response = await NEWS.getNews(page);
      return response?.data;
    },
  });
};

export const useNewsDetail = (id) => {
  return useQuery({
    queryKey: ["news-detail", id],
    queryFn: async () => {
      const response = await NEWS.getNewsDetail(id);
      return response?.data;
    },
    enabled: !!id,
  });
};

