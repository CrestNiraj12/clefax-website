import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    HStack,
    Image,
    Spacer,
    Stack,
    StackDivider,
    Text,
    VStack
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Bag from "../../../images/bag.png";
import Like from "../../../images/like.png";
import Payment from "../../../images/payment.png";
import Shopping from "../../../images/shopping.png";
import ProductCardRow, {
    SkeletonCardRow
} from "../../components/ProductCardRow";
import Deli from "../../../images/deli-serve.jpg";
import { useHistory } from "react-router-dom";

const mapStateToProps = state => ({
    products: state.products
});

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

const Featured = ({ products }) => {
    var history = useHistory();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState(0);

    useEffect(() => {
        if (products.length > 0) {
            setLoading(true);
            setFilteredProducts(products);
            setFilteredProducts(sortByLatest(products));
            setLoading(false);
        }
    }, [products]);

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
        setFilteredProducts(fp);
        setTimeout(() => setLoading(false), 0);
    };

    return (
        <Box bgColor="lightgray" p="100px 20px">
            <Box
                bgColor="#fff"
                p={{ base: "100px 5%", md: "100px 5%", lg: "100px 10%" }}
            >
                <Flex
                    direction={{ base: "column", md: "column" }}
                    zIndex={2}
                    pos="relative"
                    mb="50px"
                    alignItems={{ base: "center", md: "center" }}
                >
                    <Heading
                        as="h2"
                        textTransform="uppercase"
                        fontSize="2em"
                        letterSpacing={1}
                        mb={{ base: "30px", md: "30px" }}
                    >
                        Latest Products
                    </Heading>
                    <Spacer />
                    <HStack spacing={2} wrap="wrap">
                        {filters.map((filter, index) => (
                            <Button
                                key={index}
                                background="transparent"
                                fontSize={{ base: "10px", md: "13px" }}
                                fontWeight="bold"
                                fontFamily="Archivo"
                                onClick={() => handleApplyFilter(index)}
                                className={
                                    activeFilter === index ? "activeFilter" : ""
                                }
                                p="0px 10px !important"
                            >
                                {filter}
                            </Button>
                        ))}
                    </HStack>
                </Flex>
                <Grid
                    templateRows={{
                        base: "repeat(6, 1fr)",
                        md: "repeat(3, 1fr)",
                        xl: "repeat(2, 1fr)"
                    }}
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        xl: "repeat(3, 1fr)"
                    }}
                    gap={10}
                    position="relative"
                    bg="#fff"
                    maxH={{ lg: "350px" }}
                    overflow="hidden"
                >
                    <TransitionGroup component={null}>
                        {loading
                            ? Array.from({ length: 6 }, () => true).map(
                                  (_, index) => (
                                      <CSSTransition
                                          in={loading}
                                          key={index}
                                          classNames="container-load"
                                          timeout={300}
                                      >
                                          <SkeletonCardRow />
                                      </CSSTransition>
                                  )
                              )
                            : filteredProducts
                                  .slice(0, 6)
                                  .map((product, index) => (
                                      <CSSTransition
                                          in={!loading}
                                          key={index + Date.now()}
                                          classNames="container-load"
                                          timeout={300}
                                      >
                                          <ProductCardRow product={product} />
                                      </CSSTransition>
                                  ))}
                    </TransitionGroup>
                </Grid>
                <Box
                    marginY="100px"
                    w="100%"
                    h={{ base: "150px", md: "25vw", lg: "15vw" }}
                    display="flex"
                    bg={`url(${Deli}) no-repeat center center`}
                    bgColor="#3b3b3b"
                    bgBlendMode="overlay"
                    bgSize="cover"
                    pos="relative"
                >
                    <VStack
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
                            fontSize={{ base: "1.2em", sm: "1.8em" }}
                            letterSpacing="1px"
                        >
                            Latest & Special Brands
                        </Heading>
                        <Button
                            variant="outline"
                            color="#fff"
                            fontSize="1em"
                            borderColor="#fff"
                            p="0px 10px !important"
                            onClick={() => history.push("/shop")}
                        >
                            Shop now
                        </Button>
                    </VStack>
                </Box>
                <Box>
                    <Stack
                        divider={<StackDivider borderColor="gray.500" />}
                        justifyContent="space-around"
                        direction={{ base: "column", lg: "row" }}
                        spacing={{ base: 10, lg: 0 }}
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
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default connect(mapStateToProps)(Featured);
