import React from "react";
import {
  Radio,
  VStack,
  HStack,
  Text,
  Modal,
  CheckIcon,
  Switch
} from "native-base";

const QualityContent = ({
  streamOptions,
  selectedQuality,
  onQualityChange,
  streamType,
  onLowLatencyToggle,
}) => {
  const qualities = streamOptions.filter((item) => item?.type === streamType);

  // Show "Automatic" option only for non-low latency
  if (streamType === "hls") {
    const automaticOption = streamOptions.find(
      (item) => item?.type === "hls_all"
    );
    if (automaticOption) {
      qualities.unshift(automaticOption);
    }
  }

  return (
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
            onChange={onQualityChange}
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
            <Text fontWeight="semibold" color="white">No Delay</Text>
            <Switch
              isChecked={streamType === "lhls"}
              onToggle={(value) => onLowLatencyToggle(value)}
              colorScheme="blue"
            />
          </HStack>
        </VStack>
      </Modal.Body>
    </Modal.Content>
  );
};

export default QualityContent;