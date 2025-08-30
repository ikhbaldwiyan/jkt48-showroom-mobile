import { CHAT } from "..";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useOnlineUsers = (isShowOnline) => {
  return useQuery({
    queryKey: ["onlineUsers"],
    queryFn: async () => {
      try {
        if (isShowOnline) {
          const response = await CHAT.getOnlineUsers()
          return response?.data;
        } else {
          return {
            onlineUsers: 0
          }
        }
      } catch (error) {
        console.error('Error fetching online users:', error);
        throw error;
      }
    },
  });
};

export const useRoomInfo = (params) => {
  return useQuery({
    queryKey: ["roomInfo", params],
    queryFn: async () => {
      const response = await CHAT.getRoomInfo(params)
      return response?.data;
    },
  })
}

export const useChatList = (params) => {
  return useQuery({
    queryKey: ["chatList", params],
    queryFn: async () => {
      const response = await CHAT.getChatList(params)
      return response?.data;
    },
  });
};

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (payload) => CHAT.postMessage(payload),
  });;
}

export const useDeleteMessage = () => {
  return useMutation({
    mutationFn: (payload) => CHAT.deleteMessage(payload),
  });;
}