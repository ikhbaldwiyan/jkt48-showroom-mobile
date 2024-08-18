import { ENDPOINTS, apiShowroom, apiAuth, apiHistory  } from "../config";

export const getRoomList = () => {
  return apiShowroom.get(ENDPOINTS.ROOM.LIST);
};

export const getRoomLive = () => {
  return apiShowroom.get(ENDPOINTS.ROOM.ONLIVES);
};

export const getRoomGen10 = () => {
  return apiShowroom.get(ENDPOINTS.ROOM.GEN_10);
};

export const getRoomRegular = () => {
  return apiShowroom.get(ENDPOINTS.ROOM.LIST);
};

export const getRoomTrainee = () => {
  return apiShowroom.get(ENDPOINTS.ROOM.TRAINEE);
};

export const getRoomProfile = (params) => {
  return apiAuth.post(ENDPOINTS.ROOM.PROFILE, params);
};

export const followRoom = (params) => {
  return apiAuth.post(ENDPOINTS.ROOM.FOLLOW, params);
};

export const getIDNLIveRoom = () => {
  return apiHistory.get(ENDPOINTS.IDN_LIVE.ROOM_LIVES);
};

export const getRecentLives = () => {
  return apiHistory.get(ENDPOINTS.ROOM.RECENT_LIVE);
};

export const getHistoryProfile = (roomId) => {
  return apiHistory.get(`${ENDPOINTS.ROOM.HISTORY_LIVE_PROFILE}&room_id=${roomId}`);
};

export const getHistoryLives = (type, search) => {
  return apiHistory.get(`${ENDPOINTS.ROOM.HISTORY_LIVE}&type=${type}&filter=${type}&search=${search}`);
};