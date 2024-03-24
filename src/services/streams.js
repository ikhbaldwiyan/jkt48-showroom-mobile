import { ENDPOINTS, apiShowroom, apiUser } from "../config";

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

