import {
    Box,
    Button,
    Checkbox,
    Flex,
    Grid,
    Heading,
    HStack,
    Icon,
    Image,
    Link,
    SimpleGrid,
    Skeleton,
    SkeletonText,
    Spacer,
    Text,
    VStack
} from "@chakra-ui/react";
import { Range, Handle } from "rc-slider";
import React, { useEffect, useState } from "react";
import "rc-slider/assets/index.css";
import { AddIcon } from "@chakra-ui/icons";
import { BiX, BiSliderAlt } from "react-icons/bi";
import "@fontsource/rubik/500.css";
import { CSSTransition } from "react-transition-group";
import ReactStars from "react-rating-stars-component";
import { floor } from "lodash";
import Sorter, { handleSortBy } from "../../components/Sorter";
import { getFinalPrice } from "../../utilities";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const categories = ["Audio & Home", "Camera & Photo", "Hello & mellow"];

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

const Products = () => {
    const [range, setRange] = useState([0, 1000]);
    const [sortBy, setSortBy] = useState(0);
    const [value, setValue] = useState([0, 1000]);
    const [checkedItems, setCheckedItems] = useState(
        Array.from({ length: categories.length }, () => false)
    );
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setProducts(data);
        handleSortBy(0, setSortBy, setFilteredProducts, data);
        const min = floor(
            getFinalPrice(
                data.reduce((a, b) =>
                    getFinalPrice(a) < getFinalPrice(b) ? a : b
                )
            )
        );
        const max = data.reduce((a, b) => (b > a ? b : a)).price;
        setRange([min, max]);
        setValue([min, max]);
        setLoading(false);
    }, []);

    const handleFilter = (
        v,
        checkedFilters = checkedItems,
        checked = checkedCategories
    ) => {
        var fp = products.filter(
            product =>
                getFinalPrice(product) >= v[0] && getFinalPrice(product) <= v[1]
        );
        fp = checkedFilters.every(item => !item)
            ? fp
            : fp.filter(product =>
                  product.categories.some(cat => checked.includes(cat))
              );
        handleSortBy(sortBy, setSortBy, setFilteredProducts, fp);
        setLoading(false);
    };

    const handleFilterPrice = v => {
        setLoading(true);
        setValue(v);
        handleFilter(v);
    };

    const handleFilterCategories = (e, index, category) => {
        setLoading(true);
        const checkedFilters = [
            ...checkedItems.slice(0, index),
            e.target.checked,
            ...checkedItems.slice(index + 1)
        ];

        setCheckedItems(checkedFilters);
        const checked = e.target.checked
            ? [...checkedCategories, category]
            : checkedCategories.filter(cat => cat !== category);

        setCheckedCategories(checked);

        handleFilter(value, checkedFilters, checked);
    };

    const handleReset = () => {
        setLoading(true);
        setValue([range[0], range[1]]);
        setCheckedItems(Array.from({ length: categories.length }, () => false));
        setFilteredProducts(products);
        setLoading(false);
    };

    return (
        <Box m="50px 20px">
            <Box mb="50px">
                <Flex zIndex={2} pos="relative">
                    <Heading
                        as="h2"
                        textTransform="uppercase"
                        fontSize="2em"
                        letterSpacing={1}
                    >
                        All Products
                    </Heading>
                    <Spacer />
                    <Sorter
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        setProducts={setProducts}
                        products={products}
                    />
                    <Button
                        variant="outline"
                        className="optionBtn"
                        rightIcon={
                            <Icon as={showFilters ? BiX : BiSliderAlt} />
                        }
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        Filter
                    </Button>
                </Flex>
                <CSSTransition
                    in={showFilters}
                    timeout={250}
                    classNames="filters"
                >
                    <Box className="filters">
                        <Box
                            marginY="30px"
                            borderWidth="1px"
                            borderStyle="solid"
                            borderColor="gray.300"
                            p="50px"
                        >
                            <Flex>
                                <Box>
                                    <Heading as="h6" className="filterHeading">
                                        Choose Categories
                                    </Heading>
                                    <SimpleGrid
                                        columns={3}
                                        columnGap={10}
                                        rowGap={2}
                                    >
                                        {categories.map((category, index) => (
                                            <Checkbox
                                                key={index}
                                                size={"lg"}
                                                isChecked={checkedItems[index]}
                                                spacing={4}
                                                colorScheme="red"
                                                icon={<AddIcon />}
                                                color="blackAlpha.700"
                                                onChange={e =>
                                                    handleFilterCategories(
                                                        e,
                                                        index,
                                                        category
                                                    )
                                                }
                                            >
                                                {category}
                                            </Checkbox>
                                        ))}
                                    </SimpleGrid>
                                </Box>
                                <Spacer />
                                <Box minW="600px">
                                    <Heading as="h6" className="filterHeading">
                                        Choose Price
                                    </Heading>
                                    <Range
                                        allowCross={false}
                                        min={range[0]}
                                        max={range[1]}
                                        value={value}
                                        handle={SliderHandle}
                                        railStyle={{
                                            height: 10,
                                            margin: "0 -10px",
                                            backgroundColor: "#e1e1e1"
                                        }}
                                        style={{
                                            margin: "0 10px"
                                        }}
                                        onChange={handleFilterPrice}
                                    />
                                    <Text
                                        color="blackAlpha.700"
                                        fontSize="18px"
                                        mt="20px"
                                    >
                                        Range: £{value[0]} - £{value[1]}
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Button
                            bg="secondary"
                            color="#fff"
                            fontSize="sm"
                            onClick={handleReset}
                            _hover={{ background: "#000 !important" }}
                        >
                            Clear filters
                        </Button>
                    </Box>
                </CSSTransition>
            </Box>
            {loading ? (
                <CSSTransition
                    in={loading}
                    appear={true}
                    classNames="container-load"
                    timeout={500}
                >
                    <Grid
                        templateRows="repeat(2, 1fr)"
                        templateColumns="repeat(4, 1fr)"
                        gap={10}
                        className="container-load"
                        zIndex={1}
                        position="relative"
                        bg="#fff"
                    >
                        {Array.from({ length: 8 }, () => true).map(
                            (_, index) => (
                                <Box
                                    key={index}
                                    borderWidth="1px"
                                    borderColor="#e6e6e6"
                                >
                                    <Skeleton
                                        height="22vw"
                                        startColor="lightgray"
                                        endColor="gray"
                                    />
                                    <Box p="30px 40px">
                                        <SkeletonText
                                            mt="4"
                                            startColor="lightgray"
                                            endColor="gray"
                                            noOfLines={3}
                                            skeletonHeight="20px"
                                            spacing="4"
                                        />
                                    </Box>
                                </Box>
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
                        templateColumns="repeat(4, 1fr)"
                        gap={10}
                        zIndex={1}
                        className="container-load"
                        position="relative"
                        bg="#fff"
                    >
                        {filteredProducts.map((product, index) => (
                            <ProductCard
                                product={product}
                                key={index + Date.now()}
                            />
                        ))}
                    </Grid>
                </CSSTransition>
            )}
        </Box>
    );
};

const SliderHandle = props => {
    return (
        <Handle
            {...props}
            style={{
                borderColor: "var(--chakra-colors-secondary)",
                borderRadius: 0,
                borderWidth: 5,
                height: 20,
                width: 20,
                "&:active": {
                    borderColor: "var(--chakra-colors-secondary)"
                },
                "&:hover": {
                    backgroundColor: "var(--chakra-colors-secondary)"
                }
            }}
        />
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
            {discount && discount > 0 && (
                <Box
                    borderWidth="1px"
                    borderColor="secondary"
                    pos="absolute"
                    color="secondary"
                    w="60px"
                    textAlign="center"
                    top="25px"
                    left="20px"
                    pointerEvents="none"
                >
                    -{discount}%
                </Box>
            )}
            <Flex direction="column">
                <Link href={url}>
                    <Image
                        src={src}
                        alt={title}
                        minH="22vw"
                        outline="none"
                        objectFit="contain"
                        bg="#e6e6e6"
                        tabIndex="-1"
                        _hover={{
                            boxShadow: "none"
                        }}
                        cursor="pointer"
                    />
                </Link>
                <VStack spacing={4} align="stretch" p="30px 40px">
                    <ReactStars
                        edit={false}
                        value={rating}
                        size={16}
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
                        <Heading as="h4" fontSize="lg" fontWeight="500">
                            {title}
                        </Heading>
                    </Link>
                    <HStack spacing={2}>
                        {discount && discount > 0 && (
                            <Heading
                                as="h2"
                                fontSize="lg"
                                color="gray"
                                textDecor="line-through"
                            >
                                £{price.toFixed(2)}
                            </Heading>
                        )}
                        <Heading as="h2" fontSize="lg" color="secondary">
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

export default Products;
