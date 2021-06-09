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
    StackDivider
} from "@chakra-ui/react";
import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { Formik, Form, Field } from "formik";
import { validateForm } from "../../utilities/validation";

const Checkout = ({ crumbs }) => {
    return (
        <Box mx="20px" mb="100px">
            <Breadcrumb crumbs={crumbs} margin="20px 0" />
            <Formik
                validate={validateForm}
                initialValues={{
                    fullname: "",
                    email: "",
                    phone: "",
                    street_no: "",
                    address: ""
                }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {props => (
                    <Stack direction={{ base: "column", lg: "row" }} mt="50px">
                        <VStack alignItems="flex-start" w="100%" mr="20px">
                            <Heading as="h6" fontSize="md" mb="30px">
                                Billing Details
                            </Heading>
                            <Form style={{ width: "100%" }}>
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
                                                id="email"
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
                                                id="email"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.address}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Form>
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
                                        <Tr>
                                            <Td>
                                                <VStack alignItems="flex-start">
                                                    <Text>
                                                        Bluetooth Speaker GK1 ×
                                                        1
                                                    </Text>
                                                    <Text>
                                                        <b>Vendor:</b> James
                                                        David
                                                    </Text>
                                                </VStack>
                                            </Td>
                                            <Td>
                                                <Text fontWeight="bold">
                                                    £100.0
                                                </Text>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Subtotal</Td>
                                            <Td>
                                                <Text fontWeight="bold">
                                                    £100.0
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
                                                    £100.0
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
                                <Text my="30px" fontSize="small" color="gray">
                                    Secure you payment with Paypal or Stripe.
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
                )}
            </Formik>
        </Box>
    );
};

export default Checkout;
