import { ENDPOINTS, apiUser } from "../config";

export const getScheduleList = () => {
  return apiUser.get(ENDPOINTS.SCHEDULE.LIST);
};

export const getScheduleWeek = () => {
  return apiUser.get(ENDPOINTS.SCHEDULE.WEEK);
};

export const getScheduleDetail = (id) => {
  return apiUser.get(ENDPOINTS.SCHEDULE.DETAIL + id);
};