import { AUTH, USER } from "..";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, updateUserProfile } from "../user";

export const useProfile = (userId) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await AUTH.detailUserApi(userId);
      return response?.data;
    },
    enabled: !!userId,
  });
};

export const useShowroomProfile = (userId) => {
  return useQuery({
    queryKey: ["profile-showroom"],
    queryFn: async () => {
      const response = await USER.getProfile({ user_id: userId });
      console.log(response)
      return response?.data;
    },
    enabled: !!userId,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => updateProfile(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile-showroom"] });
    },
    onError: (error) => {
      console.log(error)
    }
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => updateUserProfile(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.log(error)
    }
  });
};
