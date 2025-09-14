import { apiUser, apiNest, ENDPOINTS } from "../config";

export const getCurrentVersion = () => {
  return apiUser.get(ENDPOINTS.VERSIONS.CURRENT_VERSION);
};

export const getChangeLogVersion = () => {
  return apiNest.get(ENDPOINTS.VERSIONS.CHANGE_LOG);
}