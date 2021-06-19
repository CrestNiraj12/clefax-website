import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { validateDetails } from "../../utilities/validation";
import ImageUploader from "react-images-upload";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    useToast,
    VStack
} from "@chakra-ui/react";

const details = [
    { name: "fullname", label: "Full Name" },
    { name: "email", label: "Email Address" },
    { name: "phone", label: "Phone no." },
    { name: "address", label: "Address" }
];

const passwords = [
    {
        name: "old_password",
        label: "Current Password (Leave blank to leave unchanged)"
    },
    { name: "password", label: "New Password" },
    { name: "password_confirmation", label: "Confirm Password" }
];

const Details = () => {
    const toast = useToast();
    const [show, setShow] = useState({
        old_password: false,
        password: false,
        password_confirmation: false
    });

    return (
        <Formik
            validate={validateDetails}
            initialValues={{
                avatar: null,
                fullname: "",
                email: "",
                phone: "",
                address: "",
                dob: "",
                gender: "",
                old_password: "",
                password: "",
                password_confirmation: ""
            }}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                    toast({
                        title: "Account details updated",
                        description:
                            "Successfully updated your account details.",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                        position: "top"
                    });
                }, 1000);
            }}
        >
            {props => (
                <Form>
                    <VStack alignItems="flex-start" w="100%" mr="20px">
                        <Field name="avatar" w="100%">
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={
                                        form.errors.avatar &&
                                        form.touched.avatar
                                    }
                                    mb="10px !important"
                                >
                                    <FormLabel>Avatar</FormLabel>
                                    <Box w={{ base: "100%", md: "40%" }}>
                                        <ImageUploader
                                            withPreview={true}
                                            withIcon={true}
                                            buttonText="Browse avatar"
                                            onChange={(files, urls) =>
                                                form.setFieldValue(
                                                    "avatar",
                                                    files[0]
                                                )
                                            }
                                            imgExtension={[
                                                ".jpg",
                                                ".gif",
                                                ".png",
                                                ".gif"
                                            ]}
                                            maxFileSize={5242880}
                                        />
                                    </Box>
                                </FormControl>
                            )}
                        </Field>
                        {details.map(({ name, label }, index) => (
                            <Field name={name} key={index}>
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={
                                            form.errors[name] &&
                                            form.touched[name]
                                        }
                                        mb="10px !important"
                                    >
                                        <FormLabel>{label}</FormLabel>

                                        <Input {...field} id={name} size="sm" />
                                    </FormControl>
                                )}
                            </Field>
                        ))}
                        <Field name="dob">
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={
                                        form.errors.dob && form.touched.dob
                                    }
                                    mb="10px !important"
                                >
                                    <FormLabel>Date of birth</FormLabel>

                                    <Input
                                        type="date"
                                        {...field}
                                        id="dob"
                                        size="sm"
                                    />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="gender">
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={
                                        form.errors.gender &&
                                        form.touched.gender
                                    }
                                    mb="10px !important"
                                >
                                    <FormLabel>Gender</FormLabel>

                                    <Select
                                        {...field}
                                        placeholder="Select gender"
                                        size="sm"
                                        id="gender"
                                    >
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="O">Other</option>
                                    </Select>
                                </FormControl>
                            )}
                        </Field>
                        <Heading as="h6" fontSize="lg" my="20px !important">
                            Password Change
                        </Heading>
                        {passwords.map(({ name, label }, index) => (
                            <Field name={name} key={index}>
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={
                                            form.errors[name] &&
                                            form.touched[name]
                                        }
                                        mb="10px !important"
                                    >
                                        <FormLabel>{label}</FormLabel>

                                        <InputGroup>
                                            <Input
                                                {...field}
                                                id={name}
                                                pr="4.5rem"
                                                type={
                                                    show[name]
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
                                                        setShow({
                                                            ...show,
                                                            [name]: !show[name]
                                                        })
                                                    }
                                                >
                                                    {show[name]
                                                        ? "Hide"
                                                        : "Show"}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormErrorMessage>
                                            {form.errors[name]}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        ))}

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
                            Save Changes
                        </Button>
                    </VStack>
                </Form>
            )}
        </Formik>
    );
};

export default Details;
