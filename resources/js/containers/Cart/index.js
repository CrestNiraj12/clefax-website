import { AddIcon, ArrowBackIcon, MinusIcon } from "@chakra-ui/icons";
import {
    Box,
    Stack,
    Table,
    Thead,
    Tbody,
    Tfoot,
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
    useToast,
    Spinner,
    Flex
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BsXCircle } from "react-icons/bs";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCartProducts } from "../../actions";
import Breadcrumb from "../../components/Breadcrumb";
import { DEFAULT_TOAST } from "../../constants";
import {
    apiClient,
    generateUrl,
    getFinalPrice,
    getLoginRedirection
} from "../../utilities";

const mapStateToProps = state => ({
    products: state.products,
    cart: state.cart,
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    setCartProducts: ps => dispatch(setCartProducts(ps))
});

const Cart = ({ crumbs, auth, products, cart, setCartProducts }) => {
    const toast = useToast(DEFAULT_TOAST);
    var history = useHistory();
    const [cartProducts, setProducts] = useState([]);
    const [updatedProducts, setUpdatedProducts] = useState([]);
    const [qtyChanged, setQtyChanged] = useState(false);
    const [smallerThan768] = useMediaQuery("(max-width:768px)");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setProducts(
            products
                .filter(p => cart.map(c => c.product_id).includes(p.id))
                .map(p => {
                    const cartProduct = cart.filter(
                        cp => cp.product_id === p.id
                    )[0];
                    return {
                        ...p,
                        ordered_qty: cartProduct.qty,
                        subtotal: cartProduct.subtotal
                    };
                })
        );
        setLoading(false);
    }, [cart, products]);

    useEffect(() => {
        if (
            localStorage.getItem("user") &&
            JSON.parse(localStorage.getItem("user")).role !== "Customer"
        ) {
            toast({
                title: "Permission not granted",
                description: "You are not allowed to proceed to the page",
                status: "info"
            });
            history.push("/");
        }
    }, []);

    const handleRemoveProduct = (id, showToast = true) => {
        const removed = cartProducts.filter(p => p.id !== id);
        const removedCart = cart.filter(p => p.product_id !== id);
        if (auth.logged_in)
            apiClient
                .get("/sanctum/csrf-cookie")
                .then(res =>
                    apiClient
                        .delete(`/api/cart/product/${id}`)
                        .then(res => {
                            setProducts(removed);
                            setCartProducts(removedCart);
                            if (showToast)
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
            localStorage.setItem("cart", JSON.stringify(removedCart));
            setCartProducts(removedCart);
            setProducts(removed);
            if (showToast)
                toast({
                    title: "Removed",
                    description: "Successfully deleted product from the cart!",
                    status: "success"
                });
        }
    };

    const handleBulkUpdate = () => {
        const totalProducts =
            cartProducts
                .filter(p => !updatedProducts.map(ps => ps.id).includes(p.id))
                .map(p => p.ordered_qty)
                .reduce((a, b) => a + b, 0) +
            updatedProducts.map(p => p.qty).reduce((a, b) => a + b, 0);
        if (totalProducts > 20) {
            toast({
                title: "Error occurred",
                description:
                    "Maximum product qty limit exceeded in the cart i.e, 20!",
                status: "error"
            });
            return;
        }
        const updates = [];
        updatedProducts.forEach(p => {
            const fp = cartProducts.filter(cp => cp.id === p.id)[0];
            updates.push({
                product_id: p.id,
                qty: p.qty,
                subtotal: getFinalPrice(fp) * p.qty
            });
        });
        if (auth.logged_in)
            apiClient
                .get("/sanctum/csrf-cookie")
                .then(res => {
                    apiClient
                        .put("/api/cart/product/bulk-update", updates)
                        .then(res => {
                            console.log(res.data);
                            setCartProducts([
                                ...updates,
                                ...cartProducts
                                    .filter(
                                        cp =>
                                            !updates
                                                .map(p => p.product_id)
                                                .includes(cp.id)
                                    )
                                    .map(p => {
                                        return {
                                            product_id: p.id,
                                            qty: p.ordered_qty,
                                            subtotal:
                                                getFinalPrice(p) * p.ordered_qty
                                        };
                                    })
                            ]);
                            setQtyChanged(false);
                            toast({
                                title: "Success",
                                description: res.data.message,
                                status: "info"
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            toast({
                                title: "Error occurred",
                                description: err.response
                                    ? err.response.data.message
                                    : "Something went wrong! Please try again!",
                                status: "error"
                            });
                        });
                })
                .catch(err => {
                    console.log(err);
                    toast({
                        title: "Error occurred",
                        description: "Something went wrong! Please try again!",
                        status: "error"
                    });
                });
        else {
            localStorage.setItem(
                "cart",
                JSON.stringify([
                    ...updates,
                    ...cartProducts
                        .filter(
                            cp =>
                                !updates.map(p => p.product_id).includes(cp.id)
                        )
                        .map(p => {
                            return {
                                product_id: p.id,
                                qty: p.ordered_qty,
                                subtotal: getFinalPrice(p) * p.ordered_qty
                            };
                        })
                ])
            );
            setCartProducts([
                ...updates,
                ...cartProducts
                    .filter(
                        cp => !updates.map(p => p.product_id).includes(cp.id)
                    )
                    .map(p => {
                        return {
                            product_id: p.id,
                            qty: p.ordered_qty,
                            subtotal: getFinalPrice(p) * p.ordered_qty
                        };
                    })
            ]);
            setQtyChanged(false);
            toast({
                title: "Success",
                description: "Cart Updated!",
                status: "info"
            });
        }
    };

    return loading ? (
        <Flex h="100vh" w="100%" justifyContent="center" alignItems="center">
            <Spinner color="secondary" />
        </Flex>
    ) : (
        <Box mx="20px" mb="150px">
            <Breadcrumb crumbs={crumbs} margin="20px 0" />

            <Stack
                direction={{ base: "column", lg: "row" }}
                spacing={10}
                my="50px"
                overflow="hidden"
            >
                {cartProducts && cartProducts.length ? (
                    <>
                        <Box overflowX={{ base: "auto", lg: "visible" }}>
                            <Table minW="578px">
                                <Thead bg="lightgray">
                                    <Tr>
                                        <Th></Th>
                                        <Th>Product</Th>
                                        <Th>Price</Th>
                                        <Th>Quantity</Th>
                                        <Th>Subtotal</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {cartProducts.map(
                                        (
                                            {
                                                id,
                                                name: title,
                                                images,
                                                qty,
                                                discount,
                                                price,
                                                ordered_qty,
                                                subtotal,
                                                max_order,
                                                shop: { name }
                                            },
                                            index
                                        ) => (
                                            <Tr key={index}>
                                                <Td>
                                                    <IconButton
                                                        minW="0"
                                                        h="0"
                                                        bg="transparent"
                                                        aria-label="Remove from cart"
                                                        icon={
                                                            <Icon
                                                                as={BsXCircle}
                                                            />
                                                        }
                                                        _hover={{
                                                            color:
                                                                "var(--chakra-colors-secondary) !important"
                                                        }}
                                                        onClick={() =>
                                                            handleRemoveProduct(
                                                                id
                                                            )
                                                        }
                                                    />
                                                </Td>
                                                <Td
                                                    onClick={() =>
                                                        history.push(
                                                            generateUrl(
                                                                id,
                                                                title
                                                            )
                                                        )
                                                    }
                                                    cursor="pointer"
                                                    _hover={{
                                                        color: "secondary"
                                                    }}
                                                >
                                                    <HStack spacing={10}>
                                                        {!smallerThan768 && (
                                                            <Image
                                                                src={images[0]}
                                                                alt={title}
                                                                w="100px"
                                                            />
                                                        )}
                                                        <VStack alignItems="flex-start">
                                                            <Text>{title}</Text>
                                                            <Text fontSize="xs">
                                                                <b>Vendor:</b>{" "}
                                                                {name}
                                                            </Text>
                                                        </VStack>
                                                    </HStack>
                                                </Td>
                                                <Td>
                                                    <Text
                                                        fontSize="xs"
                                                        textDecor="line-through"
                                                        color="gray !important"
                                                    >
                                                        {price.toFixed(2)}
                                                    </Text>
                                                    £
                                                    {getFinalPrice({
                                                        discount,
                                                        price
                                                    }).toFixed(2)}
                                                </Td>
                                                <Td>
                                                    {smallerThan768 ? (
                                                        <NumberInput
                                                            size="sm"
                                                            maxW={16}
                                                            max={qty}
                                                            value={
                                                                cartProducts[
                                                                    index
                                                                ].ordered_qty
                                                            }
                                                            defaultValue={
                                                                ordered_qty
                                                            }
                                                            min={1}
                                                            onChange={(
                                                                _,
                                                                v
                                                            ) => {
                                                                cartProducts[
                                                                    index
                                                                ].ordered_qty = v;
                                                                setProducts([
                                                                    ...cartProducts
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
                                                        <CartQtyInput
                                                            orderedQty={
                                                                ordered_qty
                                                            }
                                                            maxQty={
                                                                qty < max_order
                                                                    ? qty
                                                                    : max_order
                                                            }
                                                            updatedProducts={
                                                                updatedProducts
                                                            }
                                                            setUpdatedProducts={
                                                                setUpdatedProducts
                                                            }
                                                            products={
                                                                cartProducts
                                                            }
                                                            index={index}
                                                            setQtyChanged={
                                                                setQtyChanged
                                                            }
                                                        />
                                                    )}
                                                </Td>
                                                <Td>£{subtotal.toFixed(2)}</Td>
                                            </Tr>
                                        )
                                    )}
                                </Tbody>
                            </Table>
                            <Button
                                bg="primary"
                                px="20px !important"
                                fontSize="sm"
                                color="#fff"
                                mt="10px"
                                disabled={!qtyChanged}
                                onClick={handleBulkUpdate}
                            >
                                Update Cart
                            </Button>
                        </Box>

                        <VStack
                            alignItems="flex-start"
                            w={{ base: "100%", lg: "50%" }}
                            spacing={10}
                        >
                            <Table>
                                <Thead bgColor="lightgray">
                                    <Tr>
                                        <Th colSpan={2} textAlign="center">
                                            Cart Totals
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Subtotal</Td>
                                        <Td>
                                            <Text fontSize="md">
                                                £
                                                {cartProducts.length &&
                                                    cartProducts
                                                        .map(p => p.subtotal)
                                                        .reduce(
                                                            (a, b) => a + b,
                                                            0
                                                        )
                                                        .toFixed(2)
                                                        .replace(
                                                            /\B(?=(\d{3})+(?!\d))/g,
                                                            ","
                                                        )}
                                            </Text>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Total</Td>
                                        <Td>
                                            <Text
                                                fontSize="md"
                                                color="secondary"
                                                fontWeight="bold"
                                            >
                                                £
                                                {cartProducts.length &&
                                                    cartProducts
                                                        .map(p => p.subtotal)
                                                        .reduce(
                                                            (a, b) => a + b,
                                                            0
                                                        )
                                                        .toFixed(2)
                                                        .replace(
                                                            /\B(?=(\d{3})+(?!\d))/g,
                                                            ","
                                                        )}
                                            </Text>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                            <Button
                                bg="secondary"
                                px="20px !important"
                                fontSize="sm"
                                color="#fff"
                                _hover={{
                                    bg:
                                        "var(--chakra-colors-red-600) !important"
                                }}
                                onClick={() => history.push("/checkout")}
                            >
                                Proceed to Checkout
                            </Button>
                        </VStack>
                    </>
                ) : (
                    <Box my="30px">
                        <Text mb="30px" color="gray">
                            Your cart is currently empty.
                        </Text>
                        <Button
                            bg="primary"
                            leftIcon={
                                <ArrowBackIcon fontSize="20px" mr="5px" />
                            }
                            px="20px !important"
                            fontSize="sm"
                            color="#fff"
                            onClick={() => history.push("/shop")}
                        >
                            Return to Shop
                        </Button>
                    </Box>
                )}
            </Stack>
        </Box>
    );
};

const CartQtyInput = ({
    orderedQty,
    maxQty,
    products,
    index,
    setQtyChanged,
    setUpdatedProducts,
    updatedProducts
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
        max: maxQty > 20 ? 20 : maxQty
    });

    useEffect(() => {
        if (updatedProducts.map(p => p.id).includes(products[index].id)) {
            const filter = p => p.id === products[index].id;
            setUpdatedProducts([
                {
                    ...updatedProducts.filter(p => filter(p))[0],
                    qty: valueAsNumber
                },
                ...updatedProducts.filter(p => !filter(p))
            ]);
        } else
            setUpdatedProducts([
                { id: products[index].id, qty: valueAsNumber },
                ...updatedProducts
            ]);
        if (orderedQty !== valueAsNumber) setQtyChanged(true);
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
