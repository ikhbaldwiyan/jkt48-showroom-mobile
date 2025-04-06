import axios from "axios";
import useApiConfig from "../store/useApiConfig";

const getBaseURL = (key) => useApiConfig.getState()[key];

const createApiInstance = (key) =>
  axios.create({
    baseURL: getBaseURL(key),
  });

// Exporting API instances
export const apiShowroom = createApiInstance("SHOWROOM_API");
export const apiUser = createApiInstance("USER_API");
export const apiAuth = createApiInstance("AUTH_API");
export const apiHistory = createApiInstance("HISTORY_API");
export const apiAdmin = createApiInstance("JKT48_SHOWROOM_API");
export const apiPodium = createApiInstance("PODIUM_API");
export const apiRoomList = createApiInstance("ROOM_LIST_API");
