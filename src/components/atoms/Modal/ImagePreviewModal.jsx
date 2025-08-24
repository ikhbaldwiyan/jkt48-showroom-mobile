import React from "react";
import { Modal, Box, Image } from "native-base";

const ImagePreviewModal = ({ isOpen, onClose, imageUri }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <Modal.Content>
        <Modal.CloseButton style={{ backgroundColor: "white" }} />
        <Modal.Body p="0" bg="secondary">
          <Box justifyContent="center" alignItems="center">
            <Image
              source={{ uri: imageUri ?? "" }}
              alt="preview"
              resizeMode="contain"
              width={400}
              height={600}
            />
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ImagePreviewModal;
