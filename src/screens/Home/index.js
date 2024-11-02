import React, { useEffect, useState } from "react";
import { Box } from "native-base";

import { AUTH } from "../../services";
import { useRefresh } from "../../utils/hooks/useRefresh";
import useAuthStore from "../../store/authStore";
import useChangeLogStore from "../../store/changeLogStore";

import {
  IDNLIve,
  ShowroomLive,
  PremiumLive,
  RecentLives,
  Schedule
} from "../../components/organisms";
import Layout from "../../components/templates/Layout";
import RatingApp from "../../components/templates/RatingApp";
import UpdateApp from "../../components/templates/UpdateApp";
import ChangeLog from "../../components/molecules/UserTabs/components/ChangeLog";

const Home = ({ navigation }) => {
  const { refreshing, onRefresh } = useRefresh();
  const { showChangeLog, setCloseModal } = useChangeLogStore();
  const { userProfile, session, user, setUserProfile } = useAuthStore();
  const [ratingApp, setRatingApp] = useState(false);

  const setRegisterProfile = async (userId) => {
    await AUTH.detailUserApi(userId)
      .then((res) => {
        setUserProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (session && !userProfile) {
      setRegisterProfile(user?.account_id);
    }
  }, [userProfile]);

  return (
    <Layout isHeader refreshing={refreshing} onRefresh={onRefresh}>
      <Box flex="1" mb="6">
        <PremiumLive refreshing={refreshing} />
        <ShowroomLive refreshing={refreshing} />
        <IDNLIve refreshing={refreshing} />
        <RecentLives refreshing={refreshing} />
        <Schedule refreshing={refreshing} navigation={navigation} isWeek />
      </Box>
      <UpdateApp />
      <ChangeLog
        modal={showChangeLog}
        toggleModal={() => setCloseModal()}
        hideButton={true}
      />
      <RatingApp
        isVisible={ratingApp}
        onOpen={() => setRatingApp(true)}
        onClose={() => setRatingApp(false)}
      />
    </Layout>
  );
};

export default Home;
