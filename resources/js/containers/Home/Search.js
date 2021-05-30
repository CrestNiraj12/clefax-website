import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    VStack
} from "@chakra-ui/react";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { CSSTransition } from "react-transition-group";

const mapStateToProps = state => ({
    products: state.products
});

const Search = ({ showSearch, setShowSearch, products }) => {
    var history = useHistory();
    const [query, setQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleSubmit = () => {
        if (query.length > 0) history.push("/shop/?q=" + query);
    };

    const handleKeyDown = event => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    const handleChange = e => {
        const q = e.target.value;
        setQuery(q);
        setFilteredProducts(products.filter(p => p.title.includes(q)));
    };

    return (
        <CSSTransition
            in={showSearch}
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
                    onClick={() => setShowSearch(false)}
                    pos="absolute"
                    right={10}
                    _hover={{ color: "var(--chakra-colors-secondary)" }}
                    top={10}
                />
                <Box w="100%">
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
                    <VStack>
                        {filteredProducts.map((product, index) => (
                            <ProductCard
                                product={product}
                                key={index + Date.now()}
                            />
                        ))}
                    </VStack>
                </Box>
            </Flex>
        </CSSTransition>
    );
};

export default connect(mapStateToProps)(Search);
