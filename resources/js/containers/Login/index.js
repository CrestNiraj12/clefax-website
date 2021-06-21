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
    useMediaQuery,
    useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { validateLogin } from "../../utilities/validation";
import Wine from "../../../images/wine.png";
import Logo from "../../../images/logo-black.png";
import { Redirect, useHistory } from "react-router-dom";
import { apiClient } from "../../utilities";
import { DEFAULT_TOAST } from "../../constants";
import { connect } from "react-redux";
import { setAuth } from "../../actions";

const mapDispatchToProps = dispatch => ({
    setAuth: auth => dispatch(setAuth(auth))
});

const mapStateToProps = state => ({
    auth: state.auth
});

const Login = ({ setAuth, auth }) => {
    const toast = useToast(DEFAULT_TOAST);
    var history = useHistory();
    const [show, setShow] = useState(false);
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

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
                    maxW={{ base: "md", md: "xl" }}
                    w="100%"
                    m="20px"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    mt={{ base: "50px !important", md: "0 !important" }}
                >
                    <Stack direction={{ base: "column", md: "row" }}>
                        {!isSmallerThan768 && (
                            <Image
                                w={{ base: "100%", md: "40%" }}
                                maxH={{ base: "200px", md: "100%" }}
                                src={Wine}
                                alt="Login Image"
                                objectFit="cover"
                            />
                        )}
                        <Box p={{ base: "6", sm: "10" }} w="100%">
                            <Formik
                                validate={validateLogin}
                                initialValues={{
                                    email: "",
                                    password: ""
                                }}
                                onSubmit={(values, actions) => {
                                    apiClient
                                        .get("/sanctum/csrf-cookie")
                                        .then(res =>
                                            apiClient
                                                .post("/api/login", values)
                                                .then(res => {
                                                    console.log(res);
                                                    toast({
                                                        title: "Login Success",
                                                        description:
                                                            "User was logged in successfully!",
                                                        status: "success"
                                                    });
                                                    localStorage.setItem(
                                                        "user",
                                                        JSON.stringify(
                                                            res.data.user
                                                        )
                                                    );
                                                    setAuth({
                                                        logged_in: true,
                                                        user: res.data.user
                                                    });
                                                    actions.setSubmitting(
                                                        false
                                                    );

                                                    history.push("/");
                                                })
                                                .catch(err => {
                                                    console.log(err.response);
                                                    toast({
                                                        title:
                                                            "Error while logging in",
                                                        description: err
                                                            .response.data
                                                            ? err.response.data
                                                                  .message
                                                            : "Error occured! Please try again!",
                                                        status: "error"
                                                    });
                                                    actions.setSubmitting(
                                                        false
                                                    );
                                                })
                                        )
                                        .catch(err => {
                                            toast({
                                                title: "Error while signup",
                                                description:
                                                    "Error occured! Please try again!",
                                                status: "error"
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
                                            >
                                                Sign in
                                            </Heading>
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
                                                            <InputRightElement width="4.5rem">
                                                                <Button
                                                                    fontSize="xs"
                                                                    p="10px !important"
                                                                    h="1.75rem"
                                                                    borderRadius="md"
                                                                    letterSpacing="0.5px !important"
                                                                    fontWeight="bold"
                                                                    textTransform="none !important"
                                                                    size="sm"
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
                                                        <FormErrorMessage>
                                                            {
                                                                form.errors
                                                                    .password
                                                            }
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>

                                            <HStack
                                                w="100%"
                                                mt="30px !important"
                                                mb="10px !important"
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
                                                    Sign in
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
                                                        history.push("/signup")
                                                    }
                                                >
                                                    Sign up
                                                </Button>
                                            </HStack>
                                            <Box w="100%">
                                                <Link
                                                    href="/forgot-password"
                                                    color="secondary"
                                                    fontSize="xs"
                                                    _hover={{
                                                        textDecor:
                                                            "underline !important"
                                                    }}
                                                >
                                                    Forgot Password?
                                                </Link>
                                            </Box>
                                        </VStack>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Stack>
                </Box>
            </Flex>
        </Flex>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
