import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    HStack,
    Icon,
    Image,
    Link,
    Skeleton,
    SkeletonText,
    Spacer,
    Stack,
    VStack
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

const data = [
    {
        title: "Headphone S102",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-11-720x720.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 4,
        url: "#",
        price: 46.0,
        discount: 25,
        categories: ["Hello & mellow"],
        created_at: "2021/01/01"
    },
    {
        title: "Bluetooth Speaker GK1",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-12.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-23.jpg"
        ],
        rating: 0,
        url: "#",
        price: 100.0,
        discount: 13,
        categories: ["Audio & Home"],
        created_at: "2022/01/01"
    },
    {
        title: "Headphone S102",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-11-720x720.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 2,
        url: "#",
        price: 46.0,
        discount: 13,
        categories: ["Hello & mellow"],
        created_at: "2021/01/01"
    },
    {
        title: "Headphone S102",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-11-720x720.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 4,
        url: "#",
        price: 46.0,
        categories: ["Hello & mellow"],
        created_at: "2021/02/01"
    },
    {
        title: "Headphone S102",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-11-720x720.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 3.86,
        url: "#",
        price: 46.0,
        categories: ["Hello & mellow"],
        created_at: "2021/01/01"
    },
    {
        title: "Headphone S102",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-11-720x720.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 4,
        url: "#",
        price: 46.0,
        discount: 13,
        categories: ["Hello & mellow"],
        created_at: "2021/01/01"
    },
    {
        title: "Headphone S102",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-11-720x720.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 4,
        url: "#",
        price: 46.0,
        discount: 13,
        categories: ["Camera & Photo", "Hello & mellow"],
        created_at: "2021/01/02"
    },
    {
        title: "Headphone S102",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-11-720x720.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 4,
        url: "#",
        price: 46.0,
        categories: ["Hello & mellow"],
        created_at: "2021/01/01"
    }
];

const filters = ["Latest Products", "Top Rating", "Best Selling", "Featured"];

const Featured = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState(0);

    useEffect(() => {
        setLoading(true);
        setProducts(
            data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        );
        setLoading(false);
    }, []);

    const handleApplyFilter = index => {
        setActiveFilter(index);
    };

    return (
        <Box bgColor="lightgray" p="100px 20px">
            <Box bgColor="#fff" p="100px 10%">
                <Flex zIndex={2} pos="relative" mb="50px">
                    <Heading
                        as="h2"
                        textTransform="uppercase"
                        fontSize="2em"
                        letterSpacing={1}
                    >
                        Latest Products
                    </Heading>
                    <Spacer />
                    <HStack spacing={2}>
                        {filters.map((filter, index) => (
                            <Button
                                key={index}
                                fontSize="13px"
                                fontWeight="bold"
                                fontFamily="Lato"
                                onClick={() => handleApplyFilter(index)}
                                className={
                                    activeFilter === index ? "activeFilter" : ""
                                }
                            >
                                {filter}
                            </Button>
                        ))}
                    </HStack>
                </Flex>
                {loading ? (
                    <Grid
                        templateRows="repeat(2, 1fr)"
                        templateColumns="repeat(3, 1fr)"
                        gap={10}
                        position="relative"
                        bg="#fff"
                    >
                        {Array.from({ length: 6 }, () => true).map(
                            (_, index) => (
                                <Box
                                    key={index}
                                    borderWidth="1px"
                                    borderColor="#e6e6e6"
                                >
                                    <Skeleton
                                        height="150px"
                                        startColor="primary"
                                        endColor="gray"
                                    />
                                    <Box p="10px 20px">
                                        <SkeletonText
                                            mt="4"
                                            startColor="primary"
                                            endColor="gray"
                                            noOfLines={3}
                                            skeletonHeight="20px"
                                            spacing="2"
                                        />
                                    </Box>
                                </Box>
                            )
                        )}
                    </Grid>
                ) : (
                    <Grid
                        templateRows="repeat(2, 1fr)"
                        templateColumns="repeat(3, 1fr)"
                        gap={10}
                        position="relative"
                        bg="#fff"
                    >
                        {products.slice(0, 6).map((product, index) => (
                            <ProductCard
                                product={product}
                                key={index + product.title}
                            />
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

const ProductCard = ({
    product: { title, url, images, rating, price, discount }
}) => {
    const [src, setSrc] = useState(images[0]);

    return (
        <Box
            borderWidth="1px"
            borderColor="#e6e6e6"
            onMouseEnter={() => (images.length > 1 ? setSrc(images[1]) : null)}
            onMouseLeave={() => (images.length > 1 ? setSrc(images[0]) : null)}
            pos="relative"
        >
            <Flex>
                <Link href={url}>
                    <Image
                        src={src}
                        alt={title}
                        h="150px"
                        objectFit="contain"
                        bg="#e6e6e6"
                        cursor="pointer"
                        tabIndex="-1"
                        _hover={{
                            boxShadow: "none"
                        }}
                    />
                </Link>
                <VStack
                    spacing={2}
                    align="stretch"
                    p="10px 20px"
                    justifyContent="center"
                >
                    <ReactStars
                        edit={false}
                        value={rating}
                        size={13}
                        emptyIcon={<Icon as={FaRegStar} />}
                        filledIcon={<Icon as={FaStar} />}
                        halfIcon={<Icon as={FaStarHalfAlt} />}
                    />
                    <Link
                        href={url}
                        _hover={{
                            color: "secondary",
                            textDecoration: "none"
                        }}
                    >
                        <Heading as="h4" fontSize="1.1rem" fontWeight="500">
                            {title}
                        </Heading>
                    </Link>
                    <HStack spacing={2}>
                        {discount && discount > 0 && (
                            <Heading
                                as="h2"
                                fontSize="md"
                                color="gray"
                                textDecor="line-through"
                            >
                                £{price.toFixed(2)}
                            </Heading>
                        )}
                        <Heading as="h2" fontSize="md" color="secondary">
                            £
                            {(discount && discount > 0
                                ? price - price * (discount / 100)
                                : price
                            ).toFixed(2)}
                        </Heading>
                    </HStack>
                </VStack>
            </Flex>
        </Box>
    );
};

export default Featured;
