import { Box, Flex, Heading, Image, Link } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-multi-carousel";

const categories = [
    {
        title: "Bakery",
        image: "https://i.imgur.com/uMmffue.png",
        url: "/shop/search/?q=&cat=Bakery"
    },
    {
        title: "Dairy",
        image: "https://i.imgur.com/FYIJ3Qt.png",
        url: "/shop/search/?q=&cat=Dairy"
    },
    {
        title: "Fruits",
        image: "https://i.imgur.com/NF698jk.png",
        url: "/shop/search/?q=&cat=Fruits"
    },
    {
        title: "Meat",
        image: "https://i.imgur.com/H3rwTuC.png",
        url: "/shop/search/?q=&cat=Meat"
    },
    {
        title: "Vegetables",
        image: "https://i.imgur.com/1U1IgBf.png",
        url: "/shop/search/?q=&cat=Vegetables"
    }
];

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 2
    }
};

const Categories = () => {
    return (
        <Box m="100px 30px" overflow="hidden">
            <Carousel
                ssr
                autoPlay={false}
                responsive={responsive}
                draggable={true}
                swipeable={true}
                keyBoardControl
                arrows={false}
            >
                {categories.map(({ title, image, url }, index) => (
                    <Flex
                        key={index}
                        direction="column"
                        cursor="pointer"
                        alignItems="center"
                        textAlign="center"
                        pt="10px"
                    >
                        <Link
                            href={url}
                            className="link textLink"
                            _hover={{
                                "& > img": {
                                    transform: "translateY(-10px)"
                                }
                            }}
                        >
                            <Image
                                src={image}
                                w="180px"
                                height="140px"
                                transition="transform 0.25s ease-out"
                                alt={title}
                            />

                            <Heading as="h6" fontSize="14px" mt="20px">
                                {title}
                            </Heading>
                        </Link>
                    </Flex>
                ))}
            </Carousel>
        </Box>
    );
};

export default Categories;
