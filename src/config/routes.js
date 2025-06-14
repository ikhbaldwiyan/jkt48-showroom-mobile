import {
  Home,
  IDNStream,
  LiveStream,
  Login,
  Register,
  RoomDetail,
  ShowroomLive,
  ScheduleDetail,
  SplashScreen,
  ScheduleList,
  PremiumLive,
  About,
  Profile,
  IDNLives,
  EditAvatar,
  HistoryLive,
  MemberList,
  HistoryLiveDetail,
  LeaderboardMember,
  SupportProject,
  LeaderboardUser,
  MultiIDN,
  MultiLive,
  MultiShowroom,
} from "../screens";

export const tabRoutes = [
  {
    name: "Home",
    component: Home,
  },
  {
    name: "Member",
    component: MemberList,
  },
  {
    name: "Live Stream",
    component: MultiLive,
  },
  {
    name: "History",
    component: HistoryLive,
  },
  {
    name: "Profile",
    component: Profile,
  }
];

export const stackRoutes = [
  {
    name: "SplashScreen",
    component: SplashScreen,
    options: { headerShown: false }
  },
  {
    name: "Main",
    component: null, // This will be set in Navigation component
    options: { headerShown: false }
  },
  {
    name: "Home",
    component: Home,
    options: { headerShown: false }
  },
  {
    name: "Login",
    component: Login,
    options: { headerShown: false }
  },
  {
    name: "Register",
    component: Register,
    options: { headerShown: false }
  },
  {
    name: "Theater",
    component: ScheduleList,
    options: { headerShown: true }
  },
  {
    name: "ShowroomLive",
    component: ShowroomLive,
    options: { headerShown: true }
  },
  {
    name: "IDNLives",
    component: IDNLives,
    options: { headerShown: true }
  },
  {
    name: "RoomDetail",
    component: RoomDetail,
    options: { headerShown: true }
  },
  {
    name: "ScheduleDetail",
    component: ScheduleDetail,
    options: { headerShown: true }
  },
  {
    name: "LiveStream",
    component: LiveStream,
    options: { headerShown: true }
  },
  {
    name: "IDNStream",
    component: IDNStream,
    options: { headerShown: true }
  },
  {
    name: "PremiumLive",
    component: PremiumLive,
    options: { headerShown: true }
  },
  {
    name: "Avatar",
    component: EditAvatar,
    options: { headerShown: true }
  },
  {
    name: "HistoryDetail",
    component: HistoryLiveDetail,
    options: { headerShown: true }
  },
  {
    name: "Multi Live",
    component: MultiLive,
    options: { headerShown: true }
  },
  {
    name: "MultiIDN",
    component: MultiIDN,
    options: { headerShown: true }
  },
  {
    name: "MultiShowroom",
    component: MultiShowroom,
    options: { headerShown: true }
  },
  {
    name: "LeaderboardMember",
    component: LeaderboardMember,
    options: { headerShown: true }
  },
  {
    name: "LeaderboardUser",
    component: LeaderboardUser,
    options: { headerShown: true }
  },
  {
    name: "About",
    component: About,
    options: { headerShown: true }
  },
  {
    name: "SupportProject",
    component: SupportProject,
    options: { headerShown: true }
  }
];