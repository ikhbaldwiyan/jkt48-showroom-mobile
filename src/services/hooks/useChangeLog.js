import { VERSION } from "..";
import { useQuery } from "@tanstack/react-query";

export const useChangeLogVersion = () => {
  return useQuery({
    queryKey: ["changeLog"],
    queryFn: async () => {
      const response = await VERSION.getChangeLogVersion();
      return response?.data?.data
    },
  });
};

export const useChangeLogVersionById = (version) => {
  return useQuery({
    queryKey: ["changeLogDetail"],
    queryFn: async () => {
      const response = await VERSION.getChangeLogVersionDetail(version);
      return response?.data?.data
    },
  });
};