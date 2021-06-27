import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button
} from "@chakra-ui/react";
import React from "react";
import { apiClient } from "../../utilities";

const RemoveModal = ({
    isOpen,
    onClose,
    apiUrl,
    title,
    words,
    onSuccess,
    onError
}) => {
    const handleDeleteItem = () => {
        apiClient
            .get("/sanctum/csrf-cookie")
            .then(res =>
                apiClient
                    .delete(`/api/${apiUrl}`)
                    .then(res => {
                        onSuccess(res);
                    })
                    .catch(err => {
                        onError(err);
                    })
            )
            .catch(err => {
                onError(err);
            });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>Are you sure you want to delete {words}?</ModalBody>

                <ModalFooter>
                    <Button
                        bg="primary"
                        color="#fff"
                        fontSize="sm"
                        textTransform="none"
                        p="0 20px !important"
                        mr={3}
                        onClick={onClose}
                        _hover={{
                            bg: "var(--chakra-colors-gray) !important"
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="ghost"
                        fontSize="sm"
                        textTransform="none"
                        p="0 20px !important"
                        onClick={handleDeleteItem}
                    >
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RemoveModal;
