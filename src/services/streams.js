import { ENDPOINTS, apiShowroom, apiUser, apiAuth } from "../config";

export const getStreamUrl = (roomId, cookies) => {
  return apiShowroom.get(ENDPOINTS.STREAM.URL + roomId + "/" + cookies );
};

export const getStreamInfo = (roomId, cookies) => {
  return apiShowroom.get(ENDPOINTS.STREAM.INFO + roomId + "/" + cookies );
};

export const getStreamComments = (roomId, cookies) => {
  return apiShowroom.get(ENDPOINTS.STREAM.COMMENTS + roomId + "/" + cookies );
};

export const getTodaySchedule = () => {
  return apiUser.get(ENDPOINTS.SCHEDULE.TODAY);
};

export const getLivePodium = (roomId) => {
  return apiUser.get(ENDPOINTS.STREAM.PODIUM + roomId);
};

export const getIDNLivePodium = (roomId) => {
  return apiUser.get(ENDPOINTS.IDN_LIVE.PODIUM + roomId);
};

export const sendCommentStream = (params) => {
  return apiAuth.post(ENDPOINTS.STREAM.SEND_COMMENT, params)
}

export const visitRoom = (params) => {
  return apiAuth.post(ENDPOINTS.STREAM.VISIT, params)
}

export const getPremiumLiveToday = () => {
  return apiUser.get(ENDPOINTS.STREAM.PREMIUM_LIVE)
}