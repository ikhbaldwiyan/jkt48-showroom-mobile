import useAuthStore from "../store/authStore";
import { postActivityLog, postRegisterUser } from "../services/user";
import messaging from "@react-native-firebase/messaging";

export const activityLog = async ({ userId, logName, description, liveId }) => {
  const { profile, user, userProfile, setUserProfile } = useAuthStore.getState();

  if (!userId) {
    try {
      const res = await postRegisterUser({
        user_id: user?.account_id,
        name: profile?.name,
        avatar: profile?.avatar_url,
        fcm_token: await messaging().getToken()
      });

      if (logName !== "Register") {
        activityLog({
          userId: res?.data?.user?._id,
          logName: "Auto Register",
          description: `Register profile from log ${logName.toLowerCase()}`
        });
      }

      setUserProfile(res.data.user); // Fix: set as object, NOT stringified

      return postActivityLog({
        user_id: res.data.user._id,
        live_id: liveId,
        log_name: logName,
        description,
        device: "Android"
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    const freshUserProfile = useAuthStore.getState().userProfile;
    return postActivityLog({
      user_id: freshUserProfile?._id ?? "64e2090061ec79ea209a0160",
      live_id: liveId,
      log_name: logName,
      description,
      device: "Android"
    });
  }
};
