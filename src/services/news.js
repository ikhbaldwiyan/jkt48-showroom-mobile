import { ENDPOINTS, apiNest } from "../config";

export const getNews = (page = 1) => {
  return apiNest.get(`${ENDPOINTS.NEWS.LIST}?page=${page}`);
};

export const getNewsDetail = (id) => {
  return apiNest.get(`${ENDPOINTS.NEWS.LIST}/${id}`);
};

