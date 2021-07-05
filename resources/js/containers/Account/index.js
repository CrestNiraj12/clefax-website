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
    Button
} from "@chakra-ui/react";
import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Logout from "../../components/Logout";
import Details from "./Details";
import Orders from "./Orders";

const tabs = ["Dashboard", "Orders", "Account Details", "Logout"];

const mapStateToProps = state => ({
    auth: state.auth
});

const Account = ({ crumbs, auth }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return !localStorage.getItem("user") ||
        JSON.parse(localStorage.getItem("user")).role === "Trader" ? (
        <Redirect to="/login?r=/account" />
    ) : (
        <Box mx="20px" mb="100px">
            <Breadcrumb crumbs={crumbs} margin="20px 0" />
            <Logout isOpen={isOpen} onClose={onClose} />
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
                                Hello{" "}
                                <b>{auth.logged_in && auth.user.fullname}</b>{" "}
                                (Not{" "}
                                <b>{auth.logged_in && auth.user.fullname}</b>?{" "}
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

export default connect(mapStateToProps)(Account);
