import { ENDPOINTS, apiUser, apiNest } from "../config";

export const getScheduleList = (params) => {
  return apiNest.get(ENDPOINTS.SCHEDULE.LIST, { params });
};

export const getScheduleWeek = () => {
  return apiUser.get(ENDPOINTS.SCHEDULE.WEEK);
};

export const getScheduleDetail = (id) => {
  return apiUser.get(ENDPOINTS.SCHEDULE.DETAIL + id);
};