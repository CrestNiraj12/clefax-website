import {
    Box,
    Button,
    Checkbox,
    Collapse,
    Flex,
    Grid,
    Heading,
    Icon,
    SimpleGrid,
    Spacer,
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import "rc-slider/assets/index.css";
import { BiX, BiSliderAlt } from "react-icons/bi";
import "@fontsource/rubik/500.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Sorter, { handleSortBy } from "../../components/Sorter";
import { getFinalPrice } from "../../utilities";
import { connect } from "react-redux";
import ProductCardColumn, {
    SkeletonCardColumn
} from "../../components/ProductCardColumn";
import PriceRange from "../../components/PriceRange";

const mapStateToProps = state => ({
    products: state.products,
    categories: state.categories
});

const Products = ({ products, categories }) => {
    const rangeRef = useRef();
    const [sortBy, setSortBy] = useState(0);
    const [value, setValue] = useState([0, 1000]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isOpen, onToggle } = useDisclosure();

    useEffect(() => {
        if (products.length) {
            setLoading(true);
            handleSortBy(0, setSortBy, setFilteredProducts, products);
            setLoading(false);
        }
    }, [products]);

    const handleFilter = (v, index = null) => {
        setLoading(true);
        if (index !== null) {
            setActiveCategory(index === activeCategory ? null : index);
        }

        var fp = products.filter(
            product =>
                getFinalPrice(product) >= v[0] && getFinalPrice(product) <= v[1]
        );
        fp =
            index === activeCategory
                ? fp
                : fp.filter(
                      product =>
                          product.category.name ===
                          categories[index === null ? activeCategory : index]
                              .name
                  );
        handleSortBy(sortBy, setSortBy, setFilteredProducts, fp);
        setTimeout(() => setLoading(false), 0);
    };

    const handleReset = () => {
        setLoading(true);
        rangeRef.current.resetRange();
        setActiveCategory(null);
        setFilteredProducts(products);
        setLoading(false);
    };

    return (
        <Box m="50px 20px">
            <Box mb="50px">
                <Flex
                    zIndex={2}
                    pos="relative"
                    direction={{ base: "column", md: "row" }}
                >
                    <Heading
                        as="h2"
                        textTransform="uppercase"
                        fontSize="2em"
                        letterSpacing={1}
                    >
                        All Products
                    </Heading>
                    <Spacer />
                    <Flex mt={{ base: "10px", md: 0 }}>
                        <Sorter
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            setProducts={setFilteredProducts}
                            products={filteredProducts}
                            setLoading={setLoading}
                        />
                        <Button
                            variant="outline"
                            className="optionBtn"
                            rightIcon={<Icon as={isOpen ? BiX : BiSliderAlt} />}
                            p="0px 10px !important"
                            onClick={onToggle}
                        >
                            Filter
                        </Button>
                    </Flex>
                </Flex>
                <Collapse in={isOpen} animateOpacity>
                    <Box>
                        <Box
                            marginY="30px"
                            borderWidth="1px"
                            borderStyle="solid"
                            borderColor="gray.300"
                            p="50px"
                        >
                            <Stack
                                direction={{
                                    base: "column",
                                    lg: "row"
                                }}
                                spacing={12}
                                justifyContent="space-between"
                            >
                                <Box>
                                    <Heading as="h6" className="filterHeading">
                                        Choose Categories
                                    </Heading>
                                    <SimpleGrid
                                        columns={{ base: 1, sm: 2, md: 3 }}
                                        columnGap={10}
                                        rowGap={2}
                                    >
                                        {categories.map(({ name }, index) => (
                                            <Checkbox
                                                key={index}
                                                isChecked={
                                                    activeCategory === index
                                                }
                                                spacing={4}
                                                colorScheme="red"
                                                color="blackAlpha.700"
                                                onChange={() =>
                                                    handleFilter(value, index)
                                                }
                                            >
                                                {name}
                                            </Checkbox>
                                        ))}
                                    </SimpleGrid>
                                </Box>

                                <Box
                                    minW={{ lg: "500px" }}
                                    mt={{
                                        base: "30px !important",
                                        md: "50px !important",
                                        lg: "0 !important"
                                    }}
                                >
                                    <Heading as="h6" className="filterHeading">
                                        Choose Price
                                    </Heading>
                                    <PriceRange
                                        ref={rangeRef}
                                        setLoading={setLoading}
                                        data={products}
                                        setPriceRange={setValue}
                                        handleFilter={handleFilter}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                        <Button
                            bg="secondary"
                            color="#fff"
                            fontSize="sm"
                            p="0 10px !important"
                            onClick={handleReset}
                            _hover={{ background: "#000 !important" }}
                        >
                            Clear filters
                        </Button>
                    </Box>
                </Collapse>
            </Box>
            <Grid
                templateRows={{
                    base: "repeat(8, 1fr)",
                    md: "repeat(4, 1fr)",
                    lg: "repeat(2, 1fr)"
                }}
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(4, 1fr)"
                }}
                gap={10}
                zIndex={1}
                position="relative"
                bg="#fff"
                overflow="hidden"
            >
                <TransitionGroup component={null}>
                    {loading
                        ? Array.from({ length: 8 }, () => true).map(
                              (_, index) => (
                                  <CSSTransition
                                      in={loading}
                                      key={index}
                                      classNames="container-load"
                                      timeout={300}
                                  >
                                      <SkeletonCardColumn />
                                  </CSSTransition>
                              )
                          )
                        : filteredProducts.slice(0, 8).map((product, index) => (
                              <CSSTransition
                                  in={!loading}
                                  key={index + Date.now()}
                                  classNames="container-load"
                                  timeout={300}
                              >
                                  <ProductCardColumn product={product} />
                              </CSSTransition>
                          ))}
                </TransitionGroup>
            </Grid>
        </Box>
    );
};

export default connect(mapStateToProps)(Products);
