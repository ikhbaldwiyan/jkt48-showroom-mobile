import { ENDPOINTS, apiShowroom   } from "../config";

export const getStreamUrl = (roomId, cookies) => {
  return apiShowroom.get(ENDPOINTS.STREAM.URL + roomId + "/" + cookies );
};


