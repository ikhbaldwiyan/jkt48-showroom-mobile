import { postActivityLog, postRegisterUser } from "../services/user";
import { getStorage, storeStorage } from "./storage";

export const activityLog = async ({ userId, logName, description, liveId }) => {
  const profile = await getStorage("profile");
  const user = await getStorage("user");

  if (!userId) {
    postRegisterUser({
      user_id: user?.account_id,
      name: profile?.name,
      avatar: profile?.avatar_url
    })
      .then((res) => {
        activityLog({
          userId: res?.data?.user?._id,
          logName: "Auto Register",
          description: `Auto Register user from log ${logName.toLowerCase()}`
        });
        storeStorage("userProfile", JSON.stringify(res.data.user));

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
      user_id: userId ?? "64e2090061ec79ea209a0160",
      live_id: liveId,
      log_name: logName,
      description,
      device: "Android"
    });
  }
};
