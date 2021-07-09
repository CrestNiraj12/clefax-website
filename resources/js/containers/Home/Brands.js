import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Link,
    SimpleGrid,
    Text
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import Veggies from "../../../images/veggies.jpg";
import Bakery from "../../../images/bakery.jpg";
import Meat from "../../../images/meat.jpg";
import { useEffect } from "react";
import { apiClient } from "../../utilities";
import { useState } from "react";

const cards = [
    {
        title: "Organic Vegetables",
        subtitle: "Up to 10% off",
        btnStyle: "solid",
        colorTheme: "normal",
        link: "/shop/search/?q=&cat=Vegetables",
        image: Veggies
    },
    {
        title: "Fresh Meat",
        subtitle: "High-end meat",
        btnStyle: "solid",
        colorTheme: "normal",
        link: "/shop/search/?q=&cat=Meat",
        image: Meat
    },
    {
        title: "Amazing cakes",
        subtitle: "Cakes & Cookies",
        colorTheme: "bw",
        btnStyle: "outline",
        link: "/shop/search/?q=&cat=Bakery",
        image: Bakery
    }
];

const brands = [
    {
        logo:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/12/brand2-1.png",
        name: "Magna",
        url: "http://localhost:3000/shop/products/?id=1"
    },
    {
        logo:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/12/brand3.png",
        name: "Logoname",
        url: "#"
    },
    {
        logo:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/12/brand6-1.png",
        name: "Craft",
        url: "#"
    },
    {
        logo:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/12/brand2-1.png",
        name: "Magna",
        url: "#"
    },
    {
        logo:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/12/brand2-1.png",
        name: "Magna",
        url: "#"
    },
    {
        logo:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/12/brand2-1.png",
        name: "Magna",
        url: "#"
    }
];

const Brands = () => {
    var history = useHistory();
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        apiClient
            .get("/api/shops")
            .then(res => {
                setVendors(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <Box marginY="100px" overflow="hidden">
            <SimpleGrid columns={{ md: cards.length / 2, lg: cards.length }}>
                {cards.map(
                    (
                        { title, subtitle, colorTheme, btnStyle, link, image },
                        index
                    ) => (
                        <Link
                            href={link}
                            key={index}
                            outline="none"
                            tabIndex={-1}
                            _focus={{
                                boxShadow: "none"
                            }}
                        >
                            <Box pos="relative" h="420px" overflow="hidden">
                                <Box
                                    bg={`url(${image}) no-repeat center center`}
                                    bgSize="cover"
                                    alt={title}
                                    backgroundColor="#a7a7a7"
                                    backgroundBlendMode={
                                        colorTheme === "normal"
                                            ? ""
                                            : "multiply"
                                    }
                                    className="gridItemImage"
                                    w="100%"
                                    h="100%"
                                />
                                <Flex
                                    direction="column"
                                    pos="absolute"
                                    top="130px"
                                    right="70px"
                                    alignItems="center"
                                >
                                    <Text
                                        color={
                                            colorTheme === "normal"
                                                ? "secondary"
                                                : "#fff"
                                        }
                                        fontSize="18px"
                                    >
                                        {subtitle}
                                    </Text>
                                    <Heading
                                        as="h4"
                                        textTransform="uppercase"
                                        letterSpacing="1.8px"
                                        fontSize="2em"
                                        marginY="15px"
                                        color={
                                            colorTheme === "normal"
                                                ? "primary"
                                                : "#fff"
                                        }
                                    >
                                        {title}
                                    </Heading>
                                    <Button
                                        variant={btnStyle}
                                        color={
                                            colorTheme === "normal"
                                                ? "#000"
                                                : "#fff"
                                        }
                                        bg={
                                            colorTheme === "normal"
                                                ? "#fff"
                                                : "transparent"
                                        }
                                        mt="10px"
                                        fontSize="14px"
                                        w="200px"
                                        onClick={() => history.push(link)}
                                    >
                                        Shop collection
                                    </Button>
                                </Flex>
                            </Box>
                        </Link>
                    )
                )}
            </SimpleGrid>
            <Flex
                mt="100px"
                className="slideshow"
                justifyContent="space-between"
            >
                {vendors
                    .concat(vendors)
                    .concat(vendors)
                    .map(({ id, logo, name }, index) => (
                        <Flex
                            key={index}
                            padding="70px 94px"
                            w="100%"
                            justifyContent="center"
                            borderRightWidth="1px"
                            borderTopWidth="1px"
                            borderBottomWidth="1px"
                            borderLeftWidth={index === 0 ? "1px" : "0"}
                            borderColor="lightgray"
                        >
                            <Link
                                href={`/shop/products/?id=${id}`}
                                outline="none"
                                tabIndex={-1}
                                _focus={{
                                    boxShadow: "none"
                                }}
                            >
                                <Avatar
                                    size="xl"
                                    name={name}
                                    src={logo}
                                    filter="saturate(0)"
                                    transition="transform 0.2s ease-out"
                                    className="brandImg"
                                    _hover={{
                                        transform: "scale(1.1)",
                                        filter: "saturate(1)"
                                    }}
                                />
                            </Link>
                        </Flex>
                    ))}
            </Flex>
        </Box>
    );
};

export default Brands;
