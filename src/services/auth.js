import { ENDPOINTS, apiAuth, apiUser } from "../config";

export const loginApi = (params) => {
  return apiAuth.post(ENDPOINTS.AUTH.LOGIN, params);
};

export const regsiterApi = (params) => {
  return apiAuth.post(ENDPOINTS.AUTH.REGISTER, params);
};

export const detailUserApi = (id) => {
  return apiUser.get(ENDPOINTS.AUTH.DETAIL_USER + id);
};

