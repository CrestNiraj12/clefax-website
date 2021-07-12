import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    HStack,
    Image,
    Input,
    Stack,
    Link,
    VStack,
    InputRightElement,
    InputGroup,
    FormHelperText,
    RadioGroup,
    Radio,
    Checkbox,
    useMediaQuery,
    useToast,
    Select
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { validateSignup } from "../../utilities/validation";
import Wine from "../../../images/wine.png";
import Logo from "../../../images/logo-black.png";
import { Redirect, useHistory } from "react-router-dom";
import { apiClient } from "../../utilities";
import { DEFAULT_TOAST } from "../../constants";
import { setAuth } from "../../actions";
import { connect } from "react-redux";
import { useEffect } from "react";

const mapDispatchToProps = dispatch => ({
    setAuth: auth => dispatch(setAuth(auth))
});

const mapStateToProps = state => ({
    auth: state.auth
});

const Signup = ({ setAuth, auth }) => {
    const toast = useToast(DEFAULT_TOAST);
    var history = useHistory();
    const [show, setShow] = useState(false);
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        apiClient
            .get("/api/security-questions")
            .then(res => setQuestions(res.data))
            .catch(err => console.log(err));
    }, []);

    return auth.logged_in ? (
        <Redirect to="/" />
    ) : (
        <Flex
            alignItems={{ base: "center", md: "flex-start" }}
            direction="column"
        >
            <Link
                href="/"
                _focus={{ boxShadow: "none" }}
                outline="none"
                pos={{ base: "relative", md: "absolute" }}
                top={{ base: "0", md: "-50px" }}
            >
                <Image
                    src={Logo}
                    w="200px"
                    objectFit="cover"
                    h={{ base: "20vh", md: "auto" }}
                />
            </Link>
            <Flex
                w="100%"
                h={{ base: "auto", md: "100vh" }}
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    maxW={{ base: "lg", md: "2xl" }}
                    m="20px"
                    mb="50px"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    mt={{ base: "30px !important", md: "120px !important" }}
                >
                    <Stack direction={{ base: "column", md: "row" }}>
                        <Box p={{ base: "6", sm: "8" }} w="100%">
                            <Formik
                                validate={validateSignup}
                                initialValues={{
                                    fullname: "",
                                    email: "",
                                    password: "",
                                    isTrader: "0",
                                    sq_id: "",
                                    sq_answer: "",
                                    terms: ""
                                }}
                                onSubmit={(values, actions) => {
                                    apiClient
                                        .get("/sanctum/csrf-cookie")
                                        .then(res => {
                                            if (values.isTrader === "1")
                                                apiClient
                                                    .post(
                                                        "/api/audit/request",
                                                        {
                                                            table_name: "users",
                                                            action: "create",
                                                            email: values.email,
                                                            values: `fullname:${
                                                                values.fullname
                                                            },email:${
                                                                values.email
                                                            },email_verified_at:${
                                                                new Date()
                                                                    .toISOString()
                                                                    .split(
                                                                        "T"
                                                                    )[0]
                                                            },password:${
                                                                values.password
                                                            },role:Trader,sq_id:${
                                                                values.sq_id
                                                            },sq_answer:${
                                                                values.sq_answer
                                                            }`
                                                        }
                                                    )
                                                    .then(res => {
                                                        toast({
                                                            title:
                                                                "Verification requested",
                                                            description:
                                                                "Your account has sent for verification",
                                                            status: "success",
                                                            isClosable: true
                                                        });
                                                        history.push(`/`);
                                                    })
                                                    .catch(err => {
                                                        console.log(
                                                            err.response
                                                        );
                                                        actions.setSubmitting(
                                                            false
                                                        );

                                                        toast({
                                                            title:
                                                                "Error while signup",
                                                            description: err
                                                                .response.data
                                                                .errors
                                                                ? err.response
                                                                      .data
                                                                      .errors
                                                                      .email
                                                                : "Error occured! Please try again!",
                                                            status: "error",
                                                            isClosable: true
                                                        });
                                                    });
                                            else
                                                apiClient
                                                    .post("/api/signup", {
                                                        fullname:
                                                            values.fullname,
                                                        email: values.email,
                                                        password:
                                                            values.password,
                                                        role: "Customer",
                                                        sq_id: values.sq_id,
                                                        sq_answer:
                                                            values.sq_answer
                                                    })
                                                    .then(res => {
                                                        toast({
                                                            title:
                                                                "Successfully registered",
                                                            description:
                                                                "You account has been created successfully!",
                                                            status: "success",
                                                            isClosable: true
                                                        });

                                                        localStorage.setItem(
                                                            "auth",
                                                            false
                                                        );
                                                        localStorage.setItem(
                                                            "user",
                                                            JSON.stringify(
                                                                res.data.user
                                                            )
                                                        );
                                                        setAuth({
                                                            logged_in: false,
                                                            user: res.data.user
                                                        });

                                                        actions.setSubmitting(
                                                            false
                                                        );
                                                        history.push(
                                                            "/verify-email"
                                                        );
                                                    })
                                                    .catch(err => {
                                                        console.log(
                                                            err.response
                                                        );
                                                        actions.setSubmitting(
                                                            false
                                                        );

                                                        toast({
                                                            title:
                                                                "Error while signup",
                                                            description: err
                                                                .response.data
                                                                .errors
                                                                ? err.response
                                                                      .data
                                                                      .errors
                                                                      .email
                                                                : "Error occured! Please try again!",
                                                            status: "error",
                                                            isClosable: true
                                                        });
                                                    });
                                        })
                                        .catch(err => {
                                            console.log(err.response);
                                            actions.setSubmitting(false);
                                            toast({
                                                title: "Error while signup",
                                                description:
                                                    "Error occured! Please try again!",
                                                status: "error",
                                                isClosable: true
                                            });
                                        });
                                }}
                            >
                                {props => (
                                    <Form>
                                        <VStack
                                            alignItems="flex-start"
                                            w="100%"
                                        >
                                            <Heading
                                                as="h6"
                                                fontSize="lg"
                                                mb="30px"
                                                color="secondary"
                                            >
                                                Create an account
                                            </Heading>
                                            <Field name="fullname">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isInvalid={
                                                            form.errors
                                                                .fullname &&
                                                            form.touched
                                                                .fullname
                                                        }
                                                        mb="10px !important"
                                                        isRequired
                                                    >
                                                        <Input
                                                            size="sm"
                                                            {...field}
                                                            placeholder="Full Name"
                                                            id="fullname"
                                                        />
                                                        <FormErrorMessage>
                                                            {
                                                                form.errors
                                                                    .fullname
                                                            }
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
                                                        mb="10px !important"
                                                        isRequired
                                                    >
                                                        <Input
                                                            size="sm"
                                                            {...field}
                                                            placeholder="Email Address"
                                                            id="email"
                                                        />
                                                        <FormErrorMessage>
                                                            {form.errors.email}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="password">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isInvalid={
                                                            form.errors
                                                                .password &&
                                                            form.touched
                                                                .password
                                                        }
                                                        mb="10px !important"
                                                        isRequired
                                                    >
                                                        <InputGroup>
                                                            <Input
                                                                size="sm"
                                                                {...field}
                                                                placeholder="Password"
                                                                id="password"
                                                                pr="4.5rem"
                                                                type={
                                                                    show
                                                                        ? "text"
                                                                        : "password"
                                                                }
                                                                placeholder="Password"
                                                            />
                                                            <InputRightElement
                                                                width="4.5rem"
                                                                h="8"
                                                            >
                                                                <Button
                                                                    fontSize="xs"
                                                                    p="5px !important"
                                                                    h="1.2rem"
                                                                    fontSize="xx-small"
                                                                    borderRadius="md"
                                                                    letterSpacing="0.5px !important"
                                                                    fontWeight="bold"
                                                                    textTransform="none !important"
                                                                    onClick={() =>
                                                                        setShow(
                                                                            !show
                                                                        )
                                                                    }
                                                                >
                                                                    {show
                                                                        ? "Hide"
                                                                        : "Show"}
                                                                </Button>
                                                            </InputRightElement>
                                                        </InputGroup>
                                                        <FormHelperText
                                                            fontSize="xs"
                                                            color="gray"
                                                        >
                                                            Password must be 8
                                                            characters long,
                                                            must contain at
                                                            least one letter and
                                                            one number
                                                        </FormHelperText>
                                                        <FormErrorMessage>
                                                            {
                                                                form.errors
                                                                    .password
                                                            }
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="sq_id">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isInvalid={
                                                            form.errors.sq_id &&
                                                            form.touched.sq_id
                                                        }
                                                        mb="10px !important"
                                                        isRequired
                                                    >
                                                        <Select
                                                            {...field}
                                                            size="sm"
                                                            placeholder="Select security question"
                                                            id="sq_id"
                                                        >
                                                            {questions.map(
                                                                (
                                                                    {
                                                                        id,
                                                                        question
                                                                    },
                                                                    index
                                                                ) => (
                                                                    <option
                                                                        value={
                                                                            id
                                                                        }
                                                                    >
                                                                        {
                                                                            question
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </Select>
                                                        <FormErrorMessage>
                                                            {form.errors.sq_id}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="sq_answer">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isInvalid={
                                                            form.errors
                                                                .sq_answer &&
                                                            form.touched
                                                                .sq_answer
                                                        }
                                                        mb="10px !important"
                                                        isRequired
                                                    >
                                                        <Input
                                                            size="sm"
                                                            {...field}
                                                            placeholder="Your Answer"
                                                            id="sq_answer"
                                                        />
                                                        <FormErrorMessage>
                                                            {
                                                                form.errors
                                                                    .sq_answer
                                                            }
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="isTrader">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        mb="5px !important"
                                                        isRequired
                                                    >
                                                        <RadioGroup
                                                            defaultValue="0"
                                                            onChange={v =>
                                                                form.setFieldValue(
                                                                    "isTrader",
                                                                    v
                                                                )
                                                            }
                                                            value={
                                                                props.values[
                                                                    "isTrader"
                                                                ]
                                                            }
                                                        >
                                                            <Stack
                                                                direction="row"
                                                                alignItems="flex-start"
                                                            >
                                                                <Radio
                                                                    size="sm"
                                                                    value="0"
                                                                    colorScheme="blackAlpha"
                                                                    defaultChecked
                                                                >
                                                                    I'm a
                                                                    Customer
                                                                </Radio>
                                                                <Radio
                                                                    value="1"
                                                                    colorScheme="blackAlpha"
                                                                    size="sm"
                                                                >
                                                                    I'm a Trader
                                                                </Radio>
                                                            </Stack>
                                                        </RadioGroup>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="terms">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isInvalid={
                                                            form.errors.terms &&
                                                            form.touched.terms
                                                        }
                                                        mb="10px !important"
                                                        isRequired
                                                    >
                                                        <Checkbox
                                                            my="5px !important"
                                                            size="sm"
                                                            onChange={e =>
                                                                form.setFieldValue(
                                                                    "terms",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                            value={
                                                                props.values[
                                                                    "terms"
                                                                ]
                                                            }
                                                        >
                                                            I agree to the{" "}
                                                            <Link
                                                                color="secondary"
                                                                _hover={{
                                                                    textDecor:
                                                                        "underline !important"
                                                                }}
                                                                href="#"
                                                            >
                                                                Terms
                                                            </Link>{" "}
                                                            and{" "}
                                                            <Link
                                                                color="secondary"
                                                                _hover={{
                                                                    textDecor:
                                                                        "underline !important"
                                                                }}
                                                                href="#"
                                                            >
                                                                Privacy Policy
                                                            </Link>
                                                        </Checkbox>
                                                        <FormErrorMessage>
                                                            {form.errors.terms}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>

                                            <HStack
                                                w="100%"
                                                mt="10px !important"
                                                justifyContent="space-between"
                                            >
                                                <Button
                                                    isLoading={
                                                        props.isSubmitting
                                                    }
                                                    background="secondary"
                                                    w="100%"
                                                    color="#fff"
                                                    fontSize="sm"
                                                    fontWeight="bold"
                                                    px="25px !important"
                                                    textTransform="none !important"
                                                    _hover={{
                                                        background:
                                                            "var(--chakra-colors-primary) !important"
                                                    }}
                                                    type="submit"
                                                >
                                                    Sign up
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    color="secondary"
                                                    w="100%"
                                                    fontSize="sm"
                                                    fontWeight="bold"
                                                    textTransform="none !important"
                                                    px="25px !important"
                                                    onClick={() =>
                                                        history.push("/login")
                                                    }
                                                >
                                                    Sign in
                                                </Button>
                                            </HStack>
                                        </VStack>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                        {!isSmallerThan768 && (
                            <Image
                                w="40%"
                                src={Wine}
                                alt="Login Image"
                                objectFit="cover"
                            />
                        )}
                    </Stack>
                </Box>
            </Flex>
        </Flex>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
