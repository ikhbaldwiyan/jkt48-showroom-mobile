import { ENDPOINTS, apiShowroom, apiAuth  } from "../config";

export const getRoomList = () => {
  return apiShowroom.get(ENDPOINTS.ROOM.LIST);
};

export const getRoomLive = () => {
  return apiShowroom.get(ENDPOINTS.ROOM.ONLIVES);
};

export const getRoomGen10 = () => {
  return apiShowroom.get(ENDPOINTS.ROOM.GEN_10);
};

export const getRoomProfile = (params) => {
  return apiAuth.post(ENDPOINTS.ROOM.PROFILE, params);
};
