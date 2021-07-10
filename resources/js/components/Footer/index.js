import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Icon,
    IconButton,
    Image,
    Input,
    Link,
    Spacer,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import {
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaLinkedin
} from "react-icons/fa";
import React, { useState, Fragment } from "react";
import { useHistory } from "react-router";
import Paypal from "../../../images/paypal.png";
import Stripe from "../../../images/stripe.png";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { MAPS_API_KEY } from "../../constants";
import { connect } from "react-redux";

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

const mapStateToProps = state => ({
    auth: state.auth
});

const Footer = ({ auth }) => {
    var history = useHistory();
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const footerLinks = [
        {
            title: "company",
            links: [
                ...(auth.logged_in && auth.user.role === "Customer"
                    ? [
                          {
                              title: "Wishlist",
                              url: "/wishlist"
                          }
                      ]
                    : []),
                {
                    title: "Shop Products",
                    url: "/shop"
                },
                ...(auth.logged_in && auth.user.role === "Customer"
                    ? [
                          {
                              title: "My Cart",
                              url: "/cart"
                          },
                          {
                              title: "Checkout",
                              url: "/checkout"
                          }
                      ]
                    : []),
                {
                    title: "Contact Us",
                    url: "/contact"
                },
                ...(auth.logged_in && auth.user.role === "Customer"
                    ? [
                          {
                              title: "Order Tracking",
                              url: "/orders"
                          }
                      ]
                    : [])
            ]
        },
        {
            title: "Explore",
            links: [
                {
                    title: "Gift a Smile",
                    url: "#"
                },
                {
                    title: "Creybit Cares",
                    url: "#"
                },
                {
                    title: "Size Guide",
                    url: "#"
                },
                {
                    title: "F.A.Q's",
                    url: "#"
                },
                {
                    title: "Privacy Policy",
                    url: "#"
                },
                {
                    title: "Store Location",
                    url: "#"
                }
            ]
        }
    ];

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
        <Box bgColor="primary" pos="relative">
            <Flex
                pos="absolute"
                bgColor="secondary"
                p={{ base: "10px 20px", lg: "10px 50px" }}
                marginX="20px"
                alignItems="center"
                w="calc(100% - 40px)"
                top={-35}
                direction={{ base: "column", lg: "row" }}
            >
                <Heading
                    as="h3"
                    textTransform="uppercase"
                    color="#fff"
                    fontSize={{ base: "1em", lg: "1.5em" }}
                    letterSpacing="0.5px"
                    mb={{ base: "10px", lg: 0 }}
                >
                    Sign up for newsletter
                </Heading>
                <Spacer />
                <HStack
                    spacing={2}
                    w={{ base: "100%", lg: "50%" }}
                    my={{ base: "20px", lg: 0 }}
                >
                    <Input
                        variant="filled"
                        placeholder="Your Email Address"
                        size="md"
                        fontSize={{ base: "smaller", lg: "medium" }}
                        borderRadius="0"
                        _focus={{
                            bg: "#fff",
                            borderColor: "primary"
                        }}
                    />
                    <Button
                        textTransform="uppercase"
                        color="#fff"
                        fontSize={{ base: "11px", md: "14px" }}
                        p={{
                            base: "0px 20px !important"
                        }}
                        bg="primary"
                        _hover={{
                            background:
                                "var(--chakra-colors-darkgray) !important"
                        }}
                    >
                        Subscribe
                    </Button>
                </HStack>
                <Spacer />
                <HStack spacing={0}>
                    {socials.map(({ icon, url, desc }, index) => (
                        <IconButton
                            key={index}
                            aria-label={desc}
                            icon={<Icon as={icon} />}
                            variant="unstyled"
                            color="#fff"
                            size="lg"
                            w="0"
                            _hover={{
                                color:
                                    "var(--chakra-colors-primary)  !important",
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
            </Flex>
            <Box marginX="20px">
                <Stack
                    padding={{ base: "200px 0 50px", lg: "100px 0 100px" }}
                    className="footerContainer"
                    direction={{ base: "column", lg: "row" }}
                >
                    <VStack className="footerInnerContainer">
                        <Heading as="h6" className="footerHeading">
                            Contact Information
                        </Heading>
                        <VStack className="footerTextContainer" spacing={5}>
                            <Text className="footerText">
                                Call us 24/7 Free
                            </Text>
                            <Text
                                fontSize="40px"
                                color="var(--chakra-colors-secondary) !important"
                                fontWeight="700"
                            >
                                161 123 6789
                            </Text>
                            <Text className="footerText">
                                clefaxeshop@gmail.com
                            </Text>
                            <Text className="footerText">
                                189 Spen Lane, Gomersal, West Yorkshire, BD19
                                4PJ
                            </Text>
                        </VStack>
                    </VStack>
                    <Spacer />
                    {footerLinks.map(({ title, links }, index) => (
                        <Fragment key={index}>
                            <VStack
                                className="footerContainer"
                                mt={{
                                    base: "50px !important",
                                    lg: "0 !important"
                                }}
                            >
                                <Heading as="h6" className="footerHeading">
                                    {title}
                                </Heading>
                                <VStack className="footerInnerContainer">
                                    {links.map(({ title, url }, i) => (
                                        <Link
                                            href={url}
                                            key={i}
                                            color="var(--chakra-colors-gray) !important"
                                            fontSize="16px"
                                            mb="10px !important"
                                            _hover={{
                                                color:
                                                    "var(--chakra-colors-secondary) !important"
                                            }}
                                        >
                                            {title}
                                        </Link>
                                    ))}
                                </VStack>
                            </VStack>
                            <Spacer />
                        </Fragment>
                    ))}
                    <Spacer />
                    <VStack className="footerContainer" w="30%">
                        <Heading as="h6" className="footerHeading">
                            Our Location
                        </Heading>

                        <Box pos="relative" w="100%" h="220px">
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
                                        <h6>
                                            {selectedPlace
                                                ? selectedPlace.name
                                                : ""}
                                        </h6>
                                    </div>
                                </InfoWindow>
                            </Map>
                        </Box>
                    </VStack>
                </Stack>
            </Box>
            <Flex
                padding="20px"
                bgColor="#323232"
                direction={{ base: "column", lg: "row" }}
                alignItems={{ base: "center", lg: "initial" }}
            >
                <Text className="footerText" mb={{ base: "10px", lg: "0px" }}>
                    Copyright © 2020 Clefax. All rights reserved.
                </Text>
                <Spacer />
                <HStack>
                    <Image src={Paypal} alt="Paypal" maxH="24px" />
                    <Image src={Stripe} alt="Stripe" maxH="24px" />
                </HStack>
            </Flex>
        </Box>
    );
};

export default connect(mapStateToProps)(
    GoogleApiWrapper({ apiKey: MAPS_API_KEY })(Footer)
);
