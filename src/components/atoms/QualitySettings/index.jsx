import React, { lazy, Suspense, useState, useEffect } from "react";
import { Box, Icon, Modal, Spinner } from "native-base";
import { TouchableOpacity } from "react-native";
import { SettingsIcon } from "../../../assets/icon";
import useLiveStreamStore from "../../../store/liveStreamStore";

// Lazy load modal content
const QualityContent = lazy(() => import("./QualityContent"));

const QualitySettings = ({ refreshing }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [streamType, setStreamType] = useState("hls");
  const { profile, streamOptions, setSelectedUrl } = useLiveStreamStore();

  useEffect(() => {
    let filteredQualities = streamOptions.filter(
      (item) => item?.type === streamType
    );

    if (filteredQualities.length > 0) {
      const defaultQuality =
        streamType === "hls"
          ? filteredQualities.find((q) => q.type === "hls_all") ||
            filteredQualities[0]
          : filteredQualities[0];
      setSelectedQuality(defaultQuality.id);
      setSelectedUrl(defaultQuality.url);
    }
  }, [refreshing, profile, streamOptions, streamType, setSelectedUrl]);

  const handleQualityChange = (id) => {
    setSelectedQuality(id);
    const selectedOption = streamOptions.find((q) => q.id === id);
    if (selectedOption) {
      setSelectedUrl(selectedOption.url);
    }
    setTimeout(() => {
      setShowModal(false);
    }, 400);
  };

  const handleLowLatencyToggle = (value) => {
    const newStreamType = value ? "lhls" : "hls";
    setStreamType(newStreamType);
  };

  return (
    <Box>
      <TouchableOpacity opacity="0.8" onPress={() => setShowModal(true)}>
        <Icon as={<SettingsIcon />} color="white" size="sm" />
      </TouchableOpacity>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Suspense fallback={<Spinner color="white" />}>
          <QualityContent
            refreshing={refreshing}
            profile={profile}
            streamOptions={streamOptions}
            selectedQuality={selectedQuality}
            onQualityChange={handleQualityChange}
            streamType={streamType}
            onLowLatencyToggle={handleLowLatencyToggle}
            onClose={() => setShowModal(false)}
          />
        </Suspense>
      </Modal>
    </Box>
  );
};

export default QualitySettings;