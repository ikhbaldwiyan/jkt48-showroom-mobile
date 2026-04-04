import React, { useEffect, useState } from "react";
import { Box } from "native-base";

import { AUTH } from "../../services";
import { useRefresh } from "../../utils/hooks/useRefresh";
import { handleFcmTokenUpdate } from "../../utils/fcmHelper";
import useAuthStore from "../../store/authStore";

import {
  IDNLIve,
  ShowroomLive,
  RecentLives,
  ScheduleHome,
  ScheduleOshimen,
  News,
} from "../../components/organisms";
import Layout from "../../components/templates/Layout";
import RatingApp from "../../components/templates/RatingApp";
import UpdateApp from "../../components/templates/UpdateApp";
import SupportApp from "../../components/templates/SupportApp";
import MaintenanceInfo from "../../components/templates/MaintenanceInfo";
import MenuHome from "./components/MenuHome";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  const { refreshing, onRefresh } = useRefresh();
  const { userProfile, session, user, setUserProfile } = useAuthStore();
  const [ratingApp, setRatingApp] = useState(false);
  const [supportApp, setSupportApp] = useState(false);

  const setRegisterProfile = async (userId) => {
    if (!userId) return;
    try {
      const res = await AUTH.detailUserApi(userId);
      setUserProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (session && !userProfile && user?.account_id) {
      setRegisterProfile(user.account_id);
    }
  }, [session, userProfile, user?.account_id]);

  useEffect(() => {
    if (userProfile && session) {
      handleFcmTokenUpdate(userProfile);
    }
  }, [userProfile, session]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#21252B",
      }}
      edges={["top", "left", "right"]}
    >
      <Layout isHeader refreshing={refreshing} onRefresh={onRefresh}>
        <Box flex="1" mb="6">
          <MenuHome />
          <ShowroomLive refreshing={refreshing} />
          <IDNLIve refreshing={refreshing} />
          <RecentLives refreshing={refreshing} />
          <News />
          <ScheduleOshimen isHome />
          <ScheduleHome
            isToday
            refreshing={refreshing}
            navigation={navigation}
          />
          <ScheduleHome refreshing={refreshing} navigation={navigation} />
        </Box>
        <UpdateApp />
        <RatingApp
          isVisible={ratingApp}
          onOpen={() => setRatingApp(true)}
          onClose={() => setRatingApp(false)}
        />
        <SupportApp
          isVisible={supportApp}
          onOpen={() => setSupportApp(true)}
          onClose={() => setSupportApp(false)}
        />
        <MaintenanceInfo />
      </Layout>
    </SafeAreaView>
  );
};

export default Home;
