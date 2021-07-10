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
import { showSearch } from "../../actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Logout from "../../components/Logout";
import { FiLogOut, FiShoppingBag } from "react-icons/fi";
import {
    AiOutlineDashboard,
    AiOutlineLogin,
    AiOutlineUser
} from "react-icons/ai";
import { useEffect } from "react";
import { apiClient, generateUrl } from "../../utilities";

const mapDispatchToProps = dispatch => ({
    showSearch: show => dispatch(showSearch(show))
});

const mapStateToProps = state => ({
    auth: state.auth,
    cart: state.cart,
    wishlist: state.wishlist
});

const Navbar = ({ showSearch, auth, cart, wishlist }) => {
    var history = useHistory();
    const [hovered, setHovered] = useState(false);
    const [smallerThan1100] = useMediaQuery("(max-width: 1100px)");
    const [smallerThan475] = useMediaQuery("(max-width: 475px)");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenModal,
        onOpen: openModal,
        onClose: closeModal
    } = useDisclosure();
    const btnRef = React.useRef();
    const [changeDrawer, setChangeDrawer] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        apiClient
            .get("/api/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleClose = () => {
        setChangeDrawer(false);
        onClose();
    };

    return (
        <>
            <Logout isOpen={isOpenModal} onClose={closeModal} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={handleClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton zIndex="1001" />

                    <DrawerBody pos="relative">
                        <CSSTransition
                            in={!changeDrawer}
                            classNames="drawer-change"
                            unmountOnExit
                            timeout={250}
                        >
                            <VStack alignItems="flex-start" mt="50px">
                                <Box p="10px">
                                    <Link href="/" className="link textLink">
                                        Home
                                    </Link>
                                </Box>
                                <Divider color="gray.200" />
                                <Flex
                                    w="100%"
                                    p="10px"
                                    alignItems="center"
                                    onClick={() => setChangeDrawer(true)}
                                >
                                    <Box className="link textLink">Shop</Box>
                                    <Spacer />
                                    <ChevronRightIcon w="25px" h="25px" />
                                </Flex>
                                <Divider color="gray.200" />
                                <Box p="10px">
                                    <Link
                                        href="/contact"
                                        className="link textLink"
                                    >
                                        Contact
                                    </Link>
                                </Box>
                                <Divider color="gray.200" />
                                <Box p="10px">
                                    <Link
                                        href="/vendors"
                                        className="link textLink"
                                    >
                                        Vendors
                                    </Link>
                                </Box>
                                {smallerThan475 && (
                                    <>
                                        <Divider />
                                        {(!auth.logged_in ||
                                            (auth.logged_in &&
                                                auth.user.role ===
                                                    "Customer")) && (
                                            <>
                                                <Box p="10px">
                                                    <Link
                                                        href="/cart"
                                                        className="link textLink"
                                                    >
                                                        Cart{" "}
                                                        <Badge
                                                            variant="solid"
                                                            colorScheme="red"
                                                        >
                                                            {cart.length}
                                                        </Badge>
                                                    </Link>
                                                </Box>
                                                <Divider />
                                            </>
                                        )}

                                        {auth.logged_in && (
                                            <>
                                                <Box p="10px">
                                                    <a
                                                        href={
                                                            auth.logged_in &&
                                                            auth.user.role !==
                                                                "Customer"
                                                                ? "/admin/dashboard"
                                                                : "/account"
                                                        }
                                                        className="link textLink"
                                                    >
                                                        {auth.logged_in &&
                                                        auth.user.role !==
                                                            "Customer"
                                                            ? "Dashboard"
                                                            : "My Account"}
                                                    </a>
                                                </Box>
                                                <Divider />
                                            </>
                                        )}

                                        {(!auth.logged_in ||
                                            (auth.logged_in &&
                                                auth.user.role ===
                                                    "Customer")) && (
                                            <>
                                                <Box p="10px">
                                                    <Link
                                                        href="/wishlist"
                                                        className="link textLink"
                                                    >
                                                        Wishlist{" "}
                                                        <Badge
                                                            variant="solid"
                                                            colorScheme="red"
                                                        >
                                                            {wishlist.length}
                                                        </Badge>
                                                    </Link>
                                                </Box>
                                                <Divider />
                                                <Box p="10px">
                                                    <Link
                                                        href="/checkout"
                                                        className="link textLink"
                                                    >
                                                        Checkout
                                                    </Link>
                                                </Box>
                                                <Divider />
                                            </>
                                        )}
                                        {!auth.logged_in && (
                                            <>
                                                <Box p="10px">
                                                    <Link
                                                        href="/login"
                                                        className="link textLink"
                                                    >
                                                        Login
                                                    </Link>
                                                </Box>
                                                <Divider />
                                                <Box p="10px">
                                                    <Link
                                                        href="/register"
                                                        className="link textLink"
                                                    >
                                                        Register
                                                    </Link>
                                                </Box>
                                            </>
                                        )}
                                        {auth.logged_in &&
                                            auth.user.role !== "Customer" && (
                                                <>
                                                    <Box p="10px">
                                                        <Link
                                                            onClick={openModal}
                                                            className="link textLink"
                                                        >
                                                            Logout
                                                        </Link>
                                                    </Box>
                                                    <Divider />
                                                </>
                                            )}
                                    </>
                                )}
                            </VStack>
                        </CSSTransition>

                        <CSSTransition
                            in={changeDrawer}
                            unmountOnExit
                            classNames="drawer-change-child"
                            timeout={250}
                        >
                            <VStack alignItems="flex-start" mt="50px">
                                <Flex mb="40px" alignItems="center" w="100%">
                                    <ChevronLeftIcon
                                        w="40px"
                                        h="40px"
                                        onClick={() => setChangeDrawer(false)}
                                    />
                                    <Spacer />
                                    <Link
                                        href="/shop"
                                        _hover={{
                                            textDecor: "none",
                                            borderBottom:
                                                "3px solid var(--chakra-colors-secondary)"
                                        }}
                                        _focus={{
                                            boxShadow: "none"
                                        }}
                                    >
                                        <Heading
                                            as="h6"
                                            fontSize="2em"
                                            color="secondary"
                                            textTransform="uppercase"
                                        >
                                            Shop
                                        </Heading>
                                    </Link>
                                    <Spacer />
                                    <Spacer />
                                </Flex>
                                {categories.map(({ name, products }, index) =>
                                    products.length ? (
                                        <Box w="100%" key={index} mb="30px">
                                            <Heading
                                                as="h6"
                                                fontSize="16px"
                                                textTransform="uppercase"
                                                letterSpacing="1"
                                                m="10px 0"
                                            >
                                                {name}
                                            </Heading>
                                            <hr className="line" />
                                            <Divider borderColor="#66666663" />
                                            <List>
                                                {products.map(
                                                    ({ name, id }, index) => (
                                                        <ListItem
                                                            key={index}
                                                            m="15px 0"
                                                        >
                                                            <Link
                                                                href={generateUrl(
                                                                    id,
                                                                    name
                                                                )}
                                                                fontSize="16px"
                                                                color="gray.700"
                                                                _hover={{
                                                                    color:
                                                                        "secondary",
                                                                    textDecoration:
                                                                        "none"
                                                                }}
                                                            >
                                                                {name}
                                                            </Link>
                                                        </ListItem>
                                                    )
                                                )}
                                            </List>
                                        </Box>
                                    ) : (
                                        <></>
                                    )
                                )}
                            </VStack>
                        </CSSTransition>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <Box
                pos={smallerThan1100 ? "relative" : "absolute"}
                top="0"
                w="100%"
                background={smallerThan1100 ? "primary" : "transparent"}
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
                    <Link
                        href="/"
                        _focus={{ boxShadow: "none" }}
                        outline="none"
                    >
                        <Image
                            src={Logo}
                            w={smallerThan1100 ? "200px" : "230px"}
                            h={smallerThan1100 ? "100px" : "80px"}
                            ml={
                                smallerThan1100 && !smallerThan475 ? "80px" : ""
                            }
                            objectFit="cover"
                        />
                    </Link>
                    {!smallerThan1100 && (
                        <>
                            <Spacer />
                            <Stack
                                spacing={12}
                                direction="row"
                                alignItems="center"
                                ml={
                                    auth.logged_in &&
                                    auth.user.role !== "Customer"
                                        ? "-100px"
                                        : "0"
                                }
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
                                            {categories.map(
                                                ({ name, products }, index) =>
                                                    products.length ? (
                                                        <Box
                                                            w="100%"
                                                            key={index}
                                                        >
                                                            <Heading
                                                                as="h6"
                                                                fontSize="16px"
                                                                textTransform="uppercase"
                                                                letterSpacing="1"
                                                                m="10px 0"
                                                            >
                                                                {name}
                                                            </Heading>
                                                            <hr className="line" />
                                                            <Divider borderColor="#66666663" />
                                                            <List>
                                                                {products.map(
                                                                    (
                                                                        {
                                                                            name,
                                                                            id
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
                                                                                href={generateUrl(
                                                                                    id,
                                                                                    name
                                                                                )}
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
                                                                                    name
                                                                                }
                                                                            </Link>
                                                                        </ListItem>
                                                                    )
                                                                )}
                                                            </List>
                                                        </Box>
                                                    ) : (
                                                        <></>
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
                            onClick={() => showSearch(true)}
                            variant="unstyled"
                            className="link"
                        />
                        {!smallerThan475 && (
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
                                    {!auth.logged_in && (
                                        <>
                                            <MenuItem
                                                icon={
                                                    <Icon
                                                        fontSize="16px"
                                                        as={AiOutlineLogin}
                                                    />
                                                }
                                                _hover={{
                                                    color:
                                                        "var(--chakra-colors-secondary) !important"
                                                }}
                                                onClick={() =>
                                                    history.push("/login")
                                                }
                                                minH="48px"
                                            >
                                                Login
                                            </MenuItem>
                                            <MenuItem
                                                icon={
                                                    <Icon
                                                        fontSize="16px"
                                                        as={AiOutlineUser}
                                                    />
                                                }
                                                _hover={{
                                                    color:
                                                        "var(--chakra-colors-secondary) !important"
                                                }}
                                                onClick={() =>
                                                    history.push("/signup")
                                                }
                                                minH="48px"
                                            >
                                                Register
                                            </MenuItem>
                                        </>
                                    )}
                                    {auth.logged_in && (
                                        <MenuItem
                                            icon={
                                                <Icon
                                                    fontSize="16px"
                                                    as={AiOutlineDashboard}
                                                />
                                            }
                                            _hover={{
                                                color:
                                                    "var(--chakra-colors-secondary) !important"
                                            }}
                                            onClick={() =>
                                                auth.logged_in &&
                                                auth.user.role !== "Customer"
                                                    ? (window.location =
                                                          "/admin/dashboard")
                                                    : history.push("/account")
                                            }
                                            minH="48px"
                                        >
                                            {auth.logged_in &&
                                            auth.user.role !== "Customer"
                                                ? "Dashboard"
                                                : "My Account"}
                                        </MenuItem>
                                    )}
                                    {auth.logged_in &&
                                        auth.user.role !== "Customer" && (
                                            <MenuItem
                                                icon={
                                                    <Icon
                                                        fontSize="16px"
                                                        as={FiLogOut}
                                                    />
                                                }
                                                onClick={openModal}
                                                minH="40px"
                                                _hover={{
                                                    color:
                                                        "var(--chakra-colors-secondary) !important"
                                                }}
                                            >
                                                Logout
                                            </MenuItem>
                                        )}
                                    {(!auth.logged_in ||
                                        (auth.logged_in &&
                                            auth.user.role === "Customer")) && (
                                        <>
                                            <MenuItem
                                                icon={
                                                    <Icon
                                                        fontSize="16px"
                                                        as={FiShoppingBag}
                                                    />
                                                }
                                                onClick={() =>
                                                    history.push("/checkout")
                                                }
                                                _hover={{
                                                    color:
                                                        "var(--chakra-colors-secondary) !important"
                                                }}
                                                minH="40px"
                                            >
                                                Checkout
                                            </MenuItem>

                                            <MenuItem
                                                icon={
                                                    <Icon
                                                        fontSize="16px"
                                                        as={IoHeartOutline}
                                                    />
                                                }
                                                onClick={() =>
                                                    history.push("/wishlist")
                                                }
                                                _hover={{
                                                    color:
                                                        "var(--chakra-colors-secondary) !important"
                                                }}
                                                minH="40px"
                                            >
                                                Wishlist
                                            </MenuItem>
                                        </>
                                    )}
                                </MenuList>
                            </Menu>
                        )}
                        {(!auth.logged_in ||
                            (auth.logged_in &&
                                auth.user.role === "Customer")) && (
                            <>
                                {!smallerThan1100 && (
                                    <Stack className="iconBadgeContainer">
                                        <IconButton
                                            className="link"
                                            fontSize="23px"
                                            aria-label="Wishlist"
                                            icon={<Icon as={IoHeartOutline} />}
                                            variant="unstyled"
                                            onClick={() =>
                                                history.push("/wishlist")
                                            }
                                        />
                                        <Badge
                                            variant="solid"
                                            colorScheme="red"
                                            className="badge"
                                        >
                                            {wishlist.length}
                                        </Badge>
                                    </Stack>
                                )}
                                {!smallerThan475 && (
                                    <Stack className="iconBadgeContainer">
                                        <IconButton
                                            fontSize="25px"
                                            className="link"
                                            aria-label="Cart"
                                            icon={<Icon as={IoCartOutline} />}
                                            variant="unstyled"
                                            onClick={() =>
                                                history.push("/cart")
                                            }
                                        />
                                        <Badge
                                            variant="solid"
                                            colorScheme="red"
                                            className="badge"
                                        >
                                            {cart.length}
                                        </Badge>
                                    </Stack>
                                )}
                            </>
                        )}
                    </Stack>
                </Flex>
                <Divider borderColor="#666" />
            </Box>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
