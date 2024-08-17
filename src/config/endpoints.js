export default {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    REGISTER: "/register",
    DETAIL_USER: "/users/", //required user id
    UPDATE_USER: "/users/" //required user id
  },
  USER: {
    PROFILE: "/profile/room",
    USER_PROFILE: "/profile/user",
    AVATAR: "/profile/get_avatar",
    UPDATE_AVATAR: "/profile/update_avatar",
    ACTIVIY_LOG: "/activity/", //required user id
    CREATE_USER: "/users/",
    DONATOR: "/discord/role?type=donator"
  },
  ROOM: {
    LIST: "/rooms",
    GEN_10: "/rooms/academy",
    TRAINEE: "/rooms/trainee",
    ONLIVES: "/rooms/onlives",
    PROFILE: "/profile/room/",
    FOLLOW: "/room/follow",
    RECENT_LIVE: "/recent?sort=date&page=1&filter=all&order=-1&group=jkt48&type=all",
    HISTORY_LIVE: "/recent?sort=date&page=1&filter=all&order=-1&group=jkt48&type=all", //require roomId
  },
  IDN_LIVE: {
    ROOM_LIVES: "/idn_lives",
    PODIUM: "/idn-live-history/",
    DETAIL: "/watch"
  },
  STREAM: {
    URL: "/lives/stream/",
    INFO: "/lives/info/",
    COMMENTS: "/lives/comments/",
    PODIUM: "/history-live/",
    SEND_COMMENT: "/live/comment/", //required room id
    VISIT: "/farm/start", //required room id
    PREMIUM_LIVE: "/premium-lives/today", 
    RANK: "/lives/rank/" //required room id
  },
  SCHEDULE: {
    LIST: "/schedules",
    DETAIL: "/schedules/", //required schedule id
    WEEK: "/schedules?isOnWeekSchedule=true",
    TODAY: "/schedules/today",
  },
  VERSIONS: {
    CURRENT_VERSION: "/mobile/app-version"
  }
};
