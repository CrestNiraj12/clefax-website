import {
    Box,
    Button,
    Heading,
    Stack,
    VStack,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Table,
    Thead,
    Tr,
    Td,
    Th,
    Tbody,
    Text,
    RadioGroup,
    Radio,
    StackDivider,
    Select,
    useToast,
    Spinner,
    Flex
} from "@chakra-ui/react";
import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { Formik, Form, Field } from "formik";
import { isValidDate, validateForm } from "../../utilities/validation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Redirect, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { DEFAULT_TOAST } from "../../constants";
import { connect } from "react-redux";
import { apiClient, getLoginRedirection } from "../../utilities";

const mapStateToProps = state => ({
    products: state.products
});

const Checkout = ({ crumbs }) => {
    const history = useHistory();
    const toast = useToast(DEFAULT_TOAST);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setLoading(true);
        apiClient
            .get("/sanctum/csrf-cookie")
            .then(res =>
                apiClient
                    .get("/api/cart")
                    .then(res => {
                        if (!res.data || !res.data.length) {
                            toast({
                                title: "Cart is empty",
                                description:
                                    "Please add some products to the cart before checking out!",
                                status: "warning"
                            });
                            history.push("/cart");
                        }
                        setCart(res.data);
                        setLoading(false);
                    })
                    .catch(err => console.log(err))
            )
            .catch(err => console.log(err.response));
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("user"))
            toast({
                title: "Login required",
                description: "Please login to continue",
                status: "info"
            });
        else if (JSON.parse(localStorage.getItem("user")).role === "Trader")
            toast({
                title: "Permission not granted",
                description: "You are not allowed to proceed to the page",
                status: "info"
            });
    }, []);

    return !localStorage.getItem("user") ||
        JSON.parse(localStorage.getItem("user")).role === "Trader" ? (
        <Redirect to={getLoginRedirection()} />
    ) : loading ? (
        <Flex h="100vh" w="100%" justifyContent="center" alignItems="center">
            <Spinner color="secondary" />
        </Flex>
    ) : (
        <Box mx="20px" mb="100px">
            <Breadcrumb crumbs={crumbs} margin="20px 0" />
            <Formik
                validate={validateForm}
                initialValues={{
                    fullname: "",
                    email: "",
                    phone: "",
                    street_no: "",
                    address: "",
                    date: "",
                    collection_id: ""
                }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {props => (
                    <Form style={{ width: "100%" }}>
                        <Stack
                            direction={{ base: "column", lg: "row" }}
                            mt="50px"
                        >
                            <VStack alignItems="flex-start" w="100%" mr="20px">
                                <Heading as="h6" fontSize="md" mb="30px">
                                    Billing Details
                                </Heading>

                                <Field name="fullname">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.fullname}
                                            isRequired
                                        >
                                            <FormLabel htmlFor="fullname">
                                                Full Name
                                            </FormLabel>
                                            <Input
                                                variant="flushed"
                                                {...field}
                                                id="fullname"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.fullname}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="email">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.email &&
                                                form.touched.email
                                            }
                                            isRequired
                                        >
                                            <FormLabel htmlFor="email">
                                                Email Address
                                            </FormLabel>
                                            <Input
                                                variant="flushed"
                                                {...field}
                                                id="email"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.email}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="phone">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.phone &&
                                                form.touched.phone
                                            }
                                            isRequired
                                        >
                                            <FormLabel htmlFor="phone">
                                                Phone
                                            </FormLabel>
                                            <Input
                                                variant="flushed"
                                                {...field}
                                                id="phone"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.phone}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="street_no">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.street_no &&
                                                form.touched.street_no
                                            }
                                            isRequired
                                        >
                                            <FormLabel htmlFor="street_no">
                                                Street Address
                                            </FormLabel>
                                            <Input
                                                variant="flushed"
                                                {...field}
                                                id="street_no"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.street_no}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="address">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.address &&
                                                form.touched.address
                                            }
                                            isRequired
                                        >
                                            <FormLabel htmlFor="address">
                                                Town / City
                                            </FormLabel>
                                            <Input
                                                variant="flushed"
                                                {...field}
                                                id="address"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.address}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Stack
                                    direction={{ base: "column", md: "row" }}
                                    spacing={10}
                                >
                                    <Field name="date">
                                        {({ field, form }) => (
                                            <FormControl>
                                                <FormLabel
                                                    htmlFor="date"
                                                    mb="20px !important"
                                                >
                                                    Collection Date
                                                </FormLabel>
                                                <DatePicker
                                                    value={props.values["date"]}
                                                    onChange={date =>
                                                        form.setFieldValue(
                                                            "date",
                                                            date
                                                        )
                                                    }
                                                    filterDate={isValidDate}
                                                    inline
                                                />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="collection_id">
                                        {({ field, form }) => (
                                            <FormControl>
                                                <FormLabel
                                                    htmlFor="collection_id"
                                                    mb="20px !important"
                                                >
                                                    Collection Slot
                                                </FormLabel>
                                                <Select
                                                    {...field}
                                                    placeholder="Select slot"
                                                    id="collection_id"
                                                >
                                                    <option value="1">
                                                        10:00 AM - 01:00 PM
                                                    </option>
                                                    <option value="2">
                                                        01:00 PM - 04:00 PM
                                                    </option>
                                                    <option value="3">
                                                        04:00 PM - 07:00 PM
                                                    </option>
                                                </Select>
                                                <FormErrorMessage>
                                                    {form.errors.collection_id}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Stack>
                            </VStack>
                            <Box w={{ base: "100%", lg: "60%" }}>
                                <Heading as="h6" fontSize="md" mb="30px">
                                    Your Order
                                </Heading>
                                <VStack
                                    bgColor="lightgray"
                                    p="20px !important"
                                    alignItems="flex-start"
                                >
                                    <Table bgColor="#fff">
                                        <Thead>
                                            <Tr>
                                                <Th>Product</Th>
                                                <Th>Amount</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {cart.map(
                                                (
                                                    {
                                                        id,
                                                        qty,
                                                        product: {
                                                            name: title,
                                                            shop: { name }
                                                        },
                                                        subtotal
                                                    },
                                                    index
                                                ) => (
                                                    <Tr key={index + id}>
                                                        <Td>
                                                            <VStack alignItems="flex-start">
                                                                <Text>
                                                                    {title} ×{" "}
                                                                    <span>
                                                                        {qty}
                                                                    </span>
                                                                </Text>
                                                                <Text>
                                                                    <b>
                                                                        Vendor:
                                                                    </b>{" "}
                                                                    {name}
                                                                </Text>
                                                            </VStack>
                                                        </Td>
                                                        <Td>
                                                            <Text fontWeight="bold">
                                                                £
                                                                {subtotal.toFixed(
                                                                    2
                                                                )}
                                                            </Text>
                                                        </Td>
                                                    </Tr>
                                                )
                                            )}
                                            <Tr>
                                                <Td>Subtotal</Td>
                                                <Td>
                                                    <Text fontWeight="bold">
                                                        £
                                                        {cart
                                                            .map(
                                                                p => p.subtotal
                                                            )
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
                                                        color="secondary"
                                                        fontWeight="bold"
                                                        fontSize="xl"
                                                    >
                                                        £
                                                        {cart
                                                            .map(
                                                                p => p.subtotal
                                                            )
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
                                    <RadioGroup
                                        defaultValue="1"
                                        mt="20px !important"
                                        w="100%"
                                    >
                                        <VStack
                                            alignItems="flex-start"
                                            divider={
                                                <StackDivider borderColor="#d1d1d1" />
                                            }
                                        >
                                            <Radio
                                                colorScheme="red"
                                                size="sm"
                                                value="1"
                                                borderColor="secondary"
                                            >
                                                Paypal
                                            </Radio>
                                            <Radio
                                                colorScheme="red"
                                                size="sm"
                                                value="2"
                                                borderColor="secondary"
                                            >
                                                Stripe
                                            </Radio>
                                        </VStack>
                                    </RadioGroup>
                                    <Text
                                        my="30px"
                                        fontSize="small"
                                        color="gray"
                                    >
                                        Secure you payment with Paypal or
                                        Stripe.
                                    </Text>
                                    <Button
                                        mt="30px !important"
                                        isLoading={props.isSubmitting}
                                        background="primary"
                                        color="#fff"
                                        fontSize="smaller"
                                        letterSpacing="3px"
                                        fontWeight="bold"
                                        px="25px !important"
                                        type="submit"
                                    >
                                        Place Order
                                    </Button>
                                </VStack>
                            </Box>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default connect(mapStateToProps)(Checkout);
