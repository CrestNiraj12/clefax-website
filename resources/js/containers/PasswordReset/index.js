import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Image,
    Input,
    Stack,
    Link,
    VStack,
    InputRightElement,
    InputGroup,
    useMediaQuery,
    useToast,
    FormLabel
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { validatePasswords } from "../../utilities/validation";
import Wine from "../../../images/wine.png";
import Logo from "../../../images/logo-black.png";
import { useHistory } from "react-router-dom";
import { apiClient } from "../../utilities";
import { DEFAULT_TOAST } from "../../constants";
import qs from "query-string";

const passwords = [
    { name: "password", label: "New Password" },
    { name: "password_confirmation", label: "Confirm Password" }
];

const PasswordReset = () => {
    const toast = useToast(DEFAULT_TOAST);
    var history = useHistory();
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
    const [show, setShow] = useState({
        password: false,
        password_confirmation: false
    });
    const [token, setToken] = useState(null);

    useEffect(() => {
        const q = qs.parse(location.search);
        if (q.token) setToken(q.token);
        else history.push("/");
    }, []);

    return (
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
                        <Box p={{ base: "6", sm: "10" }} w="100%">
                            <Formik
                                validate={validatePasswords}
                                initialValues={{
                                    password: "",
                                    password_confirmation: ""
                                }}
                                onSubmit={(values, actions) => {
                                    apiClient
                                        .get("/sanctum/csrf-cookie")
                                        .then(res =>
                                            apiClient
                                                .put("/api/reset-password", {
                                                    token,
                                                    ...values
                                                })
                                                .then(res => {
                                                    toast({
                                                        title:
                                                            "Password reset success",
                                                        description:
                                                            "Your password has been changed successfully!",
                                                        status: "success"
                                                    });
                                                    history.push("/login");
                                                })
                                                .catch(err => {
                                                    console.log(err.response);
                                                    const errors =
                                                        err.response.data
                                                            .errors;
                                                    if (errors) {
                                                        const messages = Object.values(
                                                            errors
                                                        ).map(msg => msg[0]);
                                                        console.log(messages);
                                                        messages.forEach(msg =>
                                                            toast({
                                                                title:
                                                                    "Error occured!",
                                                                description: msg,
                                                                status: "error"
                                                            })
                                                        );
                                                    } else {
                                                        toast({
                                                            title:
                                                                "Error occured!",
                                                            description: err.response
                                                                ? err.response
                                                                      .data
                                                                      .message
                                                                : "Something went wrong! Please try again!",
                                                            status: "error"
                                                        });
                                                    }
                                                    if (
                                                        err.response.status ===
                                                        403
                                                    )
                                                        history.push(
                                                            "/forgot-password"
                                                        );
                                                    actions.setSubmitting(
                                                        false
                                                    );
                                                })
                                        )
                                        .catch(err => {
                                            console.log(err);
                                            toast({
                                                title: "Error occurred!",
                                                description:
                                                    "Error occured! Please try again!",
                                                status: "error"
                                            });
                                            actions.setSubmitting(false);
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
                                                Password reset
                                            </Heading>
                                            {passwords.map(
                                                ({ name, label }, index) => (
                                                    <Field
                                                        name={name}
                                                        key={index}
                                                    >
                                                        {({ field, form }) => (
                                                            <FormControl
                                                                isInvalid={
                                                                    form.errors[
                                                                        name
                                                                    ] &&
                                                                    form
                                                                        .touched[
                                                                        name
                                                                    ]
                                                                }
                                                                mb="10px !important"
                                                            >
                                                                <FormLabel>
                                                                    {label}
                                                                </FormLabel>

                                                                <InputGroup>
                                                                    <Input
                                                                        {...field}
                                                                        id={
                                                                            name
                                                                        }
                                                                        pr="4.5rem"
                                                                        type={
                                                                            show[
                                                                                name
                                                                            ]
                                                                                ? "text"
                                                                                : "password"
                                                                        }
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
                                                                                    {
                                                                                        ...show,
                                                                                        [name]: !show[
                                                                                            name
                                                                                        ]
                                                                                    }
                                                                                )
                                                                            }
                                                                        >
                                                                            {show[
                                                                                name
                                                                            ]
                                                                                ? "Hide"
                                                                                : "Show"}
                                                                        </Button>
                                                                    </InputRightElement>
                                                                </InputGroup>
                                                                <FormErrorMessage>
                                                                    {
                                                                        form
                                                                            .errors[
                                                                            name
                                                                        ]
                                                                    }
                                                                </FormErrorMessage>
                                                            </FormControl>
                                                        )}
                                                    </Field>
                                                )
                                            )}{" "}
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
                                                Submit
                                            </Button>
                                        </VStack>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                        {!isSmallerThan768 && (
                            <Image
                                w={{ base: "100%", md: "40%" }}
                                maxH={{ base: "200px", md: "100%" }}
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

export default PasswordReset;
