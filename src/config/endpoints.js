export default {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    DETAIL_USER: "/users/" //required user id
  },
  USER: {
    PROFILE: "/profile/room",
    USER_PROFILE: "/profile/user",
  },
  ROOM: {
    LIST: "/rooms",
    GEN_10: "/rooms/academy",
    ONLIVES: "/rooms/onlives",
    PROFILE: "/profile/room/",
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
  },
  SCHEDULE: {
    LIST: "/schedules",
    WEEK: "/schedules?isOnWeekSchedule=true",
    TODAY: "/schedules/today",
  }
};
