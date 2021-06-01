import { Box, Flex, Heading, Image, Link } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-multi-carousel";

const categories = [
    {
        title: "Headphone",
        image:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img1.png",
        url: "#"
    },
    {
        title: "Airpods",
        image:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img2-1.png",
        url: "#"
    },
    {
        title: "Smartphone",
        image:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img3-1.png",
        url: "#"
    },
    {
        title: "Smartphone",
        image:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img3-1.png",
        url: "#"
    },
    {
        title: "Smartphone",
        image:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img3-1.png",
        url: "#"
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
                                w="150px"
                                height="150px"
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
