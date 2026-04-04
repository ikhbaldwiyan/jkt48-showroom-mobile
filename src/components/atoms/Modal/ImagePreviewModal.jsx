
import React from "react";
import { Modal as RNModal, StyleSheet, TouchableOpacity, View } from "react-native";
import { Box, CloseIcon } from "native-base";
import ImageViewer from "react-native-image-zoom-viewer";

const ImagePreviewModal = ({ isOpen, onClose, imageUri }) => {
  if (!imageUri) return null;

  const images = [{ url: imageUri }];

  return (
    <RNModal 
      visible={isOpen} 
      transparent={true} 
      onRequestClose={onClose} 
      animationType="fade"
    >
      <View style={styles.container}>
        <ImageViewer
          imageUrls={images}
          enableSwipeDown={true}
          onSwipeDown={onClose}
          renderIndicator={() => null}
          backgroundColor="black"
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Box bg="white" p="2" borderRadius="full" shadow={5}>
            <CloseIcon size="4" color="black" />
          </Box>
        </TouchableOpacity>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
});


export default ImagePreviewModal;
