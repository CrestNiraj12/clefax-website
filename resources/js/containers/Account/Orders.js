import React from "react";
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
    Link
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const orders = [
    {
        id: "0001",
        date: "2021/01/01",
        status: 1,
        total: 1000.0
    }
];

const Orders = () => {
    var history = useHistory();

    return (
        <>
            {orders && orders.length ? (
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
                        {orders.map(({ id, date, status, total }, index) => (
                            <Tr key={index}>
                                <Td>{id}</Td>
                                <Td>{date}</Td>
                                <Td>
                                    <Badge
                                        ml="1"
                                        fontSize="0.8em"
                                        colorScheme={
                                            status === 1 ? "green" : "yellow"
                                        }
                                    >
                                        {status === 1
                                            ? "Delivered"
                                            : "Processing"}
                                    </Badge>
                                </Td>
                                <Td>£{total}</Td>
                                <Td>
                                    <Button
                                        h="auto"
                                        p="10px 20px !important"
                                        fontSize="xs"
                                        onClick={() =>
                                            history.push("/invoice?id=1")
                                        }
                                    >
                                        View
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
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
