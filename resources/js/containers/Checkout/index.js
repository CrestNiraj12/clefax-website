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
    Flex,
    Image
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { Formik, Form, Field } from "formik";
import {
    isValidDate,
    isValidTime,
    validateForm
} from "../../utilities/validation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Redirect, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { DEFAULT_TOAST } from "../../constants";
import { connect } from "react-redux";
import {
    apiClient,
    formatSlotTimes,
    getFinalPrice,
    getLoginRedirection
} from "../../utilities";
import { setAuth } from "../../actions";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PaypalButtonsCustomized } from "../../components/PaypalButtonsCustomized";
import { handleOrder } from "../../utilities/data";
import StripeLogo from "../../../images/stripe-logo.png";
import { isEmpty } from "lodash";
import qs from "query-string";
import { payWithStripe } from "../../utilities/payment";

const mapStateToProps = state => ({
    products: state.products,
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    setAuth: auth => dispatch(setAuth(auth))
});

const PAYPAL_CLIENT_ID =
    "Afo43y2a3cMuCtXS2fIBPxPyVOgn15xgw5lcYpvhJEgBlzdqZ_KprI9xxVBHsXgB6N5FqSctDNNNpVeR";

const Checkout = ({ crumbs, auth, setAuth, products }) => {
    const history = useHistory();
    const toast = useToast(DEFAULT_TOAST);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [slots, setSlots] = useState([]);
    const [total, setTotal] = useState(null);
    const formRef = useRef();
    const [value, setValue] = useState("1");
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        const query = qs.parse(location.search);
        if (query.cancelled === "1") onCancel();
    }, []);

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
                        apiClient
                            .get("/api/slots")
                            .then(res => {
                                const formattedSlots = [];
                                if (res.data.length > 0)
                                    res.data.map(s => {
                                        formattedSlots.push({
                                            ...s,
                                            times: s.times
                                                .split(",")
                                                .map(t => Number(t.trim())),
                                            days: s.days
                                                .split(",")
                                                .map(t => Number(t.trim()))
                                        });
                                    });
                                setSlots(formattedSlots);
                                setLoading(false);
                            })
                            .catch(err => console.log(err));
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

    useEffect(() => {
        setTotal(cart.map(p => p.subtotal).reduce((a, b) => a + b, 0));
    }, [cart]);

    const onApprove = (data, actions) => {
        actions.order.capture().then(() => {
            const values = formRef.current.values;
            handleOrder(
                {
                    ...values,
                    date: new Date(
                        values.date.getTime() -
                            values.date.getTimezoneOffset() * 60000
                    )
                        .toISOString()
                        .split("T")[0]
                },
                total,
                cart,
                setAuth,
                onSuccessPaypalPayment,
                onError,
                data
            );
        });
    };

    const onCancel = () => {
        toast({
            title: "Payment Cancelled",
            description: "Your order has been cancelled!",
            status: "warning"
        });
        history.push("/checkout");
    };

    const createOrder = (data, actions) => {
        const validity = validateForm(formRef.current.values);
        if (!isEmpty(validity)) {
            formRef.current.handleSubmit();
            return;
        }
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency: "GBP",
                        value: total
                    }
                }
            ]
        });
    };

    const onSuccessPaypalPayment = (data, oid) => {
        toast({
            title: "Payment Success",
            description: "Your order has been placed!",
            status: "success"
        });
        history.push(
            `/invoice/?order_id=${data.orderID}&method=paypal&oid=${oid}`
        );
    };

    const onError = err => {
        console.log(err.response);
        const errors = err.response.data.message;
        if (errors.length > 0) {
            errors.forEach(msg =>
                toast({
                    title: "Error occured!",
                    description: msg,
                    status: "error"
                })
            );
        }
    };

    const handleStripePayment = e => {
        e.preventDefault();
        const validity = validateForm(formRef.current.values);
        if (!isEmpty(validity)) {
            formRef.current.handleSubmit();
            return;
        }

        const fp = products.filter(p =>
            cart.map(c => c.product_id).includes(p.id)
        );

        const finalProducts = [];

        fp.forEach(p => {
            finalProducts.push({
                price_data: {
                    currency: "GBP",
                    product_data: {
                        name: p.name,
                        images: [p.images]
                    },
                    unit_amount: Number(getFinalPrice(p).toFixed(2)) * 100
                },
                quantity: cart.filter(c => c.product_id === p.id)[0].qty
            });
        });
        console.log(finalProducts);

        payWithStripe(setBtnLoading, finalProducts);
    };

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
            {auth.logged_in && (
                <Formik
                    validate={validateForm}
                    initialValues={{
                        fullname: auth.user.fullname,
                        email: auth.user.email,
                        phone: auth.user.phone,
                        street_no: auth.user.street_no,
                        address: auth.user.address,
                        date: slots.some(slot =>
                            slot.days.includes(new Date().getDay())
                        )
                            ? new Date()
                            : "",
                        collection_id: ""
                    }}
                    innerRef={formRef}
                    onSubmit={(values, actions) => {
                        actions.validateForm();
                    }}
                >
                    {props => (
                        <Form style={{ width: "100%" }}>
                            <Stack
                                direction={{ base: "column", lg: "row" }}
                                mt="50px"
                            >
                                <VStack
                                    alignItems="flex-start"
                                    w="100%"
                                    mr="20px"
                                >
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
                                        direction={{
                                            base: "column",
                                            md: "row"
                                        }}
                                        spacing={10}
                                    >
                                        <Field name="date">
                                            {({ field, form }) => (
                                                <FormControl
                                                    isInvalid={
                                                        form.errors.date &&
                                                        form.touched.date
                                                    }
                                                    required
                                                >
                                                    <FormLabel
                                                        htmlFor="date"
                                                        mb="20px !important"
                                                    >
                                                        Collection Date
                                                    </FormLabel>
                                                    <DatePicker
                                                        value={
                                                            props.values["date"]
                                                        }
                                                        onChange={date =>
                                                            form.setFieldValue(
                                                                "date",
                                                                date
                                                            )
                                                        }
                                                        filterDate={date =>
                                                            isValidDate(
                                                                date,
                                                                slots
                                                            )
                                                        }
                                                        inline
                                                    />
                                                    <FormErrorMessage>
                                                        {form.errors.date}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="collection_id">
                                            {({ field, form }) => (
                                                <FormControl
                                                    isInvalid={
                                                        form.errors
                                                            .collection_id &&
                                                        form.touched
                                                            .collection_id
                                                    }
                                                    required
                                                >
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
                                                        {slots &&
                                                            slots.map(
                                                                (
                                                                    {
                                                                        id,
                                                                        times,
                                                                        days
                                                                    },
                                                                    index
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            id
                                                                        }
                                                                        disabled={isValidTime(
                                                                            props
                                                                                .values[
                                                                                "date"
                                                                            ],
                                                                            times,
                                                                            days
                                                                        )}
                                                                    >
                                                                        {formatSlotTimes(
                                                                            times
                                                                        )}
                                                                    </option>
                                                                )
                                                            )}
                                                    </Select>
                                                    <FormErrorMessage>
                                                        {
                                                            form.errors
                                                                .collection_id
                                                        }
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
                                                                        {title}{" "}
                                                                        ×{" "}
                                                                        <span>
                                                                            {
                                                                                qty
                                                                            }
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
                                                                    p =>
                                                                        p.subtotal
                                                                )
                                                                .reduce(
                                                                    (a, b) =>
                                                                        a + b,
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
                                                                    p =>
                                                                        p.subtotal
                                                                )
                                                                .reduce(
                                                                    (a, b) =>
                                                                        a + b,
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
                                            onChange={setValue}
                                            value={value}
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
                                        {value === "2" && (
                                            <Button
                                                mt="30px !important"
                                                onClick={handleStripePayment}
                                                background="primary"
                                                color="#fff"
                                                fontSize="smaller"
                                                letterSpacing="3px"
                                                fontWeight="bold"
                                                px="25px !important"
                                                w="100%"
                                                pos="relative"
                                                letterSpacing="0.8px !important"
                                                _hover={{
                                                    bg: "#5433FF !important"
                                                }}
                                            >
                                                {btnLoading ? (
                                                    <Spinner color="secondary" />
                                                ) : (
                                                    <>
                                                        Pay with{" "}
                                                        <Image
                                                            src={StripeLogo}
                                                            w="55px"
                                                        />
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                        <Box w="100%">
                                            <PayPalScriptProvider
                                                options={{
                                                    "client-id": PAYPAL_CLIENT_ID,
                                                    currency: "GBP"
                                                }}
                                            >
                                                {value === "1" && (
                                                    <PaypalButtonsCustomized
                                                        createOrder={
                                                            createOrder
                                                        }
                                                        onApprove={onApprove}
                                                        onCancel={onCancel}
                                                        PAYPAL_CLIENT_ID={
                                                            PAYPAL_CLIENT_ID
                                                        }
                                                    />
                                                )}
                                            </PayPalScriptProvider>
                                        </Box>
                                    </VStack>
                                </Box>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            )}{" "}
        </Box>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
