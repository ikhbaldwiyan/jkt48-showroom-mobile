import { apiUser, ENDPOINTS } from "../config";

export const postActivityLog = (params) => {
  return apiUser.post(ENDPOINTS.USER.ACTIVIY_LOG, params);
};

export const postRegisterUser = (params) => {
  return apiUser.post(ENDPOINTS.USER.CREATE_USER, params);
};

export const getDonatorList = () => {
  return apiUser.get(ENDPOINTS.USER.DONATOR);
};