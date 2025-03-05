import { apiUser, apiAuth, ENDPOINTS, apiAdmin } from "../config";

export const postActivityLog = (params) => {
  return apiUser.post(ENDPOINTS.USER.ACTIVIY_LOG, params);
};

export const postRegisterUser = (params) => {
  return apiUser.post(ENDPOINTS.USER.CREATE_USER, params);
};

export const getDonatorList = () => {
  return apiUser.get(ENDPOINTS.USER.DONATOR);
};

export const getAvatarList = (params) => {
  return apiAuth.post(ENDPOINTS.USER.AVATAR, params);
};

export const updateAvatar = (params) => {
  return apiAuth.post(ENDPOINTS.USER.UPDATE_AVATAR, params);
};

export const getMostWatchIDN = (userId) => {
  return apiAdmin.get(ENDPOINTS.USER.MOST_WATCH_IDN + userId);
};
