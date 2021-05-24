import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Text
} from "@chakra-ui/react";
import React from "react";

const CollectionGrid = () => {
    return (
        <Grid
            h="48vw"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(8, 1fr)"
            gap={0}
            mb="100px"
        >
            <GridItem
                rowSpan={2}
                colSpan={4}
                bg="primary"
                className="gridItem"
                pos="relative"
            >
                <Box
                    className="gridItemImage"
                    bgImage="url(https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/02/banner2-8.jpg)"
                    w="100%"
                    h="100%"
                ></Box>
                <Flex
                    direction="column"
                    pos="absolute"
                    top="100px"
                    w="100%"
                    color="#fff"
                    paddingX="15%"
                    textAlign="center"
                    alignItems="center"
                >
                    <Heading
                        as="h1"
                        textTransform="uppercase"
                        letterSpacing="1.5px"
                        fontSize="3.8em"
                        p="5px 25px"
                        bg="primary"
                    >
                        Discover your <br />
                        <span style={{ fontSize: "3.2rem" }}>
                            favourite item
                        </span>
                    </Heading>
                    <Button variant="outline" className="outlineButton">
                        Discover now
                    </Button>
                </Flex>
            </GridItem>
            <GridItem colSpan={2} bg="papayawhip" className="gridItem">
                <Box
                    className="gridItemImage"
                    bgImage="url(https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/12/banner2-2.jpg)"
                    w="100%"
                    h="100%"
                ></Box>
            </GridItem>
            <GridItem colSpan={2} bg="lightgray" className="gridItem">
                <Flex className="grid-flex">
                    <Text className="subheading">Joystick Design 2020</Text>
                    <Heading className="gridHeadingMd">
                        Creation Conquered
                    </Heading>
                    <Button variant="outline" className="outlineButton">
                        Shop collection
                    </Button>
                </Flex>
            </GridItem>
            <GridItem colSpan={2} bg="primary" className="gridItem">
                <Flex className="grid-flex" color="#fff">
                    <Text className="subheading">Best Brand 2020</Text>
                    <Heading className="gridHeadingMd">Surround Sound</Heading>
                    <Button variant="outline" className="outlineButton">
                        Shop collection
                    </Button>
                </Flex>
            </GridItem>
            <GridItem colSpan={2} bg="primary" className="gridItem">
                <Box
                    className="gridItemImage"
                    bgImage="url(https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/02/banner2-9.jpg)"
                    w="100%"
                    h="100%"
                ></Box>
            </GridItem>
        </Grid>
    );
};

export default CollectionGrid;
