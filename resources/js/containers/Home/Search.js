import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Heading,
    HStack,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Spinner,
    StackDivider,
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
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (query.length > 0) history.push("/shop/?q=" + query);
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

        const filtered = products.filter(p =>
            q
                .split(" ")
                .some(word =>
                    p.title.toLowerCase().includes(word.toLowerCase())
                )
        );
        setFilteredProducts(q.length > 0 ? filtered : []);
        setTimeout(() => setLoading(false), 0);
    };

    const handleClose = () => {
        setQuery("");
        setShowSearch(false);
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
                                    <ProductCard
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

const ProductCard = ({ product: { title, url, images, discount, price } }) => {
    return (
        <Box>
            <Flex pos="relative">
                <Link href={url}>
                    <Box h="80px" w="80px">
                        <Image
                            src={images[0]}
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
                        />
                    </Box>
                </Link>
                <VStack
                    spacing={2}
                    align="stretch"
                    p="5px 10px"
                    justifyContent="center"
                >
                    <Link
                        href={url}
                        _hover={{
                            color: "secondary",
                            textDecoration: "none"
                        }}
                    >
                        <Heading as="h6" fontSize="0.8rem" fontWeight="500">
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

export default connect(mapStateToProps)(Search);
