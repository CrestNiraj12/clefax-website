import React, { useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Th,
    Tr,
    Td,
    Button,
    Badge,
    Heading,
    Link,
    Spinner,
    Flex,
    Box,
    useToast
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { apiClient } from "../../utilities";
import { DEFAULT_TOAST } from "../../constants";

const Orders = () => {
    var history = useHistory();
    const toast = useToast(DEFAULT_TOAST);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        apiClient
            .get("/sanctum/csrf-cookie")
            .then(res =>
                apiClient
                    .get("/api/orders")
                    .then(res => {
                        setOrders(res.data);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.log(err);
                        toast({
                            title: "Error occurred!",
                            description: "Error retrieving orders!",
                            status: "error"
                        });
                        history.goBack();
                    })
            )
            .catch(err => console.log(err));
    }, []);

    return loading ? (
        <Flex w="100%" justifyContent="center" alignItems="center">
            <Spinner color="secondary" />
        </Flex>
    ) : (
        <>
            {orders && orders.length ? (
                <Box maxH="500px" className="scrollable" overflowY="auto">
                    <Table>
                        <Thead bg="lightgray">
                            <Tr>
                                <Th>Order No.</Th>
                                <Th>Date</Th>
                                <Th>Status</Th>
                                <Th>Total</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {orders.map(
                                ({ id, date, status, total }, index) => (
                                    <Tr key={index}>
                                        <Td>
                                            {id.toString().padStart(4, "0")}
                                        </Td>
                                        <Td>{date}</Td>
                                        <Td>
                                            <Badge
                                                ml="1"
                                                fontSize="0.8em"
                                                colorScheme={
                                                    status === 1
                                                        ? "green"
                                                        : "purple"
                                                }
                                            >
                                                {status === 1
                                                    ? "Delivered"
                                                    : "Processing"}
                                            </Badge>
                                        </Td>
                                        <Td>
                                            £
                                            {total
                                                .toFixed(2)
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ","
                                                )}
                                        </Td>
                                        <Td>
                                            <Button
                                                h="auto"
                                                p="10px 20px !important"
                                                fontSize="xs"
                                                onClick={() =>
                                                    history.push(
                                                        `/invoice?oid=${id}`
                                                    )
                                                }
                                            >
                                                View
                                            </Button>
                                        </Td>
                                    </Tr>
                                )
                            )}
                        </Tbody>
                    </Table>
                </Box>
            ) : (
                <>
                    <Heading as="h6" fontSize="lg" mb="20px">
                        No orders has been made yet.
                    </Heading>
                    <Link
                        href="/shop"
                        color="secondary"
                        _hover={{ textDecor: "underline !important" }}
                    >
                        Browse products
                    </Link>
                </>
            )}
        </>
    );
};

export default Orders;
