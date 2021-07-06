import {
    Box,
    Stack,
    Spacer,
    Text,
    HStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Heading,
    Input,
    SimpleGrid,
    VStack,
    Avatar
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { SearchIcon } from "@chakra-ui/icons";
import { CSSTransition } from "react-transition-group";
import { handleSortBy } from "../../components/Sorter";
import { apiClient, searchQuery } from "../../utilities";
import Shop from "../../../images/shop.jpg";
import { useHistory } from "react-router-dom";

const sortingOptions = ["Most Recent", "Most Popular"];

const Vendors = ({ crumbs }) => {
    const [vendors, setVendors] = useState([]);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [selectedSortOption, setOption] = useState(0);
    const [query, setQuery] = useState("");
    const [showVendorSearch, setShowVendorSearch] = useState(false);

    useEffect(() => {
        apiClient
            .get("/api/shops")
            .then(res => {
                setVendors(res.data);
                handleSortBy(2, setOption, setFilteredVendors, res.data, 2);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSort = index => {
        setOption(index);
        if (index == 0)
            handleSortBy(2, setOption, setFilteredVendors, filteredVendors, 2);
        else
            handleSortBy(
                2,
                setOption,
                setFilteredVendors,
                filteredVendors,
                1,
                true
            );
    };

    const handleSearch = e => {
        const q = e.target.value;
        setQuery(q);

        const filtered = searchQuery(vendors, q);

        setFilteredVendors(q.length > 0 ? filtered : vendors);
    };

    return (
        <Box mx="20px" mb="100px">
            <Breadcrumb crumbs={crumbs} margin="20px 0" />
            <Stack
                direction={{ base: "column", md: "row" }}
                bg="white"
                boxShadow="0px 1px 10px 2px #ededed"
                p="20px !important"
                alignItems="center"
            >
                <Text color="darkgray">Total Shops: {vendors.length}</Text>
                <Spacer />
                <HStack spacing={5}>
                    <Button
                        leftIcon={<SearchIcon fontSize="sm" mr="5px" />}
                        fontSize="xs"
                        fontWeight="bold"
                        bg="secondary"
                        color="#fff"
                        px="20px !important"
                        onClick={() => setShowVendorSearch(!showVendorSearch)}
                    >
                        Search
                    </Button>
                    <HStack>
                        <Text color="darkgray">Sort by: </Text>
                        <Menu isLazy>
                            <MenuButton
                                as={Button}
                                fontSize="xs"
                                fontWeight="bold"
                                variant="outline"
                                color="darkgray"
                                borderColor="darkgray"
                                px="20px !important"
                                _hover={{
                                    bg: "transparent !important",
                                    color: "#000 !important",
                                    borderColor: "#000 !important"
                                }}
                            >
                                {sortingOptions[selectedSortOption]}
                            </MenuButton>
                            <MenuList>
                                {sortingOptions.map((option, index) => (
                                    <MenuItem
                                        color="gray"
                                        key={index}
                                        onClick={() => handleSort(index)}
                                    >
                                        {option}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </HStack>
                </HStack>
            </Stack>
            <CSSTransition
                in={showVendorSearch}
                timeout={250}
                classNames="vendorSearch"
                unmountOnExit
            >
                <Box
                    bg="white"
                    boxShadow="0px 1px 10px 2px #ededed"
                    p="20px"
                    alignItems="center"
                >
                    <Input
                        onChange={handleSearch}
                        value={query}
                        placeholder="Search Vendors"
                    />
                </Box>
            </CSSTransition>
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                columnGap={5}
                rowGap={5}
                mt="50px"
            >
                {filteredVendors.map((v, index) => (
                    <VendorColumn vendor={v} key={index} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

const VendorColumn = ({ vendor: { id, name, street_no, city, logo } }) => {
    var history = useHistory();

    return (
        <Box
            w="100%"
            h="200px"
            p="20px"
            bg={`url(${Shop}) no-repeat center center #515151`}
            bgBlendMode="multiply"
            bgSize="cover"
            display="flex"
            onClick={() => history.push(`/shop/products/?id=${id}`)}
            role="group"
        >
            <HStack spacing={5}>
                <Avatar size="lg" name={name} src={logo} />
                <VStack
                    alignItems="flex-start"
                    h="100%"
                    justifyContent="center"
                >
                    <Heading
                        as="h6"
                        fontSize="lg"
                        color="#fff"
                        _groupHover={{
                            cursor: "pointer",
                            color: "var(--chakra-colors-secondary) !important"
                        }}
                    >
                        {name}
                    </Heading>
                    <Text color="#fff" fontSize="xs">
                        {street_no}, {city}
                    </Text>
                </VStack>
            </HStack>
        </Box>
    );
};

export default Vendors;
