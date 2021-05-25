import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Image,
    Link,
    SimpleGrid,
    Text
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";

const cards = [
    {
        title: "Great Sound",
        subtitle: "Up to 20% off",
        btnStyle: "solid",
        colorTheme: "normal",
        link: "#",
        image:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/02/banner2-10.jpg"
    },
    {
        title: "Special Version",
        subtitle: "High-end goods 2020",
        btnStyle: "solid",
        colorTheme: "normal",
        link: "#",
        image:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/02/banner2-11.jpg"
    },
    {
        title: "Series 5 Titanium",
        subtitle: "Apple Watch Edition",
        colorTheme: "bw",
        btnStyle: "outline",
        link: "#",
        image:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/02/banner2-12.jpg"
    }
];

const brands = [
    {
        logo:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/12/brand2-1.png",
        name: "Magna",
        url: "#"
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
    return (
        <Box marginY="100px" overflow="hidden">
            <SimpleGrid columns={cards.length}>
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
                                    bgImage={`url(${image})`}
                                    alt={title}
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
                                                ? "#000"
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
                {brands.concat(brands).map(({ logo, url, name }, index) => (
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
                            href={url}
                            outline="none"
                            tabIndex={-1}
                            _focus={{
                                boxShadow: "none"
                            }}
                        >
                            <Image
                                src={logo}
                                alt={name}
                                className="brandImg"
                                filter="saturate(0)"
                                transition="transform 0.2s ease-out"
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
