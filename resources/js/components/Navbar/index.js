import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    HamburgerIcon,
    SearchIcon
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
    VStack,
    Button,
    HStack,
    Text,
    Input,
    InputRightElement,
    InputGroup,
    StackDivider,
    Spinner
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "@fontsource/rubik";
import {
    IoCartOutline,
    IoPersonOutline,
    IoHeartOutline,
    IoSearch
} from "react-icons/io5";
import { CSSTransition } from "react-transition-group";
import Logo from "../../../images/logo-black.png";
import "@fontsource/archivo";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import ProductCardRowSmall from "../ProductCardRowSmall";
import { showSearch } from "../../actions";
import ShopLocal from "../../../images/shoplocal.jpg";
import { apiClient, generateUrl, searchQuery } from "../../utilities";
import Logout from "../Logout";
import { FiLogOut, FiShoppingBag } from "react-icons/fi";
import {
    AiOutlineDashboard,
    AiOutlineLogin,
    AiOutlineUser
} from "react-icons/ai";
import { uniqBy } from "lodash";

const mapDispatchToProps = dispatch => ({
    showSearch: show => dispatch(showSearch(show))
});

const mapStateToProps = state => ({
    products: state.products,
    categories: state.categories,
    auth: state.auth,
    cart: state.cart,
    wishlist: state.wishlist
});

const Navbar = ({ showSearch, products, categories, auth, cart, wishlist }) => {
    var history = useHistory();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [smallerThan1100] = useMediaQuery("(max-width: 1100px)");
    const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenModal,
        onOpen: openModal,
        onClose: closeModal
    } = useDisclosure();
    const btnRef = React.useRef();
    const [changeDrawer, setChangeDrawer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (products.length) setFilteredProducts(products);
    }, [products]);

    const handleClose = () => {
        setChangeDrawer(false);
        onClose();
    };

    const handleSubmit = () => {
        if (query.length > 0) {
            window.location =
                "/shop/search/?q=" +
                query +
                "&cat=" +
                (selectedCategory !== null
                    ? encodeURIComponent(categories[selectedCategory].name)
                    : "");
        }
    };

    const handleKeyDown = event => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };
    const handleChange = e => {
        setLoading(true);
        const q = e.target.value;
        setQuery(q);
        handleSearch(q);
    };

    const handleFilterProducts = index => {
        setLoading(true);
        setSelectedCategory(index);
        var fp = [];
        if (index !== null)
            fp = products.filter(
                p => p.category.name === categories[index].name
            );
        else fp = products;
        setFilteredProducts(fp);
        handleSearch(query, fp);
    };

    const handleSearch = (q, fp = filteredProducts) => {
        const filtered = searchQuery(fp, q);
        setSearchedProducts(q.length > 0 ? filtered : []);
        setTimeout(() => setLoading(false), 0);
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
                                    <Link href="/" className="link textLink">
                                        Contact
                                    </Link>
                                </Box>
                                <Divider color="gray.200" />
                                <Box p="10px">
                                    <Link href="/" className="link textLink">
                                        Vendors
                                    </Link>
                                </Box>
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
                                        href="/"
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
                                {categories.map(
                                    ({ name, products: ps }, index) =>
                                        ps.length ? (
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
                                                    {ps.map(
                                                        (
                                                            { name, id },
                                                            index
                                                        ) => (
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

            <Box w="100%" background="transparent" zIndex="999">
                <Flex
                    background="lightgray"
                    p="10px 30px"
                    color="gray"
                    fontSize="12px"
                    boxShadow="inset 0 -0.5px 2px #d8d8d8"
                >
                    <Text>Email: support@domain.com</Text>
                    <Spacer />
                    {(!auth.logged_in ||
                        (auth.logged_in && auth.user.role === "Customer")) && (
                        <Link
                            className="link"
                            href="/"
                            fontSize="12px"
                            _focus={{ boxShadow: "none" }}
                        >
                            Order Tracking
                        </Link>
                    )}
                </Flex>
                <Flex
                    p={smallerThan1100 ? "20px" : "10px 30px"}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Link
                        href="/"
                        _focus={{ boxShadow: "none" }}
                        outline="none"
                    >
                        <Image
                            src={Logo}
                            w="200px"
                            h={smallerThan1100 ? "100px" : "80px"}
                            objectFit="cover"
                        />
                    </Link>
                    {!smallerThan1024 && (
                        <>
                            <Spacer />
                            <HStack
                                border="1px solid"
                                borderColor="lightgray"
                                w="600px"
                                h="40px"
                            >
                                <Menu isLazy>
                                    <MenuButton
                                        as={Button}
                                        rightIcon={
                                            <ChevronDownIcon ml="10px" />
                                        }
                                        minW="180px"
                                        color="gray"
                                        textTransform="initial"
                                        fontSize="14px "
                                        letterSpacing="0"
                                        bg="transparent !important"
                                        _hover={{
                                            color: "#000 !important"
                                        }}
                                        p="0 10px !important"
                                    >
                                        {selectedCategory !== null
                                            ? categories[selectedCategory].name
                                            : "All Categories"}
                                    </MenuButton>
                                    <MenuList
                                        maxH="300px"
                                        overflowY="scroll"
                                        className="scrollable"
                                    >
                                        <MenuItem
                                            color="gray"
                                            _hover={{
                                                color:
                                                    "var(--chakra-colors-secondary) !important"
                                            }}
                                            onClick={() =>
                                                handleFilterProducts(null)
                                            }
                                        >
                                            All Categories
                                        </MenuItem>
                                        {categories.map(({ name }, index) => (
                                            <MenuItem
                                                color="gray"
                                                _hover={{
                                                    color:
                                                        "var(--chakra-colors-secondary) !important"
                                                }}
                                                key={index}
                                                onClick={() =>
                                                    handleFilterProducts(index)
                                                }
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                                <Divider
                                    orientation="vertical"
                                    height="15px"
                                    color="lightgray"
                                />
                                <Box w="100%" pos="relative">
                                    <InputGroup>
                                        <Input
                                            ml="20px"
                                            variant="unstyled"
                                            placeholder="I'm searching for..."
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <InputRightElement
                                            onClick={handleSubmit}
                                            alignItems="flex-start"
                                            top="3px"
                                            children={
                                                <SearchIcon
                                                    boxSize="18px"
                                                    cursor="pointer"
                                                    _hover={{
                                                        color:
                                                            "var(--chakra-colors-secondary)"
                                                    }}
                                                />
                                            }
                                        />
                                    </InputGroup>
                                    {searchedProducts &&
                                        searchedProducts.length > 0 && (
                                            <VStack
                                                bgColor="#fff"
                                                pos="absolute"
                                                overflowY="scroll"
                                                w="100%"
                                                top="32px"
                                                left="-10px"
                                                maxH="300px"
                                                p="20px 30px"
                                                zIndex="999"
                                                spacing={5}
                                                className="scrollable"
                                                alignItems={
                                                    loading
                                                        ? "center"
                                                        : "flex-start"
                                                }
                                                divider={
                                                    <StackDivider borderColor="gray.200" />
                                                }
                                            >
                                                {loading ? (
                                                    <Spinner color="secondary" />
                                                ) : (
                                                    searchedProducts.map(
                                                        (product, index) => (
                                                            <ProductCardRowSmall
                                                                product={
                                                                    product
                                                                }
                                                                query={query}
                                                                key={
                                                                    index +
                                                                    Date.now()
                                                                }
                                                            />
                                                        )
                                                    )
                                                )}
                                            </VStack>
                                        )}
                                </Box>
                            </HStack>
                        </>
                    )}
                    <Spacer />
                    <Stack direction="row" alignItems="center">
                        {smallerThan1024 && (
                            <IconButton
                                aria-label="Search"
                                fontSize="25px"
                                icon={<Icon as={IoSearch} />}
                                onClick={() => showSearch(true)}
                                variant="unstyled"
                                className="link"
                            />
                        )}
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                fontSize="25px"
                                className="link"
                                variant="unstyled"
                                aria-label="Profile"
                                paddingInlineStart="0"
                                paddingInlineEnd="0"
                                minW="0"
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

                        {(!auth.logged_in ||
                            (auth.logged_in &&
                                auth.user.role === "Customer")) && (
                            <>
                                {!smallerThan1024 && (
                                    <Stack
                                        className="iconBadgeContainer"
                                        margin="0"
                                    >
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
                                <Stack
                                    className="iconBadgeContainer"
                                    margin="0"
                                >
                                    <IconButton
                                        fontSize="25px"
                                        className="link"
                                        aria-label="Cart"
                                        icon={<Icon as={IoCartOutline} />}
                                        variant="unstyled"
                                        onClick={() => history.push("/cart")}
                                    />
                                    <Badge
                                        variant="solid"
                                        colorScheme="red"
                                        className="badge"
                                    >
                                        {cart.length}
                                    </Badge>
                                </Stack>
                            </>
                        )}
                    </Stack>
                </Flex>
                <Flex marginX="20px" background="primary">
                    <Box p="5px 30px" pos="relative">
                        {smallerThan1024 && (
                            <>
                                <Button
                                    className="link"
                                    onClick={onOpen}
                                    borderTop="1px solid var(--chakra-colors-secondary) !important"
                                    borderRadius="0"
                                    fontSize="14px"
                                    color="secondary"
                                    borderBottom="1px solid var(--chakra-colors-secondary) !important"
                                    h="30px"
                                    my="10px"
                                    background="transparent"
                                >
                                    Menu
                                </Button>
                            </>
                        )}
                        {!smallerThan1024 && (
                            <>
                                <Stack
                                    spacing={5}
                                    direction="row"
                                    alignItems="center"
                                    h="50px"
                                >
                                    <Box>
                                        <Link
                                            href="/"
                                            className=" textLink-small"
                                            fontSize="small"
                                            color="#fff"
                                        >
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
                                            className=" textLink-small"
                                            color="#fff"
                                            _hover={{
                                                textDecoration: "none"
                                            }}
                                        >
                                            Shop <ChevronDownIcon />
                                        </Link>
                                        <CSSTransition
                                            in={hovered}
                                            timeout={1000}
                                            classNames="navMenu-page"
                                            unmountOnExit
                                        >
                                            <Grid
                                                templateColumns="repeat(4, 1fr)"
                                                pos="absolute"
                                                p="20px 50px"
                                                color="primary"
                                                gap={6}
                                                bg="#fff"
                                                top="40px"
                                                left="0"
                                                w="800px"
                                                border="1px solid #e8e8e8"
                                                right="0"
                                                className="navMenu-page"
                                                zIndex="999"
                                            >
                                                {categories.map(
                                                    (
                                                        { name, products: ps },
                                                        index
                                                    ) =>
                                                        ps.length ? (
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
                                                                    {ps.map(
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
                                            className=" textLink-small"
                                            color="#fff"
                                        >
                                            Contact
                                        </Link>
                                    </Box>
                                    <Box>
                                        <Link
                                            href="/vendors"
                                            className=" textLink-small"
                                            color="#fff"
                                        >
                                            Vendors
                                        </Link>
                                    </Box>
                                </Stack>
                            </>
                        )}
                    </Box>
                    <Spacer />
                    <HStack
                        bg="secondary"
                        p="10px 20px !important"
                        justifyContent="center"
                    >
                        <Image
                            boxSize="30px"
                            borderRadius="100%"
                            objectFit="cover"
                            src={ShopLocal}
                            alt="Shop Local"
                        />
                        <Text fontSize="1em" color="#fff">
                            Shop Local
                        </Text>
                    </HStack>
                </Flex>
            </Box>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
