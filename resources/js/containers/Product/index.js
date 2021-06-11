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
    useDisclosure
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
import { IoHeartOutline, IoWarningOutline } from "react-icons/io5";
import ReactStars from "react-rating-stars-component";
import { BsCheckBox, BsXSquare } from "react-icons/bs";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import Breadcrumb from "../../components/Breadcrumb";
import ImageMagnifier from "../../components/ImageMagnifier";
import ProductTabs from "./ProductTabs";
import ProductCardColumn from "../../components/ProductCardColumn";
import { connect } from "react-redux";
import Report from "./Report";
import Cookies from "../../../images/cookies.png";

const in_product = {
    id: "0001",
    title: "Choco Chip Cookies",
    images: [Cookies, Cookies],
    rating: 4,
    url: "/shop/product-title-1",
    qty: 10,
    price: 46.0,
    discount: 25,
    categories: ["Cookies"],
    created_at: "2021/01/01",
    coupon: null,
    tags: ["Cookies", "Bakery", "Food"]
};

const mapStateToProps = state => ({
    products: state.products
});

const Product = ({ match, crumbs, products }) => {
    const [product, setProduct] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [qty, setQty] = useState(1);
    const {
        getInputProps,
        getIncrementButtonProps,
        getDecrementButtonProps
    } = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        max: in_product.qty > 20 ? 20 : in_product.qty
    });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps({ isReadOnly: false });

    useEffect(() => {
        const id = match.params.title.split("-").pop();
        setProduct(in_product);
    }, []);

    return (
        <Box mx="20px" mb="100px">
            <Box mb={{ base: "0", md: "150px" }}>
                {product && (
                    <>
                        <Report isOpen={isOpen} onClose={onClose} />
                        <Breadcrumb
                            crumbs={crumbs}
                            customPageName="Bluetooth Hismart"
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
                                title={product.title}
                            />

                            <Box
                                w={{ base: "100%", md: "50%" }}
                                mt={{
                                    base: "180px !important",
                                    md: "0 !important"
                                }}
                            >
                                <Heading as="h1">{product.title}</Heading>
                                <HStack spacing={2} my="20px">
                                    {product.discount && product.discount > 0 && (
                                        <Heading
                                            as="h2"
                                            fontSize="lg"
                                            color="gray"
                                            fontSize="xl"
                                            textDecor="line-through"
                                        >
                                            £{product.price.toFixed(2)}
                                        </Heading>
                                    )}
                                    <Heading
                                        as="h2"
                                        fontSize="lg"
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
                                        value={product.rating}
                                        size={18}
                                        emptyIcon={<Icon as={FaRegStar} />}
                                        filledIcon={<Icon as={FaStar} />}
                                        halfIcon={<Icon as={FaStarHalfAlt} />}
                                    />
                                    <Text color="gray">
                                        (1 Customer Review)
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
                                <Text color="gray">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat. Duis aute irure
                                    dolor in reprehenderit in voluptate velit
                                    esse cillum dolore eu fugiat nulla pariatur.
                                </Text>
                                {product.coupon && (
                                    <Text
                                        color="green.400"
                                        my="20px"
                                        fontSize="medium"
                                    >
                                        Sale 30% Off Use Code : Neoo20
                                    </Text>
                                )}
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
                                                onChange={e => {
                                                    const v = Number(
                                                        e.target.value
                                                    );
                                                    setQty(v);
                                                }}
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
                                    >
                                        Buy Now
                                    </Button>
                                </Stack>
                                <HStack alignItems="baseline" spacing={5}>
                                    <Button
                                        mt="20px"
                                        mb="30px"
                                        leftIcon={
                                            <Icon
                                                as={IoHeartOutline}
                                                boxSize="22px"
                                                mr="5px"
                                            />
                                        }
                                        color="gray"
                                        variant="link"
                                        textTransform="none"
                                        letterSpacing="0"
                                        _hover={{
                                            background:
                                                "transparent !important",
                                            color:
                                                "var(--chakra-colors-secondary) !important"
                                        }}
                                    >
                                        Add to Wishlist
                                    </Button>
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
                                        onClick={onOpen}
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
                                        <b>SKU:</b> U{product.id}
                                    </Text>
                                    <Text py="5px">
                                        <b>Categories:</b>{" "}
                                        {product.categories.join(", ")}
                                    </Text>
                                    <Text py="5px">
                                        <b>Tags:</b> {product.tags.join(", ")}
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
                <ProductTabs title={product ? product.title : ""} />
            </Box>
            <Box my="50px">
                <Heading>Related Products</Heading>
                <SimpleGrid
                    columnGap={5}
                    rowGap={5}
                    mt="50px"
                    columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
                >
                    {[
                        ...products.filter(p =>
                            p.categories.some(cat =>
                                product.categories
                                    .map(c => c.toLowerCase())
                                    .includes(cat.toLowerCase())
                            )
                        ),
                        ...products
                    ]
                        .slice(0, 5)
                        .map((p, index) => (
                            <ProductCardColumn
                                product={p}
                                hideRatings={true}
                                key={index}
                            />
                        ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default connect(mapStateToProps)(Product);
