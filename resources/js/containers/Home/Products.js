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
import React, { useEffect, useState } from "react";
import "rc-slider/assets/index.css";
import { AddIcon } from "@chakra-ui/icons";
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

const categories = ["Audio & Home", "Camera & Photo", "Hello & mellow"];

const mapStateToProps = state => ({
    products: state.products
});

const Products = ({ products }) => {
    const [sortBy, setSortBy] = useState(0);
    const [value, setValue] = useState([0, 1000]);
    const [checkedItems, setCheckedItems] = useState(
        Array.from({ length: categories.length }, () => false)
    );
    const [checkedCategories, setCheckedCategories] = useState([]);
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
        setTimeout(() => setLoading(false), 0);
    };

    const handleFilterPrice = v => {
        setLoading(true);
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
                                        {categories.map((category, index) => (
                                            <Checkbox
                                                key={index}
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
                                        setLoading={setLoading}
                                        data={products}
                                        setPriceRange={setValue}
                                        handleFilter={handleFilterPrice}
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
                maxH={{ lg: "1040px" }}
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
                        : filteredProducts.map((product, index) => (
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
