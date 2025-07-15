import React from "react";
import { Button, Modal, Text } from "native-base";

export const ModalConfirmation = ({
  modal,
  title,
  children,
  onClose,
  size = "lg",
  confrimAction
}) => {
  return (
    <>
      <Modal isOpen={modal} onClose={onClose} size={size}>
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header bg="primary">
            <Text fontWeight="bold" fontSize="lg">
              {title}
            </Text>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button onPress={confrimAction}>
                <Text color="black">Yes</Text>
              </Button>
              <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                Cancel
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
