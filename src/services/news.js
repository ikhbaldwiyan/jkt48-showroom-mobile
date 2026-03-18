import { ENDPOINTS, apiHistory } from "../config";

export const getNews = (page = 1) => {
  return apiHistory.get(`${ENDPOINTS.NEWS.LIST}?page=${page}`);
};

export const getNewsDetail = (id) => {
  return apiHistory.get(`${ENDPOINTS.NEWS.LIST}/${id}`);
};

