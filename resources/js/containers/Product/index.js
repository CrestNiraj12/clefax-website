import {
    Box,
    Heading,
    HStack,
    VStack,
    Icon,
    Text,
    IconButton,
    Input,
    Button,
    ButtonGroup,
    useNumberInput,
    StackDivider,
    Stack,
    SimpleGrid,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
    FaRegStar,
    FaStar,
    FaStarHalfAlt,
    FaFacebook,
    FaTwitter,
    FaLinkedinIn
} from "react-icons/fa";
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton
} from "react-share";
import { IoHeart, IoHeartOutline, IoWarningOutline } from "react-icons/io5";
import ReactStars from "react-rating-stars-component";
import { BsCheckBox, BsXSquare } from "react-icons/bs";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import Breadcrumb from "../../components/Breadcrumb";
import ImageMagnifier from "../../components/ImageMagnifier";
import ProductTabs from "./ProductTabs";
import ProductCardColumn from "../../components/ProductCardColumn";
import { connect } from "react-redux";
import Report from "./Report";
import axios from "axios";
import { apiClient, getAvgReviews, getIdFromUrl } from "../../utilities";
import { DEFAULT_TOAST } from "../../constants";
import { useHistory } from "react-router-dom";
import { addToCart } from "../../utilities/data";
import { setCartProducts, setWishlistProducts } from "../../actions";

const mapStateToProps = state => ({
    products: state.products,
    auth: state.auth,
    wishlist: state.wishlist,
    cart: state.cart
});

const mapDispatchToProps = dispatch => ({
    setCartProducts: cart => dispatch(setCartProducts(cart)),
    setWishlistProducts: wishlist => dispatch(setWishlistProducts(wishlist))
});

const Product = ({
    match,
    crumbs,
    products,
    auth,
    wishlist,
    setWishlistProducts,
    setCartProducts,
    cart
}) => {
    var history = useHistory();
    const toast = useToast(DEFAULT_TOAST);
    const [product, setProduct] = useState(null);
    const [inWishlist, setInWishlist] = useState(null);
    const [related, setRelated] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        valueAsNumber,
        getInputProps,
        getIncrementButtonProps,
        getDecrementButtonProps
    } = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        max: product
            ? product.qty > product.max_order
                ? product.max_order
                : product.qty
            : null
    });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps({ isReadOnly: false });

    useEffect(() => {
        const id = getIdFromUrl(match.params.name);
        axios
            .get(`/api/products/${id}`)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (product) setInWishlist(wishlist.includes(product.id));
    }, [product, wishlist]);

    useEffect(() => {
        if (product && products)
            setRelated(getRelatedProducts(products, product));
    }, [products, product]);

    const addToWishlist = () => {
        if (product) {
            if (auth.logged_in)
                apiClient
                    .get("/sanctum/csrf-cookie")
                    .then(res =>
                        apiClient
                            .post("/api/wishlist/product/add", {
                                product_id: product.id
                            })
                            .then(res => {
                                setWishlistProducts([
                                    ...new Set([product.id, ...wishlist])
                                ]);
                                setInWishlist(true);
                                toast({
                                    title: "Added to wishlist",
                                    description:
                                        "Product has been successfully added to wishlist!",
                                    status: "success"
                                });
                            })
                            .catch(err => {
                                console.log(err.response);
                                toast({
                                    title: "Error",
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
                            title: "Error",
                            description: "Error occured! Please try again!",
                            status: "error"
                        });
                    });
            else {
                localStorage.setItem(
                    "wishlist",
                    JSON.stringify([...new Set([product.id, ...wishlist])])
                );
                setWishlistProducts([...new Set([product.id, ...wishlist])]);
                toast({
                    title: "Added to wishlist",
                    description:
                        "Product has been successfully added to wishlist!",
                    status: "success"
                });
                setInWishlist(true);
            }
        }
    };

    const removeFromWishlist = id => {
        if (product) {
            if (auth.logged_in)
                apiClient
                    .get("/sanctum/csrf-cookie")
                    .then(res =>
                        apiClient
                            .delete(`/api/wishlist/product/${product.id}`)
                            .then(res => {
                                setWishlistProducts(
                                    wishlist.filter(id => id !== product.id)
                                );
                                setInWishlist(false);
                                toast({
                                    title: "Removed",
                                    description: res.data.message,
                                    status: "success"
                                });
                            })
                            .catch(err => console.log(err.response))
                    )
                    .catch(err => console.log(err.response));
            else {
                localStorage.setItem(
                    "wishlist",
                    JSON.stringify(wishlist.filter(id => id !== product.id))
                );
                setWishlistProducts(wishlist.filter(id => id !== product.id));
                setInWishlist(false);
                toast({
                    title: "Removed",
                    description: "Successfully deleted product from wishlist!",
                    status: "success"
                });
            }
        }
    };

    const handleReport = () => {
        if (auth.logged_in) onOpen();
        else
            toast({
                title: "Login required",
                description: "You need to be logged in to report a product",
                status: "info"
            });
    };

    const onSuccess = id => {
        history.push("/cart");
        toast({
            title: "Added to cart",
            description: "Product has been successfully added to cart!",
            status: "success"
        });
    };

    const onSuccessBuy = id => {
        history.push("/checkout");
        toast({
            title: "Added to cart",
            description: "Product has been successfully added to cart!",
            status: "success"
        });
    };

    const onError = err => {
        console.log(err);
        toast({
            title: "Error occurred",
            description: err.response
                ? err.response.data.message
                : "Something wrong happened! Please try again!",
            status: "error"
        });
    };

    const logicError = () => {
        toast({
            title: "Error",
            description:
                "Maximum product qty limit exceeded in the cart i.e, 20!",
            status: "error"
        });
    };

    const maxOrderExceedError = (max_order, unit) => {
        toast({
            title: "Error",
            description: `You can only buy ${max_order} ${unit}(s) in one slot!`,
            status: "error"
        });
    };

    return (
        <Box mx="20px" mb="100px">
            <Box mb={{ base: "0", md: "150px" }}>
                {product && (
                    <>
                        <Report
                            isOpen={isOpen}
                            onClose={onClose}
                            product_id={product.id}
                        />
                        <Breadcrumb
                            crumbs={crumbs}
                            customPageName={product.name}
                            margin="20px 0"
                        />

                        <Stack
                            spacing={10}
                            my="30px"
                            alignItems="flex-start"
                            w="100%"
                            direction={{ base: "column", md: "row" }}
                        >
                            <ImageMagnifier
                                images={product.images}
                                title={product.name}
                            />

                            <Box
                                w={{ base: "100%", md: "60%" }}
                                mt={{
                                    base: "180px !important",
                                    md: "0 !important"
                                }}
                            >
                                <Heading as="h1">{product.name}</Heading>
                                <HStack spacing={2} my="20px">
                                    {product.discount && product.discount > 0 && (
                                        <Heading
                                            as="h2"
                                            color="gray"
                                            fontSize="xl"
                                            textDecor="line-through"
                                        >
                                            £{product.price.toFixed(2)}
                                        </Heading>
                                    )}
                                    <Heading
                                        as="h2"
                                        fontSize="xl"
                                        color="secondary"
                                    >
                                        £
                                        {(product.discount &&
                                        product.discount > 0
                                            ? product.price -
                                              product.price *
                                                  (product.discount / 100)
                                            : product.price
                                        ).toFixed(2)}
                                    </Heading>
                                </HStack>
                                <HStack alignItems="flex-end">
                                    <ReactStars
                                        edit={false}
                                        value={getAvgReviews(product.reviews)}
                                        size={18}
                                        emptyIcon={<Icon as={FaRegStar} />}
                                        filledIcon={<Icon as={FaStar} />}
                                        halfIcon={<Icon as={FaStarHalfAlt} />}
                                    />
                                    <Text color="gray">
                                        {`(${
                                            product.reviews.length
                                                ? product.reviews.length
                                                : "No"
                                        } Customer Review${
                                            product.reviews.length === 1
                                                ? ""
                                                : "s"
                                        })`}
                                    </Text>
                                </HStack>
                                <Box my="20px" fontSize="16px" color="gray">
                                    Availability:{" "}
                                    {product.qty ? (
                                        <>
                                            <Icon
                                                as={BsCheckBox}
                                                boxSize="22px"
                                                mx="10px"
                                                color="green.300"
                                            />{" "}
                                            In
                                        </>
                                    ) : (
                                        <>
                                            <Icon
                                                as={BsXSquare}
                                                boxSize="22px"
                                                mx="10px"
                                                color="red.300"
                                            />{" "}
                                            Out of
                                        </>
                                    )}{" "}
                                    stock
                                </Box>
                                <Text color="gray">{product.description}</Text>
                                {product.coupon && (
                                    <Text
                                        color="green.400"
                                        my="20px"
                                        fontSize="medium"
                                    >
                                        Sale 30% Off Use Code : Neoo20
                                    </Text>
                                )}
                                {(!auth.logged_in ||
                                    (auth.logged_in &&
                                        auth.user.role === "Customer")) && (
                                    <Stack
                                        direction={{
                                            base: "column",
                                            sm: "row",
                                            md: "column",
                                            lg: "row"
                                        }}
                                        mt="30px"
                                        spacing={5}
                                        justifyContent="space-between"
                                    >
                                        <HStack w="100%" spacing={5}>
                                            <ButtonGroup
                                                size="md"
                                                isAttached
                                                variant="outline"
                                            >
                                                <IconButton
                                                    aria-label="Decrease quantity"
                                                    borderRadius="0"
                                                    icon={<MinusIcon />}
                                                    _hover={{
                                                        backgroundColor:
                                                            "transparent !important",
                                                        color:
                                                            "var(--chakra-colors-secondary) !important"
                                                    }}
                                                    {...dec}
                                                />
                                                <Input
                                                    borderRadius="0"
                                                    textAlign="center"
                                                    w="60px"
                                                    minW="60px"
                                                    {...input}
                                                />

                                                <IconButton
                                                    borderRadius="0"
                                                    aria-label="Increase quantity"
                                                    icon={<AddIcon />}
                                                    _hover={{
                                                        backgroundColor:
                                                            "transparent !important",
                                                        color:
                                                            "var(--chakra-colors-secondary) !important"
                                                    }}
                                                    {...inc}
                                                />
                                            </ButtonGroup>

                                            <Button
                                                bgColor="primary"
                                                color="#fff"
                                                w="100%"
                                                disabled={!product.qty}
                                                onClick={() =>
                                                    addToCart(
                                                        product,
                                                        auth,
                                                        valueAsNumber,
                                                        onSuccess,
                                                        onError,
                                                        logicError,
                                                        setCartProducts,
                                                        cart,
                                                        maxOrderExceedError
                                                    )
                                                }
                                            >
                                                Add To Cart
                                            </Button>
                                        </HStack>
                                        <Button
                                            bgColor="secondary"
                                            color="#fff"
                                            w={{
                                                base: "100%",
                                                sm: "50%",
                                                md: "100%",
                                                lg: "50%"
                                            }}
                                            _hover={{
                                                bgColor: "#ca282d !important"
                                            }}
                                            disabled={!product.qty}
                                            onClick={() =>
                                                addToCart(
                                                    product,
                                                    auth,
                                                    valueAsNumber,
                                                    onSuccessBuy,
                                                    onError,
                                                    logicError,
                                                    setCartProducts,
                                                    cart,
                                                    maxOrderExceedError
                                                )
                                            }
                                        >
                                            Buy Now
                                        </Button>
                                    </Stack>
                                )}
                                <HStack alignItems="baseline" spacing={5}>
                                    {auth.logged_in &&
                                        auth.user.role === "Customer" && (
                                            <Button
                                                mt="20px"
                                                mb="30px"
                                                color={
                                                    inWishlist
                                                        ? "secondary"
                                                        : "gray"
                                                }
                                                leftIcon={
                                                    <Icon
                                                        as={
                                                            inWishlist
                                                                ? IoHeart
                                                                : IoHeartOutline
                                                        }
                                                        boxSize="22px"
                                                        mr="5px"
                                                    />
                                                }
                                                variant="link"
                                                textTransform="none"
                                                letterSpacing="0"
                                                _hover={{
                                                    background:
                                                        "transparent !important",
                                                    color:
                                                        "var(--chakra-colors-secondary) !important"
                                                }}
                                                onClick={
                                                    inWishlist
                                                        ? removeFromWishlist
                                                        : addToWishlist
                                                }
                                            >
                                                {inWishlist
                                                    ? "Added to Wishlist!"
                                                    : "Add to Wishlist"}
                                            </Button>
                                        )}
                                    <Button
                                        mt="20px"
                                        mb="30px"
                                        leftIcon={
                                            <Icon
                                                as={IoWarningOutline}
                                                boxSize="22px"
                                                mr="5px"
                                            />
                                        }
                                        color="gray"
                                        variant="link"
                                        textTransform="none"
                                        letterSpacing="0"
                                        onClick={handleReport}
                                        _hover={{
                                            background:
                                                "transparent !important",
                                            color:
                                                "var(--chakra-colors-yellow) !important"
                                        }}
                                    >
                                        Report
                                    </Button>
                                </HStack>
                                <VStack
                                    divider={<StackDivider />}
                                    alignItems="flex-start"
                                    my="20px"
                                    color="gray"
                                >
                                    <Text py="5px">
                                        <b>SKU:</b> U
                                        {String(product.id).padStart(5, "0")}
                                    </Text>
                                    <Text py="5px">
                                        <b>Category:</b> {product.category.name}
                                    </Text>
                                    <Text py="5px">
                                        <b>Tags:</b>{" "}
                                        {product.tags
                                            ? product.tags
                                            : "No tags available"}
                                    </Text>
                                    <HStack py="5px">
                                        <b>Share:</b>{" "}
                                        <HStack spacing={3}>
                                            <FacebookShareButton
                                                url={window.location.href}
                                                style={{
                                                    borderRadius: "100%",
                                                    border: "1px solid gray",
                                                    padding: "10px"
                                                }}
                                                className="shareBtn"
                                            >
                                                <Icon
                                                    as={FaFacebook}
                                                    boxSize="22px"
                                                />
                                            </FacebookShareButton>
                                            <TwitterShareButton
                                                url={window.location.href}
                                                style={{
                                                    borderRadius: "100%",
                                                    border: "1px solid gray",
                                                    padding: "10px"
                                                }}
                                                className="shareBtn"
                                            >
                                                <Icon
                                                    as={FaTwitter}
                                                    boxSize="22px"
                                                />
                                            </TwitterShareButton>
                                            <LinkedinShareButton
                                                url={window.location.href}
                                                style={{
                                                    borderRadius: "100%",
                                                    border: "1px solid gray",
                                                    padding: "10px"
                                                }}
                                                className="shareBtn"
                                            >
                                                <Icon
                                                    as={FaLinkedinIn}
                                                    boxSize="22px"
                                                />
                                            </LinkedinShareButton>
                                        </HStack>
                                    </HStack>
                                </VStack>
                            </Box>
                        </Stack>
                    </>
                )}
            </Box>
            <Box>
                <ProductTabs product={product} />
            </Box>
            <Box my="50px">
                <Heading>Related Products</Heading>
                <SimpleGrid
                    columnGap={5}
                    rowGap={5}
                    mt="50px"
                    columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
                >
                    {related.slice(0, 5).map((p, index) => (
                        <ProductCardColumn
                            product={p}
                            hideRatings={true}
                            key={index + new Date()}
                        />
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

const getRelatedProducts = (products, product) => {
    if (products && product) {
        const related = products.filter(
            p =>
                p.category.name === product.category.name &&
                p.name !== product.name
        );

        const unrelated = products.filter(
            p =>
                p.name !== product.name &&
                related.every(pr => pr.name !== p.name)
        );
        return [...related, ...unrelated.sort(() => 0.5 - Math.random())];
    } else return [];
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
