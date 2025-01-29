import { apiAdmin, ENDPOINTS } from "../config";

export const getLeaderboardShowroom = (params) => {
  return apiAdmin.get(`${ENDPOINTS.LEADERBOARD.SHOWROOM}`, {
    params
  });
};

export const getLeaderboardIDN = (params) => {
  return apiAdmin.get(`${ENDPOINTS.LEADERBOARD.IDN}`, {
    params
  });
};
