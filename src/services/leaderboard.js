import { apiAdmin, ENDPOINTS } from "../config";
import moment from 'moment';

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

export const getLeaderboardUser = (params) => {
  const queryParams = {
    page: params.page,
    filterBy: params.month !== "" ? "month" : "",
    month: params.month,
    platform: params.platform
  };
  
  return apiAdmin.get(`${ENDPOINTS.LEADERBOARD.USER}`, {
    params: queryParams
  });
};
