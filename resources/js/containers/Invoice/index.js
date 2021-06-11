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
    Tbody
} from "@chakra-ui/react";
import React from "react";
import Breadcrumb from "../../components/Breadcrumb";

const Invoice = ({ crumbs }) => {
    return (
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
                        Thank you. You Order has been received!
                    </Text>
                </Box>
                <Stack
                    direction={{ base: "column", md: "row" }}
                    divider={<StackDivider />}
                    w="100%"
                    justifyContent="space-evenly"
                >
                    <Text color="darkgray">
                        Order no: <b>0001</b>
                    </Text>
                    <Text color="darkgray">
                        Order Date: <b>May 25, 2021</b>
                    </Text>
                    <Text color="darkgray">
                        Email: <b>crestniraj@gmail.com</b>
                    </Text>
                    <Text color="darkgray">
                        Total: <b>£100.00</b>
                    </Text>
                    <Text color="darkgray">
                        Payment method: <b>Paypal</b>
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
                        <Tr>
                            <Td>
                                <VStack alignItems="flex-start">
                                    <Text>Cookies × <span>1</span></Text>
                                    <Text>
                                        <b>Vendor:</b> Niraj Shrestha
                                    </Text>
                                </VStack>
                            </Td>
                            <Td>
                                <Text fontWeight="bold">£100.0</Text>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>Subtotal</Td>
                            <Td>
                                <Text fontWeight="bold">£100.0</Text>
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
                                    £100.0
                                </Text>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
                <Box>
                    <Text>
                        Collection Date and Time:{" "}
                        <b>May 27, 2021 [01:00 PM - 04:00 PM]</b>
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
};

export default Invoice;
