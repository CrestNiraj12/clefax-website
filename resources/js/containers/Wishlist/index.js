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
    Badge
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
        qty: 0,
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

const Wishlist = ({ crumbs }) => {
    var history = useHistory();
    const [products, setProducts] = useState([]);
    const [smallerThan1024] = useMediaQuery("(max-width:1024px)");

    useEffect(() => {
        setProducts(ps);
    }, []);

    const handleRemoveProduct = id => {
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <Box mx="20px" mb="150px">
            <Breadcrumb crumbs={crumbs} margin="20px 0" />

            {products && products.length ? (
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
                                {products.map(
                                    (
                                        {
                                            id,
                                            title,
                                            discount,
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
                                            <Td>
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
                                                {discount && discount > 0 && (
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
                                                    {(discount && discount > 0
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
                                                            products[index]
                                                                .ordered_qty
                                                        }
                                                        defaultValue={
                                                            ordered_qty
                                                        }
                                                        min={1}
                                                        onChange={(_, v) => {
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
                                                        orderedQty={ordered_qty}
                                                        maxQty={qty}
                                                        setProducts={
                                                            setProducts
                                                        }
                                                        inStock={qty > 0}
                                                        products={products}
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
                                                    disabled={qty <= 0}
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
                        Your cart is currently empty.
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

const CartQtyInput = ({
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

export default Wishlist;
