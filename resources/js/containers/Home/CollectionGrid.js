import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Link,
    Text
} from "@chakra-ui/react";
import React from "react";
import Lamb from "../../../images/lamb-dark.png";
import Deli from "../../../images/deli.png";
import Cake from "../../../images/cake.png";
import { useHistory } from "react-router-dom";

const CollectionGrid = () => {
    const history = useHistory();

    return (
        <Grid
            h={{ base: "150vh", md: "300vh", lg: "48vw" }}
            templateRows={{ md: "repeat(6, 1fr)", lg: "repeat(2, 1fr)" }}
            templateColumns={{ md: "repeat(4, 1fr)", lg: "repeat(8, 1fr)" }}
            gap={0}
            mb="100px"
        >
            <GridItem
                rowSpan={{ base: 5, md: 2, lg: 2 }}
                colSpan={{ base: 4, md: 4, lg: 4 }}
                bg="primary"
                className="gridItem"
                pos="relative"
            >
                <Box
                    className="gridItemImage"
                    bg={`url(${Lamb}) no-repeat center center`}
                    bgColor="#3b3b3b"
                    bgBlendMode="overlay"
                    bgSize="cover"
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
                        fontSize={{
                            base: "1.5em",
                            sm: "2em",
                            md: "4em",
                            lg: "2.8em",
                            xl: "3.2em"
                        }}
                        p="5px 25px"
                        bg="primary"
                    >
                        Discover your <br />
                        <span
                            fontSize={{
                                base: "3em",
                                md: "4em",
                                lg: "2.8em"
                            }}
                        >
                            favourite item
                        </span>
                    </Heading>
                    <Button
                        variant="outline"
                        className="outlineButton"
                        onClick={() => history.push("/shop")}
                    >
                        Discover now
                    </Button>
                </Flex>
            </GridItem>
            <GridItem
                rowSpan={{ base: 1, md: 2, lg: 1 }}
                colSpan={2}
                bg="papayawhip"
                className="gridItem"
            >
                <Link href="/shop/search/?q=&cat=Meat">
                    <Box
                        className="gridItemImage"
                        bg={`url(${Deli}) no-repeat center center`}
                        bgSize="cover"
                        w="100%"
                        h="100%"
                    ></Box>
                </Link>
            </GridItem>
            <GridItem colSpan={2} bg="lightgray" className="gridItem">
                <Flex className="grid-flex">
                    <Text className="subheading">Organic Local Vegetables</Text>
                    <Heading className="gridHeadingMd">Fresh Veggies</Heading>
                    <Button
                        variant="outline"
                        className="outlineButton"
                        onClick={() =>
                            history.push("/shop/search/?q=&cat=Vegetables")
                        }
                    >
                        Shop collection
                    </Button>
                </Flex>
            </GridItem>
            <GridItem colSpan={2} bg="primary" className="gridItem">
                <Flex className="grid-flex" color="#fff">
                    <Text className="subheading">Local Dairy Products</Text>
                    <Heading className="gridHeadingMd">Organic Cheese</Heading>
                    <Button
                        variant="outline"
                        className="outlineButton"
                        onClick={() =>
                            history.push("/shop/search/?q=&cat=Dairy")
                        }
                    >
                        Shop collection
                    </Button>
                </Flex>
            </GridItem>
            <GridItem
                rowSpan={{ base: 1, md: 2, lg: 2 }}
                colSpan={{ base: 2, md: 4, lg: 2 }}
                bg="primary"
                className="gridItem"
            >
                <Link href="/shop/search/?q=&cat=Bakery">
                    <Box
                        className="gridItemImage"
                        bg={`url(${Cake}) no-repeat center center`}
                        bgSize="cover"
                        w="100%"
                        h="100%"
                    ></Box>
                </Link>
            </GridItem>
        </Grid>
    );
};

export default CollectionGrid;
