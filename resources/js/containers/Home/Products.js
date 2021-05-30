import {
    Box,
    Button,
    Checkbox,
    Flex,
    Grid,
    Heading,
    Icon,
    SimpleGrid,
    Spacer,
    Text
} from "@chakra-ui/react";
import { Range, Handle } from "rc-slider";
import React, { useEffect, useState } from "react";
import "rc-slider/assets/index.css";
import { AddIcon } from "@chakra-ui/icons";
import { BiX, BiSliderAlt } from "react-icons/bi";
import "@fontsource/rubik/500.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { floor } from "lodash";
import Sorter, { handleSortBy } from "../../components/Sorter";
import { getFinalPrice } from "../../utilities";
import { connect } from "react-redux";
import ProductCardColumn, {
    SkeletonCardColumn
} from "../../components/ProductCardColumn";

const categories = ["Audio & Home", "Camera & Photo", "Hello & mellow"];

const mapStateToProps = state => ({
    products: state.products
});

const Products = ({ products }) => {
    const [range, setRange] = useState([0, 1000]);
    const [sortBy, setSortBy] = useState(0);
    const [value, setValue] = useState([0, 1000]);
    const [checkedItems, setCheckedItems] = useState(
        Array.from({ length: categories.length }, () => false)
    );
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (products.length > 0) {
            setLoading(true);
            handleSortBy(0, setSortBy, setFilteredProducts, products);
            const min = floor(
                getFinalPrice(
                    products.reduce((a, b) =>
                        getFinalPrice(a) < getFinalPrice(b) ? a : b
                    )
                )
            );
            const max = products.reduce((a, b) => (b > a ? b : a)).price;
            setRange([min, max]);
            setValue([min, max]);
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
                        setProducts={setFilteredProducts}
                        products={filteredProducts}
                        setLoading={setLoading}
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
            <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(4, 1fr)"
                gap={10}
                zIndex={1}
                position="relative"
                bg="#fff"
                overflow="hidden"
                maxH="1040px"
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

export default connect(mapStateToProps)(Products);
