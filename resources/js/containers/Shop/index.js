import {
    Box,
    Heading,
    Stack,
    List,
    ListItem,
    ListIcon,
    Divider,
    VStack,
    Spinner,
    Icon,
    Button,
    HStack,
    Text,
    Spacer,
    SimpleGrid,
    Flex
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import PriceRange from "../../components/PriceRange";
import ProductCardColumn from "../../components/ProductCardColumn";
import Sorter, { handleSortBy } from "../../components/Sorter";
import ReactPaginate from "react-paginate";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { ceil } from "lodash";
import { getFinalPrice } from "../../utilities";

const tags = ["meat", "vegetables", "lamb", "cake", "bakery"];

const mapStateToProps = state => ({
    products: state.products,
    categories: state.categories
});

const options = [6, 12, 18];

const Shop = ({ crumbs, products, categories }) => {
    const [sortBy, setSortBy] = useState(0);
    const [loading, setLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [value, setValue] = useState([]);
    const [activeN, setActiveN] = useState(0);
    const [pageIndex, setPageIndex] = useState([0, options[activeN]]);
    const [activeTags, setActiveTags] = useState([]);

    useEffect(() => {
        if (products.length) {
            setLoading(true);
            setFilteredProducts(products);
            setLoading(false);
        }
    }, [products]);

    const handleFilter = (v, index = null, tags = null) => {
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
                          product.category ===
                          categories[index === null ? activeCategory : index]
                              .title
                  );

        fp =
            (tags === null && !activeTags.length) || (tags && !tags.length)
                ? fp
                : fp.filter(product =>
                      product.tags.some(t => {
                          tags = tags === null ? activeTags : tags;
                          return tags
                              .map(tag => tag.toLowerCase())
                              .includes(t.toLowerCase());
                      })
                  );
        handleSortBy(sortBy, setSortBy, setFilteredProducts, fp);
        setTimeout(() => setLoading(false), 0);
    };

    const handleTagFilter = tag => {
        const tags = activeTags.includes(tag)
            ? activeTags.filter(t => t !== tag)
            : [...activeTags, tag];
        setActiveTags(tags);
        handleFilter(value, activeCategory, tags);
    };

    const handleChangeProductN = index => {
        setLoading(true);
        setActiveN(index);
        setPageIndex([pageIndex[0], pageIndex[0] + options[index]]);
        setLoading(false);
    };

    const handlePageClick = data => {
        setLoading(true);
        const selected = data.selected;
        setPageIndex([
            selected * options[activeN],
            selected * options[activeN] + options[activeN]
        ]);
        setLoading(false);
    };

    return (
        <Box mx="20px" mb="100px">
            <Breadcrumb crumbs={crumbs} margin="20px 0" />
            <Stack
                direction={{ base: "column", lg: "row" }}
                mt="50px"
                spacing={10}
            >
                <VStack alignItems="stretch" spacing={12}>
                    <Box>
                        <Heading as="h6" fontSize="xl" mb="10px">
                            Categories
                        </Heading>
                        <hr className="line" />
                        <Divider borderColor="#66666663" />
                        <List spacing={3} mt="30px">
                            {categories.map(({ title, products }, index) => (
                                <ListItem
                                    key={index}
                                    fontSize="md"
                                    cursor="pointer"
                                    color={
                                        activeCategory === index
                                            ? "secondary"
                                            : "gray"
                                    }
                                    _hover={{
                                        color: "red"
                                    }}
                                    onClick={() => handleFilter(value, index)}
                                >
                                    <ListIcon as={ChevronRightIcon} />
                                    {title} ({products.length})
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box>
                        <Heading as="h6" fontSize="xl" mb="10px">
                            Price
                        </Heading>
                        <hr className="line" />
                        <Divider borderColor="#66666663" mb="20px" />
                        <PriceRange
                            setLoading={setLoading}
                            data={products}
                            setPriceRange={setValue}
                            handleFilter={handleFilter}
                            fontSize="medium"
                            margin="40px 0"
                        />
                    </Box>
                    <Box>
                        <Heading as="h6" fontSize="xl" mb="10px">
                            Product Tags
                        </Heading>
                        <hr className="line" />
                        <Divider borderColor="#66666663" mb="20px" />
                        {tags.map((tag, index) => (
                            <Button
                                onClick={() => handleTagFilter(tag)}
                                variant="outline"
                                key={index}
                                fontSize="sm"
                                p="0 20px !important"
                                m="0 10px 10px 0"
                                color={
                                    activeTags.includes(tag) ? "#fff" : "gray"
                                }
                                borderColor={
                                    activeTags.includes(tag)
                                        ? "secondary"
                                        : "gray"
                                }
                                background={
                                    activeTags.includes(tag)
                                        ? "secondary"
                                        : "transparent"
                                }
                                className="ignoreHover"
                            >
                                {tag}
                            </Button>
                        ))}
                    </Box>
                </VStack>
                <Box w="100%">
                    <Stack
                        direction={{ base: "column", md: "row" }}
                        alignItems={{ base: "flex-start", md: "center" }}
                        spacing={5}
                        mb="30px"
                    >
                        <HStack spacing={8}>
                            <HStack
                                spacing={8}
                                border="1px solid"
                                borderColor="lightgray"
                                p="7px 15px !important"
                            >
                                <Text color="gray">Show</Text>
                                <HStack spacing={4}>
                                    {options.map((n, i) => (
                                        <Button
                                            variant="link"
                                            minW="0"
                                            fontSize="sm"
                                            key={i}
                                            color={
                                                activeN === i
                                                    ? "secondary"
                                                    : "gray"
                                            }
                                            _hover={{
                                                bg: "transparent !important",
                                                color:
                                                    "var(--chakra-colors-secondary) !important"
                                            }}
                                            onClick={() =>
                                                handleChangeProductN(i)
                                            }
                                        >
                                            {n}
                                        </Button>
                                    ))}
                                </HStack>
                            </HStack>
                            <Text color="gray">
                                {pageIndex[0] === 0 &&
                                pageIndex[1] > filteredProducts.length
                                    ? `Showing all ${filteredProducts.length} item(s)`
                                    : `Showing ${pageIndex[0] + 1}-
                                ${
                                    pageIndex[1] >= filteredProducts.length
                                        ? filteredProducts.length
                                        : pageIndex[1]
                                } of ${filteredProducts.length} item(s)`}
                            </Text>
                        </HStack>
                        <Spacer />
                        <Sorter
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            setLoading={setLoading}
                            products={filteredProducts}
                            setProducts={setFilteredProducts}
                            bColor="lightgray"
                        />
                    </Stack>
                    {loading ? (
                        <Flex w="100%" justifyContent="center">
                            <Spinner color="secondary" />
                        </Flex>
                    ) : (
                        <>
                            <SimpleGrid
                                columns={{ base: 1, md: 2, lg: 3 }}
                                columnGap={5}
                                rowGap={5}
                            >
                                {filteredProducts
                                    .slice(pageIndex[0], pageIndex[1])
                                    .map((product, index) => (
                                        <ProductCardColumn
                                            product={product}
                                            key={index + Date.now()}
                                        />
                                    ))}
                            </SimpleGrid>
                            <ReactPaginate
                                previousLabel={
                                    <Icon
                                        fontSize="25px"
                                        as={BsArrowLeftShort}
                                    />
                                }
                                nextLabel={
                                    <Icon
                                        fontSize="25px"
                                        as={BsArrowRightShort}
                                    />
                                }
                                breakLabel="..."
                                initialPage={0}
                                breakClassName="breakPagination"
                                pageCount={ceil(
                                    filteredProducts.length / options[activeN]
                                )}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName="pagination"
                                activeLinkClassName="activePagination"
                                pageLinkClassName="defPagination"
                                disabledClassName="disabledPagination"
                                nextLinkClassName="nextPagination"
                                previousClassName="previousPagination"
                            />
                        </>
                    )}
                </Box>
            </Stack>
        </Box>
    );
};

export default connect(mapStateToProps)(Shop);
