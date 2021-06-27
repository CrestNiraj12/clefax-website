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
    Button
} from "@chakra-ui/react";
import React, { useState } from "react";
import { apiClient } from "../../utilities";

const Report = ({ isOpen, onClose, product_id }) => {
    const [reason, setReason] = useState("");
    const [reported, setReported] = useState(false);

    const handleReport = () => {
        apiClient
            .get("/sanctum/csrf-cookie")
            .then(res =>
                apiClient
                    .post("/api/report/create", { details: reason, product_id })
                    .then(res => {
                        setReported(true);
                    })
                    .catch(err => {
                        console.log(err.response);
                        toast({
                            title: "Error while report",
                            description: err.response.data
                                ? err.response.data.message
                                : "Error occured! Please try again!",
                            status: "error"
                        });
                    })
            )
            .catch(err => {
                console.log(err.response);
                toast({
                    title: "Error while report",
                    description: "Error occured! Please try again!",
                    status: "error"
                });
            });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                {reported ? (
                    <>
                        <ModalHeader>Reported!</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            We will monitor the product and take necessary
                            action if required and we will get back to you as
                            soon as possible!
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                onClick={onClose}
                                letterSpacing={0}
                                textTransform="none"
                                px="20px !important"
                                _hover={{
                                    background: "gray !important"
                                }}
                            >
                                Ok
                            </Button>
                        </ModalFooter>
                    </>
                ) : (
                    <>
                        <ModalHeader>Report this product</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <Textarea
                                    placeholder="Please provide your reason"
                                    value={reason}
                                    onChange={e => setReason(e.target.value)}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                mr={3}
                                variant="unstyled"
                                letterSpacing={0}
                                textTransform="none"
                                px="20px !important"
                                onClick={handleReport}
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
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default Report;
