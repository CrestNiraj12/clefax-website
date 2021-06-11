import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Textarea,
    FormControl,
    FormLabel,
    Button
} from "@chakra-ui/react";
import React from "react";

const Report = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Report this product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <Textarea placeholder="Reason" />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button
                        mr={3}
                        variant="unstyled"
                        letterSpacing={0}
                        textTransform="none"
                        px="20px !important"
                    >
                        Report
                    </Button>
                    <Button
                        onClick={onClose}
                        letterSpacing={0}
                        textTransform="none"
                        px="20px !important"
                        _hover={{
                            background: "gray !important"
                        }}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Report;
