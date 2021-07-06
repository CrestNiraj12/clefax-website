import React, { useState } from "react";
import {
    Box,
    Heading,
    Stack,
    VStack,
    Text,
    StackDivider,
    IconButton,
    HStack,
    Icon,
    Textarea,
    FormControl,
    FormErrorMessage,
    Input,
    Button,
    useToast
} from "@chakra-ui/react";
import Breadcrumb from "../../components/Breadcrumb";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { MAPS_API_KEY, TEMPLATE_BASIC } from "../../constants";
import {
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaLinkedin
} from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import { validateContactForm } from "../../utilities/validation";
import { handleMailSend } from "../../utilities/mail";

const mapStyles = {
    width: "100%",
    height: "100%"
};

const socials = [
    {
        icon: FaTwitter,
        url: "#",
        desc: "Twitter"
    },
    {
        icon: FaFacebook,
        url: "#",
        desc: "Facebook"
    },
    {
        icon: FaInstagram,
        url: "#",
        desc: "Instagram"
    },
    {
        icon: FaYoutube,
        url: "#",
        desc: "Youtube"
    },
    {
        icon: FaLinkedin,
        url: "#",
        desc: "Linkedin"
    }
];

const Contact = ({ crumbs }) => {
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const toast = useToast();

    const handleMarkerClick = (props, marker, e) => {
        setActiveMarker(marker);
        setSelectedPlace(props);
        setShowInfoWindow(true);
    };

    const handleClose = props => {
        if (showInfoWindow) {
            setShowInfoWindow(false);
            setActiveMarker(null);
        }
    };

    return (
        <Box mb="100px">
            <Breadcrumb crumbs={crumbs} margin="20px" />
            <Box pos="relative" w="100%" h="35vw" my="50px">
                <Map
                    google={google}
                    zoom={10}
                    style={mapStyles}
                    initialCenter={{
                        lat: 53.728425226686504,
                        lng: -1.6996983882411096
                    }}
                >
                    <Marker
                        onClick={handleMarkerClick}
                        name={"Clefax E-Shop"}
                    />
                    <InfoWindow
                        marker={activeMarker}
                        visible={showInfoWindow}
                        onClose={handleClose}
                    >
                        <div>
                            <h6>{selectedPlace ? selectedPlace.name : ""}</h6>
                        </div>
                    </InfoWindow>
                </Map>
            </Box>
            <Stack
                mx="20px"
                direction={{ base: "column", lg: "row" }}
                spacing={10}
            >
                <Box w={{ base: "100%", lg: "70%" }}>
                    <Heading as="h6" fontSize="medium" mb="30px">
                        Get in touch
                    </Heading>
                    <Formik
                        validate={validateContactForm}
                        initialValues={{
                            fullname: "",
                            email: "",
                            subject: "",
                            message: ""
                        }}
                        onSubmit={(values, actions) => {
                            handleMailSend(
                                TEMPLATE_BASIC,
                                values.subject,
                                "Admin",
                                "clefaxeshop@gmail.com",
                                {
                                    message:
                                        `<p>Enquiry from: ${values.fullname}<br/>Email: ${values.email}</p><p>` +
                                        message.value +
                                        "</p>",
                                    from_name: values.fullname,
                                    reply_to: values.email
                                }
                            );
                            actions.setSubmitting(false);
                            toast({
                                title: "Thank you for contacting us",
                                description:
                                    "We will look at your enquiry and contact you soon!",
                                status: "info",
                                duration: "1500",
                                position: "top"
                            });
                            actions.resetForm();
                        }}
                    >
                        {props => (
                            <Form style={{ width: "100%" }}>
                                <HStack>
                                    <Field name="fullname">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.fullname &&
                                                    form.touched.fullname
                                                }
                                                isRequired
                                            >
                                                <Input
                                                    borderRadius="0"
                                                    variant="filled"
                                                    placeholder="Name*"
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
                                                <Input
                                                    borderRadius="0"
                                                    variant="filled"
                                                    placeholder="Email*"
                                                    {...field}
                                                    id="email"
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.email}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="subject">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.subject &&
                                                    form.touched.subject
                                                }
                                                isRequired
                                            >
                                                <Input
                                                    borderRadius="0"
                                                    variant="filled"
                                                    placeholder="Subject*"
                                                    {...field}
                                                    id="subject"
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.subject}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </HStack>
                                <Field name="message">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.message &&
                                                form.touched.message
                                            }
                                            isRequired
                                        >
                                            <Textarea
                                                size="sm"
                                                h="150px"
                                                variant="filled"
                                                placeholder="Message*"
                                                {...field}
                                                id="message"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button
                                    isLoading={props.isSubmitting}
                                    background="secondary"
                                    color="#fff"
                                    fontSize="smaller"
                                    letterSpacing="3px"
                                    fontWeight="bold"
                                    width="200px"
                                    px="25px !important"
                                    _hover={{
                                        background:
                                            "var(--chakra-colors-primary) !important"
                                    }}
                                    type="submit"
                                >
                                    Send
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
                <VStack
                    spacing={5}
                    alignItems="flex-start"
                    divider={<StackDivider />}
                >
                    <VStack spacing={5} alignItems="flex-start">
                        <Heading as="h6" fontSize="small">
                            ADDRESS
                        </Heading>
                        <Text>
                            189 Spen Lane, Gomersal, West Yorkshire, BD19 4PJ
                        </Text>
                    </VStack>
                    <VStack spacing={5} alignItems="flex-start">
                        <Heading as="h6" fontSize="small">
                            PHONE
                        </Heading>
                        <Text>+44 (0) 161 123 6789</Text>
                    </VStack>
                    <VStack spacing={5} alignItems="flex-start">
                        <Heading as="h6" fontSize="small">
                            Email
                        </Heading>
                        <Text>clefaxeshop@gmail.com</Text>
                    </VStack>
                    <VStack spacing={3} alignItems="flex-start">
                        <Heading as="h6" fontSize="small">
                            FOLLOW US ON
                        </Heading>
                        <HStack spacing={10}>
                            {socials.map(({ icon, url, desc }, index) => (
                                <IconButton
                                    key={index}
                                    aria-label={desc}
                                    icon={<Icon as={icon} />}
                                    variant="unstyled"
                                    color="gray"
                                    minW="auto"
                                    size="lg"
                                    w="0"
                                    _hover={{
                                        color:
                                            "var(--chakra-colors-secondary)  !important",
                                        background: "transparent !important",
                                        outline: "none"
                                    }}
                                    _focus={{
                                        boxShadow: "none",
                                        outline: "none"
                                    }}
                                    onClick={() => history.push(url)}
                                />
                            ))}
                        </HStack>
                    </VStack>
                </VStack>
            </Stack>
        </Box>
    );
};

export default GoogleApiWrapper({ apiKey: MAPS_API_KEY })(Contact);
