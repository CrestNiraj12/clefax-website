import {
    Box,
    Heading,
    Stack,
    StackDivider,
    Text,
    VStack,
    Table,
    Thead,
    Tr,
    Td,
    Th,
    Tbody,
    useToast,
    Spinner,
    Flex
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setCartProducts } from "../../actions";
import Breadcrumb from "../../components/Breadcrumb";
import qs from "query-string";
import { useHistory } from "react-router-dom";
import { apiClient } from "../../utilities";
import { DEFAULT_TOAST } from "../../constants";

const mapStateToProps = state => ({
    auth: state.auth,
    slots: state.slots
});

const mapDispatchToProps = dispatch => ({
    setCartProducts: cart => dispatch(setCartProducts(cart))
});

const Invoice = ({ crumbs, setCartProducts, auth, slots }) => {
    var history = useHistory();
    const toast = useToast(DEFAULT_TOAST);
    const [order, setOrder] = useState(null);
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const query = qs.parse(location.search);
        if (!query.oid) {
            history.push("/");
            return;
        }

        if (localStorage.getItem("user")) {
            const user = JSON.parse(localStorage.getItem("user"));
            apiClient
                .get("/sanctum/csrf-cookie")
                .then(res => {
                    apiClient
                        .post(`/api/orders/${query.oid}`, {
                            user_id:
                                user.role === "Admin" || user.role === "Trader"
                                    ? query.user_id
                                    : null
                        })
                        .then(res => {
                            setLoading(false);
                            setOrder(res.data);
                            console.log(res.data);
                        })
                        .catch(err => {
                            setLoading(false);
                            console.log(err.response);
                            toast({
                                title: "Error occurred!",
                                description: "Error retrieving order details!",
                                status: "error"
                            });
                            history.goBack();
                        });
                })
                .catch(err => console.log(err));
        }
    }, []);

    useEffect(() => {
        setCartProducts([]);
        const d = new Date();
        setDate(
            new Date(d.getTime() - d.getTimezoneOffset() * 60000)
                .toISOString()
                .split("T")[0]
        );
    }, []);

    return (
        auth.logged_in &&
        (loading ? (
            <Flex
                w="100%"
                h="100vh"
                justifyContent="center"
                alignItems="center"
            >
                <Spinner color="secondary" />
            </Flex>
        ) : (
            order && (
                <Box mx="20px" mb="100px">
                    <Breadcrumb crumbs={crumbs} margin="20px 0" />
                    <VStack my="50px" spacing={10} alignItems="flex-start">
                        <Box
                            border="1px solid"
                            borderColor="secondary"
                            w="100%"
                            textAlign="center"
                            py="10px"
                        >
                            <Text color="secondary">
                                Thank you. Your order has been received!
                            </Text>
                        </Box>
                        <Stack
                            direction={{ base: "column", md: "row" }}
                            divider={<StackDivider />}
                            w="100%"
                            justifyContent="space-evenly"
                        >
                            <Text color="darkgray">
                                Order no:{" "}
                                <b>{order.id.toString().padStart(4, "0")}</b>
                            </Text>
                            <Text color="darkgray">
                                Order Date: <b>{date}</b>
                            </Text>
                            <Text color="darkgray">
                                Email: <b>{order.user.email}</b>
                            </Text>
                            <Text color="darkgray">
                                Total:{" "}
                                <b>
                                    £
                                    {order.total
                                        .toFixed(2)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </b>
                            </Text>
                            <Text color="darkgray">
                                Payment method:{" "}
                                <b style={{ textTransform: "capitalize" }}>
                                    {order.payment.method}
                                </b>
                            </Text>
                        </Stack>
                        <Heading as="h6" fontSize="1.5em">
                            Order Details
                        </Heading>

                        <Table bgColor="#fff">
                            <Thead bg="lightgray">
                                <Tr>
                                    <Th>Product</Th>
                                    <Th>Amount</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {order.products.map((product, index) => (
                                    <Tr key={index}>
                                        <Td>
                                            <VStack alignItems="flex-start">
                                                <Text>
                                                    {product.name} ×{" "}
                                                    <span>
                                                        {product.pivot.qty}{" "}
                                                        {product.unit}(s)
                                                    </span>
                                                </Text>
                                                <Text>
                                                    <b>Vendor:</b>{" "}
                                                    {product.shop.name}
                                                </Text>
                                            </VStack>
                                        </Td>
                                        <Td>
                                            <Text fontWeight="bold">
                                                £
                                                {Number(product.pivot.subtotal)
                                                    .toFixed(2)
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                    )}
                                            </Text>
                                        </Td>
                                    </Tr>
                                ))}
                                <Tr>
                                    <Td>Subtotal</Td>
                                    <Td>
                                        <Text fontWeight="bold">
                                            £
                                            {order.subtotal
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
                                            color="secondary"
                                            fontWeight="bold"
                                            fontSize="xl"
                                        >
                                            £
                                            {order.total
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
                        <Box>
                            <Text mb="10px">
                                Collection Date and Time:{" "}
                                <b>
                                    {order.date} [
                                    {slots && order.collection_slot.times}]
                                </b>
                            </Text>
                            <Text mb="10px">
                                Pickup Location: 189 Spen Lane, Gomersal, West
                                Yorkshire, BD19 4PJ
                            </Text>
                            <Text>Contact No.: 1611236789</Text>
                        </Box>
                    </VStack>
                </Box>
            )
        ))
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
