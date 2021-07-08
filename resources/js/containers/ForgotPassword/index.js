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
    Text,
    useMediaQuery,
    useToast
} from "@chakra-ui/react";
import React from "react";
import { Formik, Form, Field } from "formik";
import { validateEmail } from "../../utilities/validation";
import Wine from "../../../images/wine.png";
import Logo from "../../../images/logo-black.png";
import { DEFAULT_TOAST, TEMPLATE_BASIC } from "../../constants";
import { apiClient } from "../../utilities";
import { handleMailSend } from "../../utilities/mail";

const ForgotPassword = () => {
    const toast = useToast(DEFAULT_TOAST);
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

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
                    maxW={{ base: "lg", md: "xl" }}
                    m="20px"
                    mt={{ base: "50px !important", md: "0 !important" }}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                >
                    <Stack direction={{ base: "column", md: "row" }}>
                        <Box p={{ base: "6", sm: "10" }} w="100%">
                            <Formik
                                validate={validateEmail}
                                initialValues={{
                                    email: ""
                                }}
                                onSubmit={(values, actions) => {
                                    apiClient
                                        .post("/api/forgot-password", values)
                                        .then(res => {
                                            const token = res.data.token;
                                            const link = `http://localhost:3000/user/reset/?token=${token}`;
                                            const message = `<p>Please click <a href="${link}">here</a> or the given link below to go to reset password link!</p><p><a href="${link}">${link}</a></p>`;
                                            handleMailSend(
                                                TEMPLATE_BASIC,
                                                "Password reset link",
                                                res.data.user.fullname,
                                                res.data.user.email,
                                                {
                                                    message: message,
                                                    from_name: "Clefax E-Shop",
                                                    reply_to: null
                                                }
                                            );
                                            toast({
                                                title: "Reset link sent",
                                                description:
                                                    "Your password reset link has been sent successfully!",
                                                status: "info"
                                            });
                                            actions.setSubmitting(false);
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            toast({
                                                title: "Error occurred!",
                                                description: err.response
                                                    ? err.response.data.message
                                                    : "Something went wrong! Please try again later!",
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
                                                mb="10px"
                                            >
                                                Forgot Password?
                                            </Heading>
                                            <Text
                                                color="gray"
                                                fontSize="xs"
                                                mb="20px !important"
                                            >
                                                Please enter your email address.
                                                You will receive a link to
                                                create a new password via mail.
                                            </Text>
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
                                            <Button
                                                isLoading={props.isSubmitting}
                                                background="primary"
                                                w="80%"
                                                mt="20px !important"
                                                mb="10px !important"
                                                color="#fff"
                                                fontSize="sm"
                                                fontWeight="bold"
                                                px="25px !important"
                                                textTransform="none !important"
                                                type="submit"
                                            >
                                                Reset Password
                                            </Button>
                                            <Box w="100%">
                                                <Link
                                                    href="/login"
                                                    color="secondary"
                                                    fontSize="xs"
                                                    _hover={{
                                                        textDecor:
                                                            "underline !important"
                                                    }}
                                                >
                                                    Go back to Login
                                                </Link>
                                            </Box>
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

export default ForgotPassword;
