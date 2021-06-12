import { Box } from "@chakra-ui/react";
import React from "react";
import Breadcrumb from "../../components/Breadcrumb";

const Stores = ({ crumbs }) => {
    return (
        <Box mx="20px" mb="100px">
            <Breadcrumb crumbs={crumbs} margin="20px 0" />
            <Flex></Flex>
        </Box>
    );
};

export default Stores;
