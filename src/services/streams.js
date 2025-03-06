import axios from "axios";
import { JKT48_SHOWROOM_API } from "@env";
import {
  ENDPOINTS,
  apiShowroom,
  apiUser,
  apiAuth,
  apiHistory,
  apiPodium,
} from "../config";

export const getStreamUrl = (roomId, cookies) => {
  return apiShowroom.get(ENDPOINTS.STREAM.URL + roomId + "/" + cookies);
};

export const getStreamUrlOptions = (roomId, cookies) => {
  return apiShowroom.get(
    ENDPOINTS.STREAM.URL + roomId + "&abr_available=1" + "/" + cookies
  );
};

export const getStreamInfo = (roomId, cookies) => {
  return apiShowroom.get(ENDPOINTS.STREAM.INFO + roomId + "/" + cookies);
};

export const getStreamComments = (roomId, cookies) => {
  return apiShowroom.get(ENDPOINTS.STREAM.COMMENTS + roomId + "/" + cookies);
};

export const getTodaySchedule = () => {
  return apiUser.get(ENDPOINTS.SCHEDULE.TODAY);
};

export const getLivePodium = (roomId) => {
  return apiPodium.get(ENDPOINTS.STREAM.PODIUM + roomId);
};

export const getIDNLivePodium = (roomId) => {
  return apiPodium.get(ENDPOINTS.IDN_LIVE.PODIUM + roomId);
};

export const getIDNLiveDetail = (username) => {
  return apiHistory.get(`${ENDPOINTS.IDN_LIVE.DETAIL}/${username}/idn`);
};

export const sendCommentStream = (params) => {
  return apiAuth.post(ENDPOINTS.STREAM.SEND_COMMENT, params);
};

export const visitRoom = (params) => {
  return apiAuth.post(ENDPOINTS.STREAM.VISIT, params);
};

export const getPremiumLiveToday = () => {
  return apiUser.get(ENDPOINTS.STREAM.PREMIUM_LIVE);
};

export const getRankShowroom = (roomId) => {
  return apiShowroom.get(ENDPOINTS.STREAM.RANK + roomId + "/rank");
};

export const getChatIDN = (username, slug) => {
  return axios.get(
    `${JKT48_SHOWROOM_API}/scrapper/channel-id?username=${username}&slug=${slug}`
  );
};
