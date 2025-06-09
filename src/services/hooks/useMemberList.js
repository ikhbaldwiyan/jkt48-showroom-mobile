import { useQuery } from "@tanstack/react-query";
import { getRoomRegular, getRoomTrainee, getRoomGen10 } from "../rooms";

export const useMemberList = ({ type = "regular", searchQuery = "" }) => {
  return useQuery({
    queryKey: ["memberList", type, searchQuery],
    queryFn: async () => {
      if (type === "regular") {
        const [regularResponse, gen10Response] = await Promise.all([
          getRoomRegular(),
          getRoomGen10()
        ]);
        return [...regularResponse.data, ...gen10Response.data];
      } else {
        const response = await getRoomTrainee();
        return response.data;
      }
    },
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cache kept for 30 minutes
    onError: (error) => {
      console.error("Error fetching member list:", error);
    }
  });
};