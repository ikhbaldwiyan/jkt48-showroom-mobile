export default {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    REGISTER: "/register",
    DETAIL_USER: "/users/", //required user id
    UPDATE_USER: "/users/", //required user id
  },
  USER: {
    PROFILE: "/profile/room",
    USER_PROFILE: "/profile/user",
    UPDATE_PROFILE: "/profile/update",
    UPDATE_USER_PROFILE: "/users/",
    AVATAR: "/profile/get_avatar",
    UPDATE_AVATAR: "/profile/update_avatar",
    ACTIVIY_LOG: "/activity/", //required user id
    CREATE_USER: "/users/",
    DONATOR: "/discord/role?type=donator",
    MOST_WATCH_IDN: "/activity/most-watch-idn/"
  },
  ROOM: {
    LIST: "/rooms",
    GEN_10: "/rooms/academy",
    TRAINEE: "/rooms/trainee",
    ONLIVES: "/rooms/onlives",
    PREMIUM_LIVE: "/rooms/premium-live",
    PROFILE: "/profile/room/",
    FOLLOW: "/room/follow",
    HISTORY_LIVE: "/recent?sort=date&order=-1&group=jkt48",
    HISTORY_LIVE_PROFILE:
      "/recent?sort=date&page=1&order=-1&perpage=10&group=jkt48&type=all",
  },
  IDN_LIVE: {
    ROOM_LIVES: "/idn_lives",
    PODIUM: "/idn-live-history/",
    DETAIL: "/watch",
    CHAT: "/scrapper/channel-id"
  },
  STREAM: {
    URL: "/lives/stream/",
    INFO: "/lives/info/",
    COMMENTS: "/lives/comments/",
    PODIUM: "/history-live/",
    SEND_COMMENT: "/live/comment/", //required room id
    VISIT: "/farm/start", //required room id
    PREMIUM_LIVE: "/premium-lives/today",
    RANK: "/lives/rank/", //required room id
  },
  SCHEDULE: {
    LIST: "/schedules",
    DETAIL: "/schedules/", //required schedule id
    WEEK: "/schedules?isOnWeekSchedule=true",
    TODAY: "/schedules/today",
    SETLIST: "/setlist?is_active=true"
  },
  VERSIONS: {
    CURRENT_VERSION: "/mobile/app-version",
    CHANGE_LOG: "/change-logs/active"
  },
  LEADERBOARD: {
    SHOWROOM: "/leaderboard-member/showroom",
    IDN: "/leaderboard-member/idn",
    USER: "/leaderboard"
  },
  CHAT: {
    LIST: "/chat-list",
    ONLINE_USERS: "/analytics/real-time-users",
    SEND_MESSAGE: "/send-message",
    DELETE: "/delete-chat",
    ROOM_INFO: "/room-info"
  }
};
