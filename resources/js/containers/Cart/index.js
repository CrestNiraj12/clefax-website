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
    useMediaQuery
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BsXCircle } from "react-icons/bs";
import Cookies from "../../../images/cookies.png";
import { useHistory } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";

const ps = [
    {
        id: "0001",
        title: "Choco Chip Cookies",
        images: [Cookies, Cookies],
        rating: 4,
        url: "/shop/product-title-1",
        qty: 10,
        ordered_qty: 5,
        price: 46.0,
        discount: 25,
        categories: ["Cookies"],
        created_at: "2021/01/01",
        coupon: null,
        tags: ["Cookies", "Bakery", "Food"],
        shop: {
            name: "Raju prods"
        }
    },
    {
        id: "0002",
        title: "Oreo Cookies",
        images: [Cookies, Cookies],
        rating: 4,
        url: "/shop/product-title-1",
        qty: 10,
        ordered_qty: 1,
        price: 46.0,
        discount: 25,
        categories: ["Cookies"],
        created_at: "2021/01/01",
        coupon: null,
        tags: ["Cookies", "Bakery", "Food"],
        shop: {
            name: "Suresh prods"
        }
    }
];

const Cart = ({ crumbs }) => {
    var history = useHistory();
    const [products, setProducts] = useState([]);
    const [qtyChanged, setQtyChanged] = useState(false);
    const [smallerThan768] = useMediaQuery("(max-width:768px)");

    useEffect(() => {
        setProducts(ps);
    }, []);

    const handleRemoveProduct = id => {
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <Box mx="20px" mb="150px">
            <Breadcrumb crumbs={crumbs} margin="20px 0" />

            <Stack
                direction={{ base: "column", lg: "row" }}
                spacing={10}
                my="50px"
                overflow="hidden"
            >
                {products && products.length ? (
                    <>
                        <Box overflowX="auto">
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
                                    {products.map(
                                        (
                                            {
                                                id,
                                                title,
                                                images,
                                                qty,
                                                price,
                                                ordered_qty,
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
                                                <Td>
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
                                                            <Text>
                                                                <b>Vendor:</b>{" "}
                                                                {name}
                                                            </Text>
                                                        </VStack>
                                                    </HStack>
                                                </Td>
                                                <Td>£{price.toFixed(2)}</Td>
                                                <Td>
                                                    {smallerThan768 ? (
                                                        <NumberInput
                                                            size="sm"
                                                            maxW={16}
                                                            max={qty}
                                                            value={
                                                                products[index]
                                                                    .ordered_qty
                                                            }
                                                            defaultValue={
                                                                ordered_qty
                                                            }
                                                            min={1}
                                                            onChange={(
                                                                _,
                                                                v
                                                            ) => {
                                                                products[
                                                                    index
                                                                ].ordered_qty = v;
                                                                setProducts([
                                                                    ...products
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
                                                            maxQty={qty}
                                                            setProducts={
                                                                setProducts
                                                            }
                                                            products={products}
                                                            index={index}
                                                            setQtyChanged={
                                                                setQtyChanged
                                                            }
                                                        />
                                                    )}
                                                </Td>
                                                <Td>£{price.toFixed(2)}</Td>
                                            </Tr>
                                        )
                                    )}
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Td colSpan={5}>
                                            <Button
                                                bg="primary"
                                                px="20px !important"
                                                fontSize="sm"
                                                color="#fff"
                                                disabled={!qtyChanged}
                                            >
                                                Update Cart
                                            </Button>
                                        </Td>
                                    </Tr>
                                </Tfoot>
                            </Table>
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
                                            <Text fontSize="md">£100.00</Text>
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
                                                £100.00
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
    setProducts,
    products,
    index,
    setQtyChanged
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
        products[index].ordered_qty = valueAsNumber;
        setProducts([...products]);
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

export default Cart;
