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
    Flex,
    Avatar
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import PriceRange from "../../components/PriceRange";
import ProductCardColumn from "../../components/ProductCardColumn";
import Sorter, { handleSortBy } from "../../components/Sorter";
import ReactPaginate from "react-paginate";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { FaLocationArrow, FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { ceil, filter } from "lodash";
import { apiClient, getFinalPrice, searchQuery } from "../../utilities";
import qs from "query-string";
import { useHistory } from "react-router-dom";
import ShopImg from "../../../images/shop.jpg";

const mapStateToProps = state => ({
    products: state.products,
    categories: state.categories
});

const options = [6, 12, 18];

const Shop = ({ crumbs, products, categories }) => {
    var history = useHistory();
    const [sortBy, setSortBy] = useState(0);
    const [loading, setLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [value, setValue] = useState([]);
    const [activeN, setActiveN] = useState(0);
    const [pageIndex, setPageIndex] = useState([0, options[activeN]]);
    const [activeTags, setActiveTags] = useState([]);
    const [tags, setTags] = useState([]);
    const [query, setQuery] = useState(null);
    const [filterByShop, setFilterByShop] = useState({
        status: false,
        shop: null
    });

    useEffect(() => {
        if (products) {
            var temp = [];
            products.forEach(p => {
                temp = temp.concat(
                    p.tags ? p.tags.split(",").map(t => t.trim()) : []
                );
            });

            setTags(temp);
        }
    }, [products]);

    useEffect(() => {
        if (location.pathname === "/shop/search/") {
            setLoading(true);
            const q = qs.parse(location.search);
            setQuery(q);
            if (categories.length && products.length) {
                const index = q.cat
                    ? categories.findIndex(category => category.name === q.cat)
                    : null;
                handleFilter(value, index, null, q.q);
            }
        }
    }, [categories, products]);

    useEffect(() => {
        if (location.pathname === "/shop/products/") {
            setLoading(true);
            const q = qs.parse(location.search);
            if (q.id) {
                apiClient
                    .get("/sanctum/csrf-cookie")
                    .then(res =>
                        apiClient
                            .get(`/api/shops/${q.id}`)
                            .then(res => {
                                setFilterByShop({
                                    status: true,
                                    shop: res.data
                                });
                                setFilteredProducts(res.data.products);

                                var temp = [];
                                res.data.products.forEach(p => {
                                    temp = temp.concat(
                                        p.tags
                                            ? p.tags
                                                  .split(",")
                                                  .map(t => t.trim())
                                            : []
                                    );
                                });

                                setTags(temp);
                                setLoading(false);
                            })
                            .catch(err => console.log(err))
                    )
                    .catch(err => console.log(err));
            } else history.goBack();
        }
    }, []);

    useEffect(() => {
        if (location.pathname !== "/shop/search/" && products.length) {
            setLoading(true);
            setFilteredProducts(products);
            setLoading(false);
        }
    }, [products]);

    const handleFilter = (v, index = null, tags = null, q = null) => {
        setLoading(true);

        var fp = products;

        if (filterByShop.status) {
            fp = filterByShop.shop.products;
        }

        if (q) fp = searchQuery(fp, q);

        if (index !== null) {
            setActiveCategory(index === activeCategory ? null : index);
        }

        if (v.length)
            fp = fp.filter(
                product =>
                    getFinalPrice(product) >= v[0] &&
                    getFinalPrice(product) <= v[1]
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
        fp =
            (tags === null && !activeTags.length) || (tags && !tags.length)
                ? fp
                : fp.filter(product =>
                      product.tags
                          ? product.tags
                                .split(",")
                                .map(p => p.trim())
                                .some(t => {
                                    tags = tags === null ? activeTags : tags;
                                    return tags
                                        .map(tag => tag.toLowerCase())
                                        .includes(t.toLowerCase());
                                })
                          : false
                  );
        handleSortBy(sortBy, setSortBy, setFilteredProducts, fp);
        setTimeout(() => setLoading(false), 0);
    };

    const handleTagFilter = tag => {
        const tags = activeTags.includes(tag)
            ? activeTags.filter(t => t !== tag)
            : [...activeTags, tag];
        setActiveTags(tags);
        handleFilter(value, null, tags);
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
            <Breadcrumb
                crumbs={crumbs}
                margin="20px 0"
                customPageName={(() => {
                    if (query) return `Search Results for "${query.q}"`;
                    else if (filterByShop.status) return filterByShop.shop.name;
                    else return null;
                })()}
            />
            <Stack
                direction={{ base: "column", lg: "row" }}
                mt="50px"
                spacing={10}
            >
                <VStack alignItems="stretch" spacing={12} minW="25%">
                    <Box>
                        <Heading as="h6" fontSize="xl" mb="10px">
                            Categories
                        </Heading>
                        <hr className="line" />
                        <Divider borderColor="#66666663" />
                        <List spacing={3} mt="30px">
                            {categories.map(({ name, products }, index) => (
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
                                    onClick={() =>
                                        handleFilter(
                                            value,
                                            index,
                                            activeTags,
                                            query ? query.q : null
                                        )
                                    }
                                >
                                    <ListIcon as={ChevronRightIcon} />
                                    {name}{" "}
                                    {!query &&
                                        !filterByShop.status &&
                                        `(${products.length})`}
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
                            data={
                                filterByShop.status
                                    ? filterByShop.shop.products
                                    : products
                            }
                            setPriceRange={setValue}
                            handleFilter={handleFilter}
                            fontSize="medium"
                            margin="40px 0"
                        />
                    </Box>
                    {tags.length && (
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
                                        activeTags.includes(tag)
                                            ? "#fff"
                                            : "gray"
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
                    )}{" "}
                </VStack>
                <Box w="100%">
                    {filterByShop.status && (
                        <Box
                            w="100%"
                            h="400px"
                            bg={`url(${ShopImg}) no-repeat center center`}
                            bgSize="cover"
                            mb="30px"
                        >
                            <VStack
                                w={{ base: "100%", md: "40%", lg: "30%" }}
                                bgColor="rgba(0, 0, 0, 0.8)"
                                spacing={3}
                                h="100%"
                                justifyContent="center"
                                p="20px 10px"
                            >
                                <Avatar
                                    size="xl"
                                    name={filterByShop.shop.name}
                                    src={filterByShop.shop.logo}
                                    mb="10px"
                                />
                                <Heading as="h6" fontSize="lg" color="#fff">
                                    {filterByShop.shop.name}
                                </Heading>
                                <VStack
                                    mt="45px !important"
                                    spacing={2}
                                    alignItems="flex-start"
                                >
                                    <Text
                                        color="#fff"
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Icon as={FaLocationArrow} mr="10px" />{" "}
                                        {filterByShop.shop.street_no},{" "}
                                        {filterByShop.shop.city}
                                    </Text>
                                    <Text
                                        color="#fff"
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Icon as={FaUser} mr="10px" />{" "}
                                        {filterByShop.shop.user.fullname}
                                    </Text>
                                    <Text
                                        color="#fff"
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Icon as={FaEnvelope} mr="10px" />{" "}
                                        {filterByShop.shop.user.email}
                                    </Text>
                                    <Text
                                        color="#fff"
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Icon as={FaPhone} mr="10px" />{" "}
                                        {filterByShop.shop.user.phone}
                                    </Text>
                                </VStack>
                            </VStack>
                        </Box>
                    )}
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
                                    ? `Showing all ${filteredProducts.length} ${
                                          query ? "result" : "item"
                                      }(s)`
                                    : `Showing ${pageIndex[0] + 1}-
                                ${
                                    pageIndex[1] >= filteredProducts.length
                                        ? filteredProducts.length
                                        : pageIndex[1]
                                } of ${filteredProducts.length} ${
                                          query ? "result" : "item"
                                      }(s)`}
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
