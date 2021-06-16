import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Spinner,
    StackDivider,
    VStack
} from "@chakra-ui/react";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { showSearch } from "../../actions";
import { CSSTransition } from "react-transition-group";
import ProductCardRowSmall from "../../components/ProductCardRowSmall";
import { searchQuery } from "../../utilities/index";

const mapStateToProps = state => ({
    products: state.products,
    search: state.showSearch
});

const mapDispatchToProps = dispatch => ({
    setShowSearch: show => dispatch(showSearch(show))
});

const Search = ({ search, setShowSearch, products }) => {
    var history = useHistory();
    const [query, setQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (query.length > 0) window.location = "/shop/search/?q=" + query;
    };

    const handleKeyDown = event => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    const handleChange = e => {
        setLoading(true);
        const q = e.target.value;
        setQuery(q);

        const filtered = searchQuery(products, q);
        setFilteredProducts(q.length > 0 ? filtered : []);
        setTimeout(() => setLoading(false), 0);
    };

    const handleClose = () => {
        setQuery("");
        setShowSearch(false);
    };

    return (
        <CSSTransition
            in={search}
            appear={true}
            timeout={500}
            classNames="search"
        >
            <Flex
                pos="fixed"
                w="100%"
                h="100%"
                className="search"
                justifyContent="center"
                alignItems="center"
                zIndex={1001}
                backgroundColor="blackAlpha.800"
                paddingX="12%"
            >
                <CloseIcon
                    w="25px"
                    h="25px"
                    cursor="pointer"
                    color="#fff"
                    onClick={handleClose}
                    pos="absolute"
                    right={10}
                    _hover={{ color: "var(--chakra-colors-secondary)" }}
                    top={10}
                />
                <Box w="100%" pos="relative">
                    <InputGroup>
                        <Input
                            variant="flushed"
                            placeholder="Search"
                            size="lg"
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            color="#fff"
                        />
                        <InputRightElement
                            onClick={handleSubmit}
                            children={
                                <SearchIcon
                                    color="#fff"
                                    w="20px"
                                    h="20px"
                                    cursor="pointer"
                                    _hover={{
                                        color: "var(--chakra-colors-secondary)"
                                    }}
                                />
                            }
                        />
                    </InputGroup>
                    {filteredProducts && filteredProducts.length > 0 && (
                        <VStack
                            bgColor="#fff"
                            pos="absolute"
                            overflowY="scroll"
                            w="100%"
                            maxH="300px"
                            p="20px 30px"
                            spacing={5}
                            className="scrollable"
                            alignItems={loading ? "center" : "flex-start"}
                            divider={<StackDivider borderColor="gray.200" />}
                        >
                            {loading ? (
                                <Spinner color="secondary" />
                            ) : (
                                filteredProducts.map((product, index) => (
                                    <ProductCardRowSmall
                                        product={product}
                                        query={query}
                                        key={index + Date.now()}
                                    />
                                ))
                            )}
                        </VStack>
                    )}
                </Box>
            </Flex>
        </CSSTransition>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
