import useAuthStore from "../../store/authStore";

const useUser = () => {
  const { profile, userProfile, user, session } = useAuthStore.getState();

  return { profile, userProfile, user, session };
};

export default useUser;
