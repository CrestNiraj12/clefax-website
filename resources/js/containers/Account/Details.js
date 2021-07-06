import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { validateDetails } from "../../utilities/validation";
import ImageUploader from "react-images-upload";
import {
    Avatar,
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
    Spinner,
    Stack,
    useToast,
    VStack
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { apiClient } from "../../utilities";
import { DEFAULT_TOAST } from "../../constants";
import { setAuth } from "../../actions";

const details = [
    { name: "fullname", label: "Full Name", disabled: false, required: true },
    { name: "email", label: "Email Address", disabled: true, required: true },
    { name: "phone", label: "Phone no.", disabled: false, required: true },
    { name: "address", label: "Address", disabled: false, required: true },
    {
        name: "street_no",
        label: "Street Address",
        disabled: false,
        required: false
    }
];

const passwords = [
    {
        name: "password",
        label: "Current Password (Leave blank to leave unchanged)"
    },
    { name: "new_password", label: "New Password" },
    { name: "new_password_confirmation", label: "Confirm Password" }
];

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    setAuth: auth => dispatch(setAuth(auth))
});

const Details = ({ auth, setAuth }) => {
    const toast = useToast(DEFAULT_TOAST);
    const [show, setShow] = useState({
        password: false,
        new_password: false,
        new_password_confirmation: false
    });
    const [avatar, setAvatar] = useState(null);

    return auth.logged_in ? (
        <Formik
            validate={validateDetails}
            initialValues={{
                avatar: auth.user.avatar,
                fullname: auth.user.fullname,
                email: auth.user.email,
                phone: auth.user.phone,
                street_no: auth.user.street_no,
                address: auth.user.address,
                dob: new Date(auth.user.dob).toISOString().substr(0, 10),
                gender: auth.user.gender,
                password: "",
                new_password: "",
                new_password_confirmation: ""
            }}
            onSubmit={(values, actions) => {
                apiClient
                    .get("/sanctum/csrf-cookie")
                    .then(res => {
                        const data = new FormData();

                        for (var key in values) {
                            data.append(key, values[key]);
                        }

                        data.append("avatar", avatar);
                        apiClient
                            .post("/api/user", data)
                            .then(res => {
                                setAuth({
                                    logged_in: true,
                                    user: res.data.user
                                });
                                localStorage.setItem(
                                    "user",
                                    JSON.stringify(res.data.user)
                                );
                                actions.setSubmitting(false);
                                toast({
                                    title: "Account details updated",
                                    description: res.data.message,
                                    status: "success"
                                });
                            })
                            .catch(err => {
                                actions.setSubmitting(false);
                                console.log(err);
                                console.log(err.response);
                                if (err.response) {
                                    const errors = err.response.data.errors;
                                    if (errors) {
                                        Object.keys(errors)
                                            .map(k => errors[k][0])
                                            .forEach(error => {
                                                console.log(error);
                                                toast({
                                                    title: "Error occurred!",
                                                    description: error,
                                                    status: "error"
                                                });
                                            });
                                    } else
                                        toast({
                                            title: "Error occurred!",
                                            description:
                                                err.response.data.message,
                                            status: "error"
                                        });
                                } else
                                    toast({
                                        title: "Error occurred!",
                                        description:
                                            "Something went wrong while updating your details! Please try again!",
                                        status: "error"
                                    });
                            });
                    })
                    .catch(err => console.log(err));
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
                                    <Stack
                                        direction="column"
                                        spacing={10}
                                        alignItems={{
                                            base: "center",
                                            md: "flex-start"
                                        }}
                                    >
                                        <Avatar
                                            size="2xl"
                                            name={auth.user.fullname}
                                            src={`storage/${auth.user.avatar}`}
                                        />
                                        <Box w={{ base: "100%", md: "40%" }}>
                                            <FormLabel>Avatar</FormLabel>
                                            <Box>
                                                <ImageUploader
                                                    withPreview={true}
                                                    withIcon={true}
                                                    buttonText="Browse avatar"
                                                    singleImage={true}
                                                    onChange={(files, urls) => {
                                                        setAvatar(files[0]);
                                                        form.setFieldValue(
                                                            "avatar",
                                                            files[0]
                                                        );
                                                    }}
                                                    imgExtension={[
                                                        ".jpg",
                                                        ".gif",
                                                        ".png",
                                                        ".gif"
                                                    ]}
                                                    maxFileSize={5242880}
                                                />
                                            </Box>
                                        </Box>
                                    </Stack>
                                </FormControl>
                            )}
                        </Field>
                        {details.map(
                            ({ name, label, disabled, required }, index) => (
                                <Field name={name} key={index}>
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors[name] &&
                                                form.touched[name]
                                            }
                                            isRequired={required}
                                            mb="10px !important"
                                        >
                                            <FormLabel>{label}</FormLabel>

                                            <Input
                                                {...field}
                                                id={name}
                                                size="sm"
                                                disabled={disabled}
                                            />
                                            <FormErrorMessage>
                                                {form.errors.name}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            )
                        )}
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
                                    <FormErrorMessage>
                                        {form.errors.dob}
                                    </FormErrorMessage>
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
                                    <FormErrorMessage>
                                        {form.errors.gender}
                                    </FormErrorMessage>
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
    ) : (
        <Spinner color="secondary" />
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
