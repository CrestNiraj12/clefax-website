import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import React from "react";
import { getFinalPrice } from "../../utilities";

const sortingOptions = [
    "Default sorting",
    "Sort by average rating",
    "Sort by newest",
    "Sort by price: low to high",
    "Sort by price: high to low"
];

const Sorter = ({ sortBy, setSortBy, setProducts, products, setLoading }) => {
    return (
        <Menu>
            <MenuButton
                as={Button}
                variant="outline"
                aria-label="Sort"
                className="optionBtn"
                mr="20px"
                p="0px 10px"
                rightIcon={<ChevronDownIcon />}
            >
                {sortingOptions[sortBy]}
            </MenuButton>
            <MenuList>
                {sortingOptions.map((option, index) => (
                    <MenuItem
                        key={index}
                        _hover={{
                            color: "var(--chakra-colors-secondary) !important"
                        }}
                        onClick={() => {
                            if (setLoading) setLoading(true);
                            handleSortBy(
                                index,
                                setSortBy,
                                setProducts,
                                products
                            );
                            if (setLoading)
                                setTimeout(() => setLoading(false), 0);
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

export default Sorter;

export const handleSortBy = (index, setSortBy, setFilteredProducts, p) => {
    setSortBy(index);
    var fp = [];
    if (index === 0)
        fp = p.sort((a, b) =>
            a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
        );
    else if (index === 1) fp = p.sort((a, b) => b.rating - a.rating);
    else if (index === 2)
        fp = p.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    else if (index === 3)
        fp = p.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
    else if (index === 4)
        fp = p.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
    setFilteredProducts(fp);
};
