import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Box,
    Divider,
    Flex,
    Heading,
    IconButton,
    Link,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Stack,
    Badge,
    List,
    ListItem,
    Grid
} from "@chakra-ui/react";
import React, { useState } from "react";
import "@fontsource/rubik";
import {
    IoSearch,
    IoCartOutline,
    IoPersonOutline,
    IoHeartOutline
} from "react-icons/io5";
import { CSSTransition } from "react-transition-group";
import "@fontsource/archivo";

const headings = [
    {
        title: "Products",
        content: [
            { title: "Product category", url: "#" },
            { title: "Product category", url: "#" },
            { title: "Product category", url: "#" },
            { title: "Product category", url: "#" }
        ]
    },
    {
        title: "Products",
        content: [
            { title: "Product category", url: "#" },
            { title: "Product category", url: "#" },
            { title: "Product category", url: "#" },
            { title: "Product category", url: "#" }
        ]
    },
    {
        title: "Products",
        content: [
            { title: "Product category", url: "#" },
            { title: "Product category", url: "#" },
            { title: "Product category", url: "#" },
            { title: "Product category", url: "#" },
            { title: "Product category", url: "#" },
            { title: "Product category", url: "#" }
        ]
    },
    {
        title: "Products",
        content: [
            { title: "Product category", url: "#" },
            { title: "Product category", url: "#" },
            { title: "Product category", url: "#" },
            { title: "Product category", url: "#" }
        ]
    }
];

const Navbar = ({ setShowSearch }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Box pos="absolute" top="0" w="100%" color="white" zIndex="999">
            <Flex p="30px">
                <Heading as="h1" size="xl">
                    Logo
                </Heading>
                <Spacer />
                <Stack
                    spacing={20}
                    direction="row"
                    alignItems="center"
                    onMouseLeave={() => setHovered(false)}
                    ml="100px"
                >
                    <Link href="/" className="link textLink">
                        Home
                    </Link>
                    <Link
                        href="/shop"
                        onMouseOver={() => setHovered(true)}
                        className="link textLink"
                    >
                        Shop <ChevronDownIcon />
                    </Link>
                    <CSSTransition
                        in={hovered}
                        timeout={1000}
                        classNames="navMenu"
                    >
                        <Grid
                            onMouseOver={() => setHovered(true)}
                            templateColumns="repeat(4, 1fr)"
                            pos="absolute"
                            p="20px 50px"
                            color="primary"
                            gap={6}
                            bg="#fff"
                            top="75px"
                            left="0"
                            w="900px"
                            right="0"
                            className="navMenu"
                            zIndex="999"
                        >
                            {headings.map(({ title, content }, index) => (
                                <Box w="100%" key={index}>
                                    <Heading
                                        as="h6"
                                        fontSize="16px"
                                        textTransform="uppercase"
                                        letterSpacing="1"
                                        m="10px 0"
                                    >
                                        {title}
                                    </Heading>
                                    <hr className="line" />
                                    <Divider borderColor="#66666663" />
                                    <List>
                                        {content.map(
                                            ({ title, url }, index) => (
                                                <ListItem
                                                    key={index}
                                                    m="15px 0"
                                                >
                                                    <Link
                                                        href={url}
                                                        fontSize="16px"
                                                        color="gray.700"
                                                        _hover={{
                                                            color: "secondary",
                                                            textDecoration:
                                                                "none"
                                                        }}
                                                    >
                                                        {title}
                                                    </Link>
                                                </ListItem>
                                            )
                                        )}
                                    </List>
                                </Box>
                            ))}
                        </Grid>
                    </CSSTransition>
                    <Link href="/contact" className="link textLink">
                        Contact
                    </Link>
                    <Link href="/vendors" className="link textLink">
                        Vendors
                    </Link>
                </Stack>
                <Spacer />
                <Stack direction="row" alignItems="center">
                    <IconButton
                        aria-label="Search"
                        fontSize="25px"
                        icon={<Icon as={IoSearch} />}
                        onClick={() => setShowSearch(true)}
                        variant="unstyled"
                        className="link"
                    />
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            fontSize="25px"
                            className="link"
                            variant="unstyled"
                            aria-label="Profile"
                        >
                            <Icon as={IoPersonOutline} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem minH="48px">
                                <span>Fluffybuns the Destroyer</span>
                            </MenuItem>
                            <MenuItem minH="40px">
                                <span>Simon the pensive</span>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <Stack className="iconBadgeContainer">
                        <IconButton
                            className="link"
                            fontSize="23px"
                            aria-label="Wishlist"
                            icon={<Icon as={IoHeartOutline} />}
                            variant="unstyled"
                        />
                        <Badge
                            variant="solid"
                            colorScheme="red"
                            className="badge"
                        >
                            0
                        </Badge>
                    </Stack>
                    <Stack className="iconBadgeContainer">
                        <IconButton
                            fontSize="25px"
                            className="link"
                            aria-label="Cart"
                            icon={<Icon as={IoCartOutline} />}
                            variant="unstyled"
                        />
                        <Badge
                            variant="solid"
                            colorScheme="red"
                            className="badge"
                        >
                            0
                        </Badge>
                    </Stack>
                </Stack>
            </Flex>
            <Divider borderColor="#666" />
        </Box>
    );
};

export default Navbar;
