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
import React from "react";
import { useHistory } from "react-router";

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

const footerLinks = [
    {
        title: "company",
        links: [
            {
                title: "About us",
                url: "#"
            },
            {
                title: "Shop Products",
                url: "#"
            },
            {
                title: "My Cart",
                url: "#"
            },
            {
                title: "Checkout",
                url: "#"
            },
            {
                title: "Contact Us",
                url: "#"
            },
            {
                title: "Order Tracking",
                url: "#"
            }
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

const Footer = () => {
    var history = useHistory();

    return (
        <Box bgColor="primary" pos="relative">
            <Flex
                pos="absolute"
                bgColor="secondary"
                p="10px 50px"
                marginX="20px"
                alignItems="center"
                w="calc(100% - 40px)"
                top={-35}
            >
                <Heading
                    as="h3"
                    textTransform="uppercase"
                    color="#fff"
                    fontSize="1.5em"
                    letterSpacing="0.5px"
                >
                    Sign up for newsletter
                </Heading>
                <Spacer />
                <HStack spacing={2} w="50%">
                    <Input
                        variant="filled"
                        placeholder="Your Email Address"
                        size="md"
                        borderRadius="0"
                        _focus={{
                            bg: "#fff",
                            borderColor: "primary"
                        }}
                    />
                    <Button
                        textTransform="uppercase"
                        color="#fff"
                        fontSize="14px"
                        p="0px 10px !important"
                        _hover={{
                            background:
                                "var(--chakra-colors-primary) !important"
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
                <HStack paddingY="100px" className="footerContainer">
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
                                1234 567 6789
                            </Text>
                            <Text className="footerText">
                                clefax-eshop@gmail.com
                            </Text>
                            <Text className="footerText">
                                189 Spen Lane, Gomersal, West Yorkshire, BD19
                                4PJ
                            </Text>
                        </VStack>
                    </VStack>
                    <Spacer />
                    {footerLinks.map(({ title, links }, index) => (
                        <>
                            <VStack className="footerContainer">
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
                                        >
                                            {title}
                                        </Link>
                                    ))}
                                </VStack>
                            </VStack>
                            <Spacer />
                        </>
                    ))}
                    <Spacer />
                    <VStack className="footerContainer">
                        <Heading as="h6" className="footerHeading">
                            Our Location
                        </Heading>
                        <Box>
                            <Image
                                src="https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2018/06/banner1-5-1.png"
                                alt="Shops"
                                w="500px"
                            />
                        </Box>
                    </VStack>
                </HStack>
            </Box>
            <Flex padding="20px" bgColor="#323232">
                <Text className="footerText">
                    Copyright © 2020 Clefax. All rights reserved.
                </Text>
                <Spacer />
                <Box>
                    <Image
                        src="https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2018/06/paymet-1.png"
                        alt="Payment options"
                    />
                </Box>
            </Flex>
        </Box>
    );
};

export default Footer;
