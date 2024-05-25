import { apiUser, ENDPOINTS } from "../config";

export const getCurrentVersion = () => {
  return apiUser.get(ENDPOINTS.VERSIONS.CURRENT_VERSION);
};
