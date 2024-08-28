import { ENDPOINTS, apiUser } from "../config";

export const getScheduleList = (page) => {
  return apiUser.get(ENDPOINTS.SCHEDULE.LIST + `?page=${page}&paginate=true`);
};

export const getScheduleWeek = () => {
  return apiUser.get(ENDPOINTS.SCHEDULE.WEEK);
};

export const getScheduleDetail = (id) => {
  return apiUser.get(ENDPOINTS.SCHEDULE.DETAIL + id);
};