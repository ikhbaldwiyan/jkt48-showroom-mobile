import { apiAdmin, apiPublicChat, ENDPOINTS } from "../config";

export const getOnlineUsers = () => {
  return apiAdmin.post(ENDPOINTS.CHAT.ONLINE_USERS);
}

export const getChatList = (params) => {
  return apiPublicChat.get(ENDPOINTS.CHAT.LIST, { params });
}

export const postMessage = (payload) => {
  return apiPublicChat.post(ENDPOINTS.CHAT.SEND_MESSAGE, payload);
}
