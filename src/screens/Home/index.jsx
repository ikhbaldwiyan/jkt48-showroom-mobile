import React, { useEffect, useState } from "react";
import { Box } from "native-base";

import { AUTH } from "../../services";
import { useRefresh } from "../../utils/hooks/useRefresh";
import { handleFcmTokenUpdate } from "../../utils/fcmHelper";
import useAuthStore from "../../store/authStore";
import useChangeLogStore from "../../store/changeLogStore";
import useMultiAccessStore from "../../store/multiAccesStore";

import {
  IDNLIve,
  ShowroomLive,
  RecentLives,
  ScheduleHome
} from "../../components/organisms";
import Layout from "../../components/templates/Layout";
import RatingApp from "../../components/templates/RatingApp";
import UpdateApp from "../../components/templates/UpdateApp";
import ChangeLog from "../../components/molecules/UserTabs/components/ChangeLog";
import SupportApp from "../../components/templates/SupportApp";
import MaintenanceInfo from "../../components/templates/MaintenanceInfo";
import MenuHome from "./components/MenuHome";
import MultiAccess from "../../components/templates/MultiAccess";

const Home = ({ navigation }) => {
  const { refreshing, onRefresh } = useRefresh();
  const { userProfile, session, user, setUserProfile } = useAuthStore();
  const { showChangeLog, setCloseModal } = useChangeLogStore();
  const { showMultiAccess, setCloseMultiModal } = useMultiAccessStore();
  const [ratingApp, setRatingApp] = useState(false);
  const [supportApp, setSupportApp] = useState(false);

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

  useEffect(() => {
    if (userProfile) {
      handleFcmTokenUpdate(userProfile);
    }
  }, [session]);

  return (
    <Layout isHeader refreshing={refreshing} onRefresh={onRefresh}>
      <Box flex="1" mb="6">
        <MenuHome />
        <ShowroomLive refreshing={refreshing} />
        <IDNLIve refreshing={refreshing} />
        <RecentLives refreshing={refreshing} />
        <ScheduleHome isToday refreshing={refreshing} navigation={navigation} />
        <ScheduleHome refreshing={refreshing} navigation={navigation} />
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
      <SupportApp
        isVisible={supportApp}
        onOpen={() => setSupportApp(true)}
        onClose={() => setSupportApp(false)}
      />
      <MaintenanceInfo />
      <MultiAccess
        isVisible={showMultiAccess}
        onClose={() => {
          setCloseMultiModal();
        }}
      />
    </Layout>
  );
};

export default Home;
