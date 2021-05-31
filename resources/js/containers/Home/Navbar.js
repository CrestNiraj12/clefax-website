import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    HamburgerIcon
} from "@chakra-ui/icons";
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
    Grid,
    Image,
    useMediaQuery,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
    useDisclosure,
    VStack
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
import Logo from "../../../images/logo-2.png";
import "@fontsource/archivo";
import { Fragment } from "react";

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
    const [smallerThan1100] = useMediaQuery("(max-width: 1100px)");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const [changeDrawer, setChangeDrawer] = useState(false);

    return (
        <>
            <Fragment>
                <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />

                        <DrawerBody>
                            <VStack alignItems="flex-start" mt="50px">
                                {!changeDrawer ? (
                                    <>
                                        <Box p="10px">
                                            <Link
                                                href="/"
                                                className="link textLink"
                                            >
                                                Home
                                            </Link>
                                        </Box>
                                        <Divider color="gray.200" />
                                        <Flex
                                            w="100%"
                                            p="10px"
                                            onClick={() =>
                                                setChangeDrawer(true)
                                            }
                                            alignItems="center"
                                        >
                                            <Link
                                                href="/"
                                                className="link textLink"
                                            >
                                                Shop
                                            </Link>
                                            <Spacer />
                                            <ChevronRightIcon
                                                w="25px"
                                                h="25px"
                                            />
                                        </Flex>
                                        <Divider color="gray.200" />
                                        <Box p="10px">
                                            <Link
                                                href="/"
                                                className="link textLink"
                                            >
                                                Contact
                                            </Link>
                                        </Box>
                                        <Divider color="gray.200" />
                                        <Box p="10px">
                                            <Link
                                                href="/"
                                                className="link textLink"
                                            >
                                                Vendors
                                            </Link>
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        <Flex
                                            mb="40px"
                                            alignItems="center"
                                            w="100%"
                                        >
                                            <ChevronLeftIcon
                                                w="40px"
                                                h="40px"
                                                onClick={() =>
                                                    setChangeDrawer(false)
                                                }
                                            />
                                            <Spacer />
                                            <Heading
                                                as="h6"
                                                fontSize="2em"
                                                color="secondary"
                                                textTransform="uppercase"
                                            >
                                                Shop
                                            </Heading>
                                            <Spacer />
                                            <Spacer />
                                        </Flex>
                                        {headings.map(
                                            ({ title, content }, index) => (
                                                <Box
                                                    w="100%"
                                                    key={index}
                                                    mb="30px"
                                                >
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
                                                            (
                                                                { title, url },
                                                                index
                                                            ) => (
                                                                <ListItem
                                                                    key={index}
                                                                    m="15px 0"
                                                                >
                                                                    <Link
                                                                        href={
                                                                            url
                                                                        }
                                                                        fontSize="16px"
                                                                        color="gray.700"
                                                                        _hover={{
                                                                            color:
                                                                                "secondary",
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
                                            )
                                        )}
                                    </>
                                )}
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Fragment>
            <Box
                pos={smallerThan1100 ? "relative" : "absolute"}
                top="0"
                w="100%"
                background={smallerThan1100 ? "primary" : "transoarent"}
                color="white"
                zIndex="999"
            >
                <Flex
                    p={smallerThan1100 ? "20px" : "10px 30px"}
                    alignItems="center"
                    justifyContent="center"
                >
                    {smallerThan1100 && (
                        <>
                            <IconButton
                                ref={btnRef}
                                aria-label="Drawer"
                                fontSize="30px"
                                icon={<HamburgerIcon color="secondary" />}
                                onClick={onOpen}
                                variant="unstyled"
                                className="link"
                            />
                            <Spacer />
                        </>
                    )}
                    <Image
                        src={Logo}
                        w={smallerThan1100 ? "200px" : "230px"}
                        h={smallerThan1100 ? "100px" : "80px"}
                        ml={smallerThan1100 ? "80px" : ""}
                        objectFit="cover"
                    />
                    {!smallerThan1100 && (
                        <>
                            <Spacer />
                            <Stack
                                spacing={12}
                                direction="row"
                                alignItems="center"
                            >
                                <Box>
                                    <Link href="/" className="link textLink">
                                        Home
                                    </Link>
                                </Box>
                                <Box
                                    onMouseOver={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                    py="30px"
                                >
                                    <Link
                                        href="/shop"
                                        className="link textLink"
                                        _hover={{
                                            textDecoration: "none"
                                        }}
                                    >
                                        Shop <ChevronDownIcon />
                                    </Link>
                                    <CSSTransition
                                        in={hovered}
                                        timeout={1000}
                                        classNames="navMenu"
                                    >
                                        <Grid
                                            templateColumns="repeat(4, 1fr)"
                                            pos="absolute"
                                            p="20px 50px"
                                            color="primary"
                                            gap={6}
                                            bg="#fff"
                                            top="75px"
                                            left="0"
                                            w="60%"
                                            right="0"
                                            className="navMenu"
                                            zIndex="999"
                                        >
                                            {headings.map(
                                                ({ title, content }, index) => (
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
                                                                (
                                                                    {
                                                                        title,
                                                                        url
                                                                    },
                                                                    index
                                                                ) => (
                                                                    <ListItem
                                                                        key={
                                                                            index
                                                                        }
                                                                        m="15px 0"
                                                                    >
                                                                        <Link
                                                                            href={
                                                                                url
                                                                            }
                                                                            fontSize="16px"
                                                                            color="gray.700"
                                                                            _hover={{
                                                                                color:
                                                                                    "secondary",
                                                                                textDecoration:
                                                                                    "none"
                                                                            }}
                                                                        >
                                                                            {
                                                                                title
                                                                            }
                                                                        </Link>
                                                                    </ListItem>
                                                                )
                                                            )}
                                                        </List>
                                                    </Box>
                                                )
                                            )}
                                        </Grid>
                                    </CSSTransition>
                                </Box>
                                <Box>
                                    <Link
                                        href="/contact"
                                        className="link textLink"
                                    >
                                        Contact
                                    </Link>
                                </Box>
                                <Box>
                                    <Link
                                        href="/vendors"
                                        className="link textLink"
                                    >
                                        Vendors
                                    </Link>
                                </Box>
                            </Stack>
                        </>
                    )}
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
                                paddingInlineStart="0"
                                paddingInlineEnd="0"
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
                        {!smallerThan1100 && (
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
                        )}
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
        </>
    );
};

export default Navbar;
