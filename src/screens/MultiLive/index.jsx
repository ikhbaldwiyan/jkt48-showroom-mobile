import React, { useLayoutEffect, useState } from "react";
import { useRefresh, useUser } from "../../utils/hooks";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useIDNLive } from "../../services/hooks/useIDNLive";
import { useShowroomLive } from "../../services/hooks/useShowroomLive";

import Layout from "../../components/templates/Layout";
import ShowroomMulti from "./components/ShowroomMulti";
import IDNLiveMulti from "./components/IDNLiveMulti";
import ModalInfoMulti from "./components/ModalInfoMulti";
import { RefreshIcon } from "../../assets/icon";
import { TouchableOpacity } from "react-native";
import { HStack, Text } from "native-base";
import { HistoryLive } from "../../components/organisms";

const MultiLive = ({ navigation }) => {
  const route = useRoute();
  const { navigate } = useNavigation();
  const { userProfile } = useUser();
  const { data: idnLive } = useIDNLive();
  const { data: showroomLive } = useShowroomLive();
  const isMultiLiveScreen = route?.name === "Multi Live";

  const { refreshing, onRefresh } = useRefresh();
  const [infoModal, setInfoModal] = useState(false);

  const handleOpenMultiRoom = (type) => {
    if (
      userProfile?.totalWatchLive === undefined ||
      userProfile?.totalWatchLive < 100
    ) {
      setInfoModal(true);
    } else {
      navigate(type === "showroom" ? "MultiShowroom" : "MultiIDN");
    }
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
      {showroomLive.length === 0 && idnLive?.length === 0 && (
        <HistoryLive liveType="all" />
      )}
      <ModalInfoMulti
        isOpen={infoModal}
        toggleModal={() => setInfoModal(!infoModal)}
      />
    </Layout>
  );
};

export default MultiLive;
