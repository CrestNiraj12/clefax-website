import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    List,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
} from "@chakra-ui/react";
import React, { useState } from "react";

const categories = ["Featured Products", "Audio & Home", "Camera & Photo"];

const sortingOptions = [
    "Default sorting",
    "Sort by popularity",
    "Sort by average rating",
    "Sort by newest",
    "Sort by price:low to high",
    "Sort by price:high to low",
];

const Featured = () => {
    const [sortBy, setSortBy] = useState(0);

    return (
        <Box m="50px 20px">
            <Flex>
                <Heading as="h1">All Products</Heading>
                <Spacer />
                <Menu>
                    <MenuButton
                        as={Button}
                        variant="outline"
                        aria-label="Sort"
                        className="optionBtn"
                    >
                        {sortingOptions[sortBy]}
                    </MenuButton>
                    <MenuList>
                        {sortingOptions.map((option, index) => (
                            <MenuItem
                                minH="48px"
                                key={index}
                                onClick={() => setSortBy(index)}
                            >
                                <span>{option}</span>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
                <Button variant="outline" className="optionBtn">
                    Filter
                </Button>
            </Flex>
            <Box
                marginY="30px"
                borderWidth="1px"
                borderStyle="solid"
                borderColor="gray"
                p="50px"
            >
                <Flex>
                    <Box>
                        <Heading as="h6" fontSize="20px">
                            Choose Categories
                        </Heading>
                        <List mt="20px">
                            {categories.map((category, index) => (
                                <ListItem key={index}>
                                    <Checkbox size="md" colorScheme="black">
                                        {category}
                                    </Checkbox>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default Featured;
