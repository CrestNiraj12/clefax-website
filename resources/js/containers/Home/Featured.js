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
    StackDivider,
    Text,
    VStack
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { CSSTransition } from "react-transition-group";
import Bag from "../../../images/bag.png";
import Like from "../../../images/like.png";
import Payment from "../../../images/payment.png";
import Shopping from "../../../images/shopping.png";

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

const benefits = [
    {
        icon: Like,
        title: "100% Satisfaction",
        desc: "High quality products"
    },
    {
        icon: Payment,
        title: "Flexible payment",
        desc: "Use Paypal or Stripe"
    },
    {
        icon: Shopping,
        title: "Pickup options",
        desc: "Pickup whenever you want"
    },
    {
        icon: Bag,
        title: "Wishlist products",
        desc: "Buy the products you like later"
    }
];

const Featured = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState(0);

    useEffect(() => {
        setLoading(true);
        setProducts(data);
        setProducts(sortByLatest(data));
        setLoading(false);
    }, []);

    const sortByLatest = data =>
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const handleApplyFilter = index => {
        setLoading(true);
        setActiveFilter(index);
        var fp = [];
        if (index === 0) fp = sortByLatest(products);
        else if (index === 1) fp = products.sort((a, b) => b.rating - a.rating);
        else if (index === 2) fp = products.sort((a, b) => b.rating - a.rating);
        else if (index === 3) fp = sortByLatest(products);
        setProducts(fp);
        setLoading(false);
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
                    <CSSTransition
                        in={loading}
                        appear={true}
                        classNames="container-load"
                        timeout={500}
                    >
                        <Grid
                            templateRows="repeat(2, 1fr)"
                            templateColumns="repeat(3, 1fr)"
                            gap={10}
                            className="container-load"
                            position="relative"
                            bg="#fff"
                        >
                            {Array.from({ length: 6 }, () => true).map(
                                (_, index) => (
                                    <Flex
                                        key={index}
                                        borderWidth="1px"
                                        borderColor="#e6e6e6"
                                    >
                                        <Skeleton
                                            width="250px"
                                            height="150px"
                                            startColor="lightgray"
                                            endColor="gray"
                                            borderRadius="0"
                                        />
                                        <Box p="10px 20px" width="100%">
                                            <SkeletonText
                                                mt="7"
                                                width="100px"
                                                startColor="lightgray"
                                                endColor="gray"
                                                noOfLines={1}
                                                skeletonHeight="18px"
                                            />
                                            <SkeletonText
                                                width="100%"
                                                startColor="lightgray"
                                                endColor="gray"
                                                noOfLines={2}
                                                mt="2"
                                                skeletonHeight="20px"
                                                spacing="2"
                                            />
                                        </Box>
                                    </Flex>
                                )
                            )}
                        </Grid>
                    </CSSTransition>
                ) : (
                    <CSSTransition
                        in={!loading}
                        appear={true}
                        classNames="container-load"
                        timeout={500}
                    >
                        <Grid
                            templateRows="repeat(2, 1fr)"
                            templateColumns="repeat(3, 1fr)"
                            gap={10}
                            className="container-load"
                            position="relative"
                            bg="#fff"
                        >
                            {products.slice(0, 6).map((product, index) => (
                                <ProductCard
                                    product={product}
                                    key={index + Date.now()}
                                />
                            ))}
                        </Grid>
                    </CSSTransition>
                )}
                <Box marginY="100px" w="100%" pos="relative">
                    <Image
                        src="https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/12/banner2-7.jpg"
                        w="100%"
                        h="100%"
                        alt="banner"
                        objectFit="cover"
                    />
                    <VStack
                        pos="absolute"
                        w="100%"
                        h="100%"
                        justifyContent="center"
                        spacing="7"
                        textTransform="uppercase"
                        top="0"
                    >
                        <Heading
                            as="h2"
                            color="#fff"
                            fontSize="1.8em"
                            letterSpacing="1px"
                        >
                            Latest & Special Brands
                        </Heading>
                        <Button
                            variant="outline"
                            color="#fff"
                            fontSize="1em"
                            borderColor="#fff"
                        >
                            Shop now
                        </Button>
                    </VStack>
                </Box>
                <Box>
                    <HStack
                        divider={<StackDivider borderColor="gray.500" />}
                        justifyContent="space-around"
                    >
                        {benefits.map(({ icon, title, desc }, index) => (
                            <Flex key={index} justifyContent="center">
                                <Image
                                    src={icon}
                                    alt={title}
                                    w="50px"
                                    h="50px"
                                    mr="20px"
                                />
                                <VStack alignItems="start">
                                    <Heading
                                        as="h6"
                                        textTransform="uppercase"
                                        fontSize="1.2em"
                                    >
                                        {title}
                                    </Heading>
                                    <Text color="gray">{desc}</Text>
                                </VStack>
                            </Flex>
                        ))}
                    </HStack>
                </Box>
            </Box>
        </Box>
    );
};

const ProductCard = ({
    product: { title, url, images, rating, price, discount }
}) => {
    const [src, setSrc] = useState(images[0]);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Box
            borderWidth="1px"
            borderColor="#e6e6e6"
            onMouseEnter={() => (images.length > 1 ? setSrc(images[1]) : null)}
            onMouseLeave={() => (images.length > 1 ? setSrc(images[0]) : null)}
            pos="relative"
        >
            <Flex pos="relative">
                <Link href={url}>
                    <CSSTransition
                        in={imageLoaded}
                        classNames="container-load"
                        timeout={500}
                    >
                        <Box h="150px" w="150px" className="container-load">
                            <Image
                                src={src}
                                alt={title}
                                w="100%"
                                h="100%"
                                objectFit="contain"
                                bg="#e6e6e6"
                                outline="none"
                                cursor="pointer"
                                tabIndex="-1"
                                _hover={{
                                    boxShadow: "none"
                                }}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </Box>
                    </CSSTransition>
                    {!imageLoaded && (
                        <CSSTransition
                            in={!imageLoaded}
                            classNames="container-load"
                            timeout={500}
                        >
                            <Skeleton
                                width="150px"
                                height="150px"
                                startColor="lightgray"
                                endColor="gray"
                                borderRadius="0"
                                className="container-load"
                                top={0}
                                pos="absolute"
                            />
                        </CSSTransition>
                    )}
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
