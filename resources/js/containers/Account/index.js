import { Box } from "@chakra-ui/layout";
import {
    TabList,
    Tabs,
    Tab,
    TabPanels,
    TabPanel,
    Divider,
    Text,
    useDisclosure,
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
import { Fragment } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAuth } from "../../actions";
import Breadcrumb from "../../components/Breadcrumb";
import { apiClient } from "../../utilities";
import Details from "./Details";
import Orders from "./Orders";

const tabs = ["Dashboard", "Orders", "Account Details", "Logout"];

const mapDispatchToProps = dispatch => ({
    setAuth: auth => dispatch(setAuth(auth))
});

const Account = ({ crumbs, setAuth }) => {
    var history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogout = () => {
        apiClient
            .get("/api/logout")
            .then(res => {
                localStorage.removeItem("user");
                setAuth({ logged_in: false, user: null });
                history.push("/");
            })
            .catch(err => console.log(err));
    };

    return (
        <Box mx="20px" mb="100px">
            <Breadcrumb crumbs={crumbs} margin="20px 0" />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Logout</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure you want to logout?</ModalBody>

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
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Tabs
                variant="unstyled"
                orientation="vertical"
                flexDir={{ base: "column", lg: "row" }}
                isLazy
            >
                <TabList
                    w={{ base: "100%", lg: "300px" }}
                    bg="lightgray"
                    py="3"
                    px="30px"
                    h={{ base: "auto", lg: "300px" }}
                    mb={{ base: "50px", lg: 0 }}
                    maxH="300px"
                    alignItems="flex-start"
                >
                    {tabs.map((tab, index) => (
                        <Fragment key={index}>
                            <Tab
                                px="0 !important"
                                py="10px !important"
                                color="gray"
                                fontSize="sm"
                                _hover={{ color: "secondary" }}
                                _selected={{ color: "secondary" }}
                                _focus={{ boxShadow: "none" }}
                                onClick={() => {
                                    if (tab === "Logout") onOpen();
                                }}
                            >
                                {tab}
                            </Tab>
                            {index !== tabs.length - 1 && (
                                <Divider borderColor="#dadada" />
                            )}
                        </Fragment>
                    ))}
                </TabList>
                <TabPanels ml={{ base: 0, lg: "50px" }}>
                    <TabPanel>
                        <Box>
                            <Text>
                                Hello <b>Niraj Shrestha</b> (Not{" "}
                                <b>Niraj Shrestha</b>?{" "}
                                <Button
                                    variant="link"
                                    letterSpacing="0 !important"
                                    textTransform="none"
                                    onClick={onOpen}
                                    textDecor="underline"
                                    color="gray"
                                    fontSize="sm"
                                    _hover={{
                                        bg: "transparent !important",
                                        color:
                                            "var(--chakra-colors-secondary) !important"
                                    }}
                                >
                                    Logout
                                </Button>
                                )
                            </Text>
                            <Text mt="20px" color="gray">
                                From your account dashboard, you can view your
                                order history, edit your password and your
                                account details.
                            </Text>
                        </Box>
                    </TabPanel>
                    <TabPanel py="0" overflowX="auto" px="0" pb="30px">
                        <Orders />
                    </TabPanel>
                    <TabPanel py="0">
                        <Details />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default connect(null, mapDispatchToProps)(Account);
