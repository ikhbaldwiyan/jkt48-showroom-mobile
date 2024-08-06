import React, { useState, useEffect } from "react";
import {
  Box,
  Radio,
  VStack,
  HStack,
  Text,
  Icon,
  Modal,
  CheckIcon,
  Switch
} from "native-base";
import { SettingsIcon } from "../../../assets/icon";
import { TouchableOpacity } from "react-native";
import useLiveStreamStore from "../../../store/liveStreamStore";

const QualitySettings = ({ refreshing }) => {
  const [qualities, setQualities] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [streamType, setStreamType] = useState("hls");
  const { profile, streamOptions, setSelectedUrl } = useLiveStreamStore();

  useEffect(() => {
    fetchQualities();
  }, [streamType, profile, streamOptions]);

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
  }, [refreshing]);

  const fetchQualities = () => {
    let filteredQualities = streamOptions.filter(
      (item) => item?.type === streamType
    );

    // Show "Automatic" option only for non-low latency
    if (streamType === "hls") {
      const automaticOption = streamOptions.find(
        (item) => item?.type === "hls_all"
      );
      if (automaticOption) {
        filteredQualities = [automaticOption, ...filteredQualities];
      }
    }

    setQualities(filteredQualities);

    // Set default quality if not set
    if (!selectedQuality && filteredQualities.length > 0) {
      const defaultQuality =
        streamType === "hls"
          ? filteredQualities.find((q) => q.type === "hls_all") ||
            filteredQualities[0]
          : filteredQualities[0];
      setSelectedQuality(defaultQuality.id);
      setSelectedUrl(defaultQuality.url);
    }
  };

  const handleQualityChange = (id) => {
    setSelectedQuality(id);
    const selectedOption = qualities.find((q) => q.id === id);
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
    // Reset selected quality when changing stream type
    setSelectedQuality(null);
  };

  return (
    <Box>
      <TouchableOpacity opacity="0.8" onPress={() => setShowModal(true)}>
        <Icon as={<SettingsIcon />} color="white" size="sm" />
      </TouchableOpacity>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content bg="secondary" maxWidth="400px">
          <Modal.Header bg="secondary">
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="15" color="white" fontWeight="bold">
                Stream Quality
              </Text>
            </HStack>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <Radio.Group
                name="qualityGroup"
                value={selectedQuality}
                onChange={handleQualityChange}
              >
                <VStack space={2}>
                  {qualities.map((quality) => (
                    <Radio
                      key={quality.id}
                      value={quality.id}
                      colorScheme="blue"
                      _text={{ color: "white", fontSize: "14px" }}
                    >
                      {quality.label.charAt(0).toUpperCase() +
                        quality.label.slice(1)}
                      {quality.id === selectedQuality && (
                        <CheckIcon size="5" color="primary" />
                      )}
                    </Radio>
                  ))}
                </VStack>
              </Radio.Group>
              <HStack justifyContent="space-between" alignItems="center">
                <Text color="white">Low latency</Text>
                <Switch
                  isChecked={streamType === "lhls"}
                  onToggle={(value) => handleLowLatencyToggle(value)}
                  colorScheme="blue"
                />
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default QualitySettings;
