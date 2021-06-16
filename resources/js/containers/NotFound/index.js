import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import Breadcrumb from "../../components/Breadcrumb";

const NotFound = ({ crumbs }) => {
    return (
        <Box mx="20px" mb="200px">
            <Breadcrumb crumbs={crumbs} margin="20px 0" />
            <Flex w="100%" alignItems="center" direction="column" my="150px">
                <Heading
                    as="h6"
                    letterSpacing="10px"
                    mb="30px"
                    color="secondary"
                >
                    404
                </Heading>
                <Heading
                    as="h1"
                    mb="50px"
                    fontSize={{ base: "xl", md: "xxx-large" }}
                >
                    Page Not Found!
                </Heading>
                <Link
                    href="/"
                    color="secondary"
                    _hover={{
                        color: "var(--chakra-colors-gray) !important",
                        textDecor: "underline !important"
                    }}
                >
                    Go home
                </Link>
            </Flex>
        </Box>
    );
};

export default NotFound;
