import { ENDPOINTS, apiAuth } from "../config";

export const loginApi = (params) => {
  return apiAuth.post(ENDPOINTS.AUTH.LOGIN, params);
};

