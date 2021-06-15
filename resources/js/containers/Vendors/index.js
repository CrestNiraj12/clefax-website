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
    Icon
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { SearchIcon } from "@chakra-ui/icons";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { CSSTransition } from "react-transition-group";
import { handleSortBy } from "../../components/Sorter";
import { searchQuery } from "../../utilities";

const vs = [
    {
        id: 1,
        name: "Tony Leonard",
        city: "San Francisco, CA 94110, United States",
        street_no: "60, 29th Street",
        PAN: "01202012010",
        logo:
            "https://image.freepik.com/free-vector/happy-shop-logo-template_57516-57.jpg",
        created_at: "2021/01/01"
    },
    {
        id: 1,
        name: "Peent Leonard",
        city: "San Francisco, CA 94110, United States",
        street_no: "60, 29th Street",
        PAN: "01202012010",
        logo:
            "https://i.pinimg.com/originals/c1/92/9d/c1929d3492c2f64ab65b43808c072043.jpg",
        created_at: "2022/01/05"
    },
    {
        id: 1,
        name: "Tony Leonard",
        city: "San Francisco, CA 94110, United States",
        street_no: "60, 29th Street",
        PAN: "01202012010",
        logo:
            "https://image.freepik.com/free-vector/happy-shop-logo-template_57516-57.jpg",
        created_at: "2021/10/01"
    },
    {
        id: 1,
        name: "Reent Leonard",
        city: "San Francisco, CA 94110, United States",
        street_no: "60, 29th Street",
        PAN: "01202012010",
        logo:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGZvbSzJpL1DAcs1qQMEa-GXnNa6g1EX02RA&usqp=CAU",
        created_at: "2121/01/01"
    },
    {
        id: 1,
        name: "Tony Leonard",
        city: "San Francisco, CA 94110, United States",
        street_no: "60, 29th Street",
        PAN: "01202012010",
        logo:
            "https://image.freepik.com/free-vector/happy-shop-logo-template_57516-57.jpg",
        created_at: "2021/01/21"
    },
    {
        id: 1,
        name: "Tony Leonard",
        city: "San Francisco, CA 94110, United States",
        street_no: "60, 29th Street",
        PAN: "01202012010",
        logo:
            "https://image.freepik.com/free-vector/happy-shop-logo-template_57516-57.jpg",
        created_at: "2021/01/30"
    }
];

const sortingOptions = ["Most Recent", "Most Popular"];

const Vendors = ({ crumbs }) => {
    const [vendors, setVendors] = useState([]);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [selectedSortOption, setOption] = useState(0);
    const [query, setQuery] = useState("");
    const [showVendorSearch, setShowVendorSearch] = useState(false);

    useEffect(() => {
        setVendors(vs);
        handleSortBy(2, setOption, setFilteredVendors, vs, 2);
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

        const filtered = searchQuery(vendors, q, "name");

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

const VendorColumn = ({ vendor: { name, street_no, city, logo, PAN } }) => {
    return (
        <Box
            w="100%"
            h="200px"
            p="20px"
            bg={`url(${logo}) no-repeat center center #515151`}
            bgBlendMode="multiply"
            bgSize="cover"
        >
            <VStack alignItems="flex-start" h="100%" justifyContent="center">
                <Heading as="h6" fontSize="lg" color="#fff">
                    {name}
                </Heading>
                <Text color="#fff" fontSize="xs">
                    {street_no}, {city}
                </Text>
                <Text color="#fff" fontSize="sm" color="lightgray">
                    PAN
                    <span>
                        <Icon as={HiOutlineDocumentSearch} />
                    </span>{" "}
                    : {PAN}
                </Text>
            </VStack>
        </Box>
    );
};

export default Vendors;
