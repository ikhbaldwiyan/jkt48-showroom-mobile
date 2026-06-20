import { ENDPOINTS, apiReplay } from "../config";

export const getReplays = () => {
  return apiReplay.get(ENDPOINTS.REPLAY.LIST);
};

export const getReplayDetail = (id) => {
  return apiReplay.get(`${ENDPOINTS.REPLAY.LIST}/${id}`);
};

