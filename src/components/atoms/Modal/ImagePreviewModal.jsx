
import React from "react";
import { Modal as RNModal, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Box, CloseIcon } from "native-base";

import ImageViewer from "react-native-image-zoom-viewer";

const ImagePreviewModal = ({ isOpen, onClose, imageUri, images = [], index = 0 }) => {
  if (!imageUri && (!images || images.length === 0)) return null;

  const imageUrls = images.length > 0
    ? images.map((img) => (typeof img === "string" ? { url: img } : img))
    : [{ url: imageUri }];

  return (
    <RNModal
      visible={isOpen}
      transparent={true}
      onRequestClose={onClose}
      animationType="fade"
    >
      <View style={styles.container}>
        <ImageViewer
          imageUrls={imageUrls}
          index={index}
          enableSwipeDown={true}
          onSwipeDown={onClose}
          renderIndicator={(currentIndex, allSize) => {
            if (allSize <= 1) return null;
            return (
              <View style={styles.indicatorContainer}>
                <Text style={styles.indicatorText}>
                  {currentIndex} / {allSize}
                </Text>
              </View>
            );
          }}
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
  indicatorContainer: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },
  indicatorText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});



export default ImagePreviewModal;
