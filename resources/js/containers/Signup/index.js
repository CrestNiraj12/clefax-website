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
    useMediaQuery
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { validateSignup } from "../../utilities/validation";
import Wine from "../../../images/wine.png";
import Logo from "../../../images/logo-black.png";
import { useHistory } from "react-router-dom";

const Signup = () => {
    var history = useHistory();
    const [show, setShow] = useState(false);
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
                                    terms: ""
                                }}
                                onSubmit={(values, actions) => {
                                    setTimeout(() => {
                                        alert(JSON.stringify(values, null, 2));
                                        actions.setSubmitting(false);
                                        if (values.isTrader === "1") {
                                            history.push(
                                                "/trader-signup/?id=1"
                                            );
                                        }
                                    }, 1000);
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
                                            <Field name="isTrader">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        mt="20px !important"
                                                        mb="10px !important"
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
                                                            my="10px !important"
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

export default Signup;
