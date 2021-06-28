import { AddIcon, ArrowBackIcon, MinusIcon } from "@chakra-ui/icons";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
    IconButton,
    Icon,
    useNumberInput,
    Input,
    VStack,
    ButtonGroup,
    Button,
    Image,
    Text,
    HStack,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useMediaQuery,
    Badge,
    useToast
} from "@chakra-ui/react";
import { uniqBy } from "lodash";
import React, { useState, useEffect } from "react";
import { BsXCircle } from "react-icons/bs";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { DEFAULT_TOAST } from "../../constants";
import { apiClient, generateUrl } from "../../utilities";

const mapStateToProps = state => ({
    products: state.products,
    auth: state.auth
});

const Wishlist = ({ crumbs, auth, products }) => {
    const toast = useToast(DEFAULT_TOAST);
    var history = useHistory();
    const [wishlistProducts, setProducts] = useState([]);
    const [smallerThan1024] = useMediaQuery("(max-width:1024px)");

    useEffect(() => {
        var tempProducts = [];
        if (auth.logged_in)
            apiClient
                .get("/sanctum/csrf-cookie")
                .then(res =>
                    apiClient
                        .get("/api/wishlist")
                        .then(res => {
                            tempProducts = uniqBy(res.data.products, "id");
                            setProducts(
                                tempProducts
                                    ? tempProducts.map(ps => {
                                          return { ...ps, ordered_qty: 1 };
                                      })
                                    : []
                            );
                        })
                        .catch(err => console.log(err))
                )
                .catch(err => console.log(err.response));
        else {
            if (localStorage.getItem("wishlist")) {
                const ps = JSON.parse(localStorage.getItem("wishlist"));
                tempProducts = products.filter(p => ps.includes(p.id));
                setProducts(
                    tempProducts
                        ? tempProducts.map(ps => {
                              return { ...ps, ordered_qty: 1 };
                          })
                        : []
                );
            }
        }
    }, [products]);

    const handleRemoveProduct = id => {
        const removed = wishlistProducts.filter(p => p.id !== id);
        if (auth.logged_in)
            apiClient
                .get("/sanctum/csrf-cookie")
                .then(res =>
                    apiClient
                        .delete(`/api/wishlist/product/${id}`)
                        .then(res => {
                            setProducts(removed);
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
                JSON.stringify(removed.map(p => p.id))
            );
            toast({
                title: "Removed",
                description: "Successfully deleted product from wishlist!",
                status: "success"
            });
            setProducts(removed);
        }
    };

    return (
        <Box mx="20px" mb="150px">
            <Breadcrumb crumbs={crumbs} margin="20px 0" />

            {wishlistProducts.length ? (
                <Box my="50px" overflow="hidden">
                    <Box overflowX="auto">
                        <Table minW="768px">
                            <Thead bg="lightgray">
                                <Tr>
                                    <Th></Th>
                                    <Th>Product</Th>
                                    <Th>Price</Th>
                                    <Th>Status</Th>
                                    <Th>Quantity</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {wishlistProducts.map(
                                    (
                                        {
                                            id,
                                            name: title,
                                            discount,
                                            images,
                                            max_order,
                                            qty,
                                            price,
                                            ordered_qty,
                                            shop: { name }
                                        },
                                        index
                                    ) => (
                                        <Tr key={id}>
                                            <Td>
                                                <IconButton
                                                    minW="0"
                                                    h="0"
                                                    bg="transparent"
                                                    aria-label="Remove from wishlist"
                                                    icon={
                                                        <Icon as={BsXCircle} />
                                                    }
                                                    _hover={{
                                                        color:
                                                            "var(--chakra-colors-secondary) !important"
                                                    }}
                                                    onClick={() =>
                                                        handleRemoveProduct(id)
                                                    }
                                                />
                                            </Td>
                                            <Td
                                                onClick={() =>
                                                    history.push(
                                                        generateUrl(id, title)
                                                    )
                                                }
                                                cursor="pointer"
                                                _hover={{ color: "secondary" }}
                                            >
                                                <HStack spacing={10}>
                                                    {!smallerThan1024 && (
                                                        <Image
                                                            src={images[0]}
                                                            alt={title}
                                                            w="100px"
                                                        />
                                                    )}
                                                    <VStack alignItems="flex-start">
                                                        <Text>{title}</Text>
                                                        <Text>
                                                            <b>Vendor:</b>{" "}
                                                            {name}
                                                        </Text>
                                                    </VStack>
                                                </HStack>
                                            </Td>
                                            <Td>
                                                {discount > 0 && (
                                                    <Text
                                                        color="gray"
                                                        fontSize="md"
                                                        textDecor="line-through"
                                                    >
                                                        £{price.toFixed(2)}
                                                    </Text>
                                                )}
                                                <Text
                                                    as="h2"
                                                    fontSize="md"
                                                    color="secondary"
                                                >
                                                    £
                                                    {(discount > 0
                                                        ? price -
                                                          price *
                                                              (discount / 100)
                                                        : price
                                                    ).toFixed(2)}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Badge
                                                    ml="1"
                                                    fontSize="0.8em"
                                                    colorScheme={
                                                        qty <= 0
                                                            ? "red"
                                                            : "green"
                                                    }
                                                >
                                                    {qty <= 0
                                                        ? "Out of Stock"
                                                        : "In Stock"}
                                                </Badge>
                                            </Td>
                                            <Td>
                                                {smallerThan1024 ? (
                                                    <NumberInput
                                                        size="sm"
                                                        maxW={16}
                                                        max={qty}
                                                        isDisabled={qty <= 0}
                                                        value={
                                                            wishlistProducts[
                                                                index
                                                            ].ordered_qty
                                                        }
                                                        defaultValue={
                                                            ordered_qty
                                                        }
                                                        min={1}
                                                        onChange={(_, v) => {
                                                            wishlistProducts[
                                                                index
                                                            ].ordered_qty = v;
                                                            setProducts([
                                                                ...wishlistProducts
                                                            ]);
                                                            if (
                                                                ordered_qty !==
                                                                v
                                                            )
                                                                setQtyChanged(
                                                                    true
                                                                );
                                                        }}
                                                    >
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                ) : (
                                                    <WishlistQtyInput
                                                        orderedQty={ordered_qty}
                                                        maxQty={
                                                            qty < max_order
                                                                ? qty
                                                                : max_order
                                                        }
                                                        setProducts={
                                                            setProducts
                                                        }
                                                        inStock={qty > 0}
                                                        products={
                                                            wishlistProducts
                                                        }
                                                        index={index}
                                                    />
                                                )}
                                            </Td>

                                            <Td>
                                                <Button
                                                    bg="secondary"
                                                    px="20px !important"
                                                    fontSize="xs"
                                                    color="#fff"
                                                    disabled={
                                                        qty <= 0 || !ordered_qty
                                                    }
                                                >
                                                    Add to Cart
                                                </Button>
                                            </Td>
                                        </Tr>
                                    )
                                )}
                            </Tbody>
                        </Table>
                    </Box>
                </Box>
            ) : (
                <Box my="30px">
                    <Text mb="30px" color="gray">
                        Your wishlist is currently empty.
                    </Text>
                    <Button
                        bg="primary"
                        leftIcon={<ArrowBackIcon fontSize="20px" mr="5px" />}
                        px="20px !important"
                        fontSize="sm"
                        color="#fff"
                        onClick={() => history.push("/shop")}
                    >
                        Return to Shop
                    </Button>
                </Box>
            )}
        </Box>
    );
};

const WishlistQtyInput = ({
    orderedQty,
    maxQty,
    setProducts,
    products,
    index,
    inStock
}) => {
    const {
        valueAsNumber,
        getInputProps,
        getIncrementButtonProps,
        getDecrementButtonProps
    } = useNumberInput({
        step: 1,
        defaultValue: orderedQty,
        min: 1,
        max: maxQty > 20 ? 20 : maxQty,
        isDisabled: !inStock
    });

    useEffect(() => {
        products[index].ordered_qty = valueAsNumber;
        setProducts([...products]);
    }, [valueAsNumber]);

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps({ isReadOnly: false });

    return (
        <ButtonGroup size="md" isAttached variant="outline">
            <IconButton
                aria-label="Decrease quantity"
                borderRadius="0"
                icon={<MinusIcon boxSize="10px" />}
                _hover={{
                    backgroundColor: "transparent !important",
                    color: "var(--chakra-colors-secondary) !important"
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
                icon={<AddIcon boxSize="10px" />}
                _hover={{
                    backgroundColor: "transparent !important",
                    color: "var(--chakra-colors-secondary) !important"
                }}
                {...inc}
            />
        </ButtonGroup>
    );
};

export default connect(mapStateToProps)(Wishlist);
