export default {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    DETAIL_USER: "/users/" //required user id
  },
  USER: {
    PROFILE: "/profile/room",
    USER_PROFILE: "/profile/user",
    ACTIVIY_LOG: "/activity/", //required user id
    CREATE_USER: "/users/",
  },
  ROOM: {
    LIST: "/rooms",
    GEN_10: "/rooms/academy",
    ONLIVES: "/rooms/onlives",
    PROFILE: "/profile/room/",
    RECENT_LIVE: "/recent?sort=date&page=1&filter=active&order=-1&perpage=6&search=&room_id=&group=jkt48",
  },
  IDN_LIVE: {
    ROOM_LIVES: "/idn_lives",
    PODIUM: "/idn-live-history/",
  },
  STREAM: {
    URL: "/lives/stream/",
    INFO: "/lives/info/",
    COMMENTS: "/lives/comments/",
    PODIUM: "/history-live/",
    SEND_COMMENT: "/live/comment/", //required room id
    VISIT: "/farm/start", //required room id
  },
  SCHEDULE: {
    LIST: "/schedules",
    WEEK: "/schedules?isOnWeekSchedule=true",
    TODAY: "/schedules/today",
  }
};
