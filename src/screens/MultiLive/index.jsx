import React, { useLayoutEffect, useRef, useState } from "react";
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
import { Info, SearchMember, CloseIcon } from "../../assets/icon";
import { TouchableOpacity, TextInput, StyleSheet } from "react-native";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  const handleOpenMultiRoom = (type) => {
    trackAnalytics("open_multi_room", {
      username: profile?.name
    });
    navigate(type === "showroom" ? "MultiShowroom" : "MultiIDN");
  };

  const toggleSearch = () => {
    if (isSearchOpen) {
      setSearchQuery("");
      setIsSearchOpen(false);
    } else {
      setIsSearchOpen(true);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack
          mr={isMultiLiveScreen ? "0" : "4"}
          space={2}
          alignItems="center"
        >
          {isSearchOpen && (
            <HStack
              alignItems="center"
              bg="gray.700"
              borderRadius="full"
              px="3"
              py="1"
              space={2}
            >
              <SearchMember size={14} color="#9ca3af" />
              <TextInput
                ref={searchInputRef}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Cari member..."
                placeholderTextColor="#9ca3af"
                style={styles.searchInput}
                autoFocus
              />
            </HStack>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={toggleSearch}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {isSearchOpen ? (
              <CloseIcon size={18} color="#ffff" />
            ) : (
              <SearchMember size={24} color="white" />
            )}
          </TouchableOpacity>
        </HStack>
      )
    });
  }, [refreshing, isSearchOpen, searchQuery]);

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
            searchQuery={searchQuery}
          />
          <ShowroomMulti
            refreshing={refreshing}
            isMultiLiveScreen={isMultiLiveScreen}
            handleOpenMultiRoom={() => handleOpenMultiRoom("showroom")}
            searchQuery={searchQuery}
          />
        </>
      ) : (
        <>
          <ShowroomMulti
            refreshing={refreshing}
            isMultiLiveScreen={isMultiLiveScreen}
            handleOpenMultiRoom={() => handleOpenMultiRoom("showroom")}
            searchQuery={searchQuery}
          />
          <IDNLiveMulti
            refreshing={refreshing}
            isMultiLiveScreen={isMultiLiveScreen}
            handleOpenMultiRoom={() => handleOpenMultiRoom("idn")}
            searchQuery={searchQuery}
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

const styles = StyleSheet.create({
  searchInput: {
    color: "white",
    fontSize: 14,
    minWidth: 120,
    paddingVertical: 2,
  },
});

export default MultiLive;
