import { Box, Flex, Heading, Image, Link, Spacer } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";

const categories = [
    {
        title: "Headphone",
        image: "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img1.png",
        url: "#",
    },
    {
        title: "Airpods",
        image: "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img2-1.png",
        url: "#",
    },
    {
        title: "Smartphone",
        image: "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img3-1.png",
        url: "#",
    },
    {
        title: "Smartphone",
        image: "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img3-1.png",
        url: "#",
    },
    {
        title: "Smartphone",
        image: "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img3-1.png",
        url: "#",
    },
];

const Categories = () => {
    var history = useHistory();

    return (
        <Box m="100px 30px">
            <Flex textAlign="center" justifyContent="space-evenly">
                {categories.map(({ title, image, url }, index) => (
                    <Flex key={index} direction="column" cursor="pointer">
                        <Link
                            href={url}
                            className="link textLink"
                            _hover={{
                                "& > img": {
                                    transform: "translateY(-10px)",
                                },
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
            </Flex>
        </Box>
    );
};

export default Categories;
