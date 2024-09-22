import useAuthStore from "../store/authStore";
import { postActivityLog, postRegisterUser } from "../services/user";

export const activityLog = async ({ userId, logName, description, liveId }) => {
  const { profile, user, userProfile, setUserProfile } = useAuthStore.getState();

  if (!userId) {
    postRegisterUser({
      user_id: user?.account_id,
      name: profile?.name,
      avatar: profile?.avatar_url
    })
      .then((res) => {
        if (logName !== "Register") {
          activityLog({
            userId: res?.data?.user?._id,
            logName: "Auto Register",
            description: `Register profile from log ${logName.toLowerCase()}`
          });
        }
        setUserProfile(JSON.stringify(res.data.user));

        return postActivityLog({
          user_id: res.data.user._id,
          live_id: liveId,
          log_name: logName,
          description,
          device: "Android"
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return postActivityLog({
      user_id: userProfile._id ?? "64e2090061ec79ea209a0160",
      live_id: liveId,
      log_name: logName,
      description,
      device: "Android"
    });
  }
};
