import React, { useState } from "react";
import { useRefresh, useUser } from "../../utils/hooks";

import Layout from "../../components/templates/Layout";
import ShowroomMulti from "./components/ShowroomMulti";
import IDNLiveMulti from "./components/IDNLiveMulti";
import ModalInfoMulti from "./components/ModalInfoMulti";
import { useNavigation } from "@react-navigation/native";

const MultiLive = () => {
  const { refreshing, onRefresh } = useRefresh();
  const [infoModal, setInfoModal] = useState(false);
  const { userProfile } = useUser();
  const { navigate } = useNavigation();

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

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <IDNLiveMulti
        refreshing={refreshing}
        handleOpenMultiRoom={() => handleOpenMultiRoom("idn")}
      />
      <ShowroomMulti
        refreshing={refreshing}
        handleOpenMultiRoom={() => handleOpenMultiRoom("showroom")}
      />
      <ModalInfoMulti
        isOpen={infoModal}
        toggleModal={() => setInfoModal(!infoModal)}
      />
    </Layout>
  );
};

export default MultiLive;
