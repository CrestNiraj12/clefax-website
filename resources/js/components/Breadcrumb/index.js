import {
    Breadcrumb as Bc,
    BreadcrumbItem,
    BreadcrumbLink
} from "@chakra-ui/breadcrumb";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Divider } from "@chakra-ui/layout";
import React from "react";

const Breadcrumb = ({ crumbs, customPageName = null, margin = "0" }) => {
    return (
        <>
            <Bc
                spacing="8px"
                m={margin}
                separator={<ChevronRightIcon color="gray" />}
            >
                {crumbs.map(({ name, path }, index) =>
                    index + 1 === crumbs.length ? (
                        <BreadcrumbItem isCurrentPage key={path}>
                            <BreadcrumbLink
                                href={path}
                                color="secondary"
                                fontSize="xs"
                                _hover={{ textDecor: "none", cursor: "text" }}
                            >
                                {customPageName ? customPageName : name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    ) : (
                        <BreadcrumbItem key={path}>
                            <BreadcrumbLink
                                href={path}
                                color="gray"
                                fontSize="xs"
                                _hover={{
                                    color: "secondary",
                                    textDecor: "none"
                                }}
                            >
                                {name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )
                )}
            </Bc>
            <Divider color="gray" w="auto" m={margin} />
        </>
    );
};

export default Breadcrumb;
