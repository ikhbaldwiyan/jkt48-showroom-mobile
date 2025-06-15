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

export const updateProfile = (payload) => {
  return apiAuth.post(ENDPOINTS.USER.UPDATE_PROFILE, payload);
};

export const updateUserProfile = (payload) => {
  return apiUser.put(ENDPOINTS.USER.UPDATE_USER_PROFILE + payload?.user_id, payload);
};

export const getProfile = (payload) => {
  return apiAuth.post(ENDPOINTS.USER.USER_PROFILE, payload);
};

export const getMostWatchIDN = (userId) => {
  return apiAdmin.get(ENDPOINTS.USER.MOST_WATCH_IDN + userId);
};
