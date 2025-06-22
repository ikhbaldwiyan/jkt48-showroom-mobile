import React, { useLayoutEffect, useState } from "react";
import { useRefresh } from "../../utils/hooks";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useIDNLive } from "../../services/hooks/useIDNLive";
import { useShowroomLive } from "../../services/hooks/useShowroomLive";
import { useProfile } from "../../services/hooks/useProfile";
import useAuthStore from "../../store/authStore";
import { hasMultiRoomAccess } from "../../utils/helpers";
import trackAnalytics from "../../utils/trackAnalytics";

import Layout from "../../components/templates/Layout";
import ShowroomMulti from "./components/ShowroomMulti";
import IDNLiveMulti from "./components/IDNLiveMulti";
import ModalInfoMulti from "./components/ModalInfoMulti";
import { Info, RefreshIcon } from "../../assets/icon";
import { TouchableOpacity } from "react-native";
import { Box, HStack, Text } from "native-base";
import { HistoryLive } from "../../components/organisms";
import useApiConfig from "../../store/useApiConfig";

const MultiLive = ({ navigation }) => {
  const route = useRoute();
  const { navigate } = useNavigation();
  const { user } = useAuthStore();
  const { data: profile } = useProfile(user?.account_id);
  const { data: idnLive } = useIDNLive();
  const { data: showroomLive } = useShowroomLive();
  const isMultiLiveScreen = route?.name === "Multi Live";
  const { IS_MULTI_LIVE_CLOSED } = useApiConfig();

  const { refreshing, onRefresh } = useRefresh();
  const [infoModal, setInfoModal] = useState(false);

  const handleOpenMultiRoom = (type) => {
    trackAnalytics("open_multi_room", {
      username: profile?.name
    });
    navigate(type === "showroom" ? "MultiShowroom" : "MultiIDN");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.7} onPress={onRefresh}>
          <HStack
            mr={isMultiLiveScreen ? "0" : "4"}
            space={2}
            justifyContent="center"
            alignItems="center"
          >
            <RefreshIcon />
            <Text>Refresh</Text>
          </HStack>
        </TouchableOpacity>
      )
    });
  }, [refreshing]);

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      {!isMultiLiveScreen && !hasMultiRoomAccess(profile) && !IS_MULTI_LIVE_CLOSED && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setInfoModal(true)}
        >
          <Box p="2" mb="4" borderRadius={10} backgroundColor="purple.600">
            <HStack alignItems="center" space={1}>
              <Info size="22" color="white" />
              <Text fontWeight="medium" fontSize={13}>
                Buka fitur Multi Live cek disini
              </Text>
            </HStack>
          </Box>
        </TouchableOpacity>
      )}

      {idnLive?.length > showroomLive?.length ? (
        <>
          <IDNLiveMulti
            refreshing={refreshing}
            isMultiLiveScreen={isMultiLiveScreen}
            handleOpenMultiRoom={() => handleOpenMultiRoom("idn")}
          />
          <ShowroomMulti
            refreshing={refreshing}
            isMultiLiveScreen={isMultiLiveScreen}
            handleOpenMultiRoom={() => handleOpenMultiRoom("showroom")}
          />
        </>
      ) : (
        <>
          <ShowroomMulti
            refreshing={refreshing}
            isMultiLiveScreen={isMultiLiveScreen}
            handleOpenMultiRoom={() => handleOpenMultiRoom("showroom")}
          />
          <IDNLiveMulti
            refreshing={refreshing}
            isMultiLiveScreen={isMultiLiveScreen}
            handleOpenMultiRoom={() => handleOpenMultiRoom("idn")}
          />
        </>
      )}
      {showroomLive?.length === 0 && idnLive?.length === 0 && <HistoryLive />}
      <ModalInfoMulti
        isOpen={infoModal}
        toggleModal={() => setInfoModal(!infoModal)}
      />
    </Layout>
  );
};

export default MultiLive;
