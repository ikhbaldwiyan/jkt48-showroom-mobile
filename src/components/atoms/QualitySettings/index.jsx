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

const QualitySettings = () => {
  const [qualities, setQualities] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [streamType, setStreamType] = useState("hls");
  const { streamOptions, setSelectedUrl } = useLiveStreamStore();

  useEffect(() => {
    streamOptions && fetchQualities();
  }, [streamType]);

  const fetchQualities = () => {
    if (!Array.isArray(streamOptions)) {
      console.error("streamOptions is not an array:", streamOptions);
      setQualities([]);
      return;
    }

    let filteredQualities = streamOptions.filter(
      (item) => item?.type === streamType
    );

    // Include "Automatic" option only for non-low latency
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
    // Fetch new qualities based on the new stream type
    fetchQualities();
  };

  const getSelectedQualityLabel = () => {
    const selected = qualities.find((q) => q.id === selectedQuality);
    return selected ? selected.label : "Automatic";
  };

  return (
    <Box>
      <TouchableOpacity opacity="0.8" onPress={() => setShowModal(true)}>
        <Icon as={<SettingsIcon />} color="white" size="sm" />
      </TouchableOpacity>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content bg="secondary" maxWidth="400px">
          <Modal.Body>
            <VStack space={3}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="md" color="white" fontWeight="bold">
                  Stream Quality
                </Text>
                <HStack alignItems="center" space={2}>
                  <CheckIcon color="primary" />
                  <Text fontWeight="semibold" color="white">
                    {getSelectedQualityLabel()}
                  </Text>
                </HStack>
              </HStack>

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
                      {quality.label}
                    </Radio>
                  ))}
                </VStack>
              </Radio.Group>
              <HStack justifyContent="space-between" alignItems="center">
                <Text color="white">Low Latency</Text>
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
