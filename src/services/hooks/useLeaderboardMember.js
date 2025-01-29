import { useQuery } from "@tanstack/react-query";
import { getLeaderboardIDN, getLeaderboardShowroom } from "../leaderboard";

export const useLeaderboardMember = ({ page, month, year, type }) => {
  const params = {
    page,
    filterBy: month !== "" ? "month" : "",
    month,
    year,
    type
  };

  return useQuery({
    queryKey: ["topMember", params],
    queryFn: async () => {
      const response =
        type === "showroom"
          ? await getLeaderboardShowroom(params)
          : await getLeaderboardIDN(params);
      const data = response?.data;
      return {
        data: data?.data,
        totalData: data?.totalData,
        currentPage: data?.currentPage,
        filterDate: data?.filterDate
      };
    },
    onError: (error) => {
      console.log("Error fetching leaderboard data:", error);
    }
  });
};
