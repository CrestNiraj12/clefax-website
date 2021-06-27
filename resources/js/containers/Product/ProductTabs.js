import {
    Box,
    Flex,
    Heading,
    HStack,
    List,
    ListIcon,
    ListItem,
    Spacer,
    Text,
    VStack
} from "@chakra-ui/layout";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/tabs";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CheckIcon, Icon } from "@chakra-ui/icons";
import React from "react";
import ReactStars from "react-rating-stars-component";
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";
import { useMediaQuery } from "@chakra-ui/media-query";
import { connect } from "react-redux";
import { Link } from "@chakra-ui/react";
import { getLoginRedirection } from "../../utilities";

const mapStateToProps = state => ({
    auth: state.auth
});

const ProductTabs = ({ product, auth }) => {
    const [value, setValue] = React.useState("");
    const [baseScreen] = useMediaQuery("(max-width:48em)");

    return (
        product && (
            <Tabs
                orientation={baseScreen ? "vertical" : "horizontal"}
                variant="unstyled"
                w="100%"
                flexDir="column"
            >
                <TabList justifyContent="center">
                    <Tab
                        className="product-tab"
                        _selected={{
                            color: "secondary"
                        }}
                    >
                        Description
                    </Tab>
                    <Tab
                        className="product-tab"
                        _selected={{
                            color: "secondary"
                        }}
                    >
                        Reviews (0)
                    </Tab>
                    <Tab
                        className="product-tab"
                        _selected={{
                            color: "secondary"
                        }}
                    >
                        Vendor info
                    </Tab>
                </TabList>
                <TabPanels mt="30px">
                    <TabPanel>
                        <Text lineHeight="2">{product.description}</Text>
                        <Heading as="h6" fontSize="lg" my="20px">
                            Allergy Information
                        </Heading>
                        <Text>{product.allergy_information}</Text>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction={{ base: "column", md: "row" }}>
                            <Box>
                                <Heading as="h6" fontSize="xl" mb="20px">
                                    Reviews
                                </Heading>
                                <Text>There are no reviews yet.</Text>
                            </Box>
                            <Spacer />
                            <VStack
                                spacing={5}
                                mt={{ base: "20px", md: "0" }}
                                alignItems="flex-start"
                                w={{ base: "100%", md: "50%" }}
                            >
                                <Heading as="h6" fontSize="xl">
                                    BE THE FIRST TO REVIEW “{product.name}”
                                </Heading>
                                <Text color="gray">
                                    Your email address will not be published.
                                    Required fields are marked *
                                </Text>
                                {auth.logged_in ? (
                                    <>
                                        {" "}
                                        <HStack alignItems="flex-end">
                                            <Text color="gray">
                                                Your Rating
                                            </Text>
                                            <ReactStars
                                                edit
                                                size={18}
                                                emptyIcon={
                                                    <Icon as={FaRegStar} />
                                                }
                                                filledIcon={
                                                    <Icon as={FaStar} />
                                                }
                                                halfIcon={
                                                    <Icon as={FaStarHalfAlt} />
                                                }
                                            />
                                        </HStack>
                                        <Textarea
                                            h="150px"
                                            borderRadius="0"
                                            value={value}
                                            onChange={e =>
                                                setValue(e.target.value)
                                            }
                                            placeholder="Your review*"
                                            size="md"
                                        />
                                        <Button
                                            textTransform="uppercase"
                                            letterSpacing="1px"
                                            fontSize="medium"
                                            w="100%"
                                            backgroundColor="secondary"
                                            color="#fff"
                                            _hover={{
                                                opacity: 0.8
                                            }}
                                        >
                                            Submit
                                        </Button>
                                    </>
                                ) : (
                                    <Text>
                                        You need to be logged in to be able to
                                        review the product. Please{" "}
                                        <Link
                                            href={getLoginRedirection()}
                                            color="secondary"
                                            textDecor="underline"
                                            _hover={{
                                                color:
                                                    "var(--chakra-colors-primary) !important",
                                                textDecor:
                                                    "underline !important"
                                            }}
                                        >
                                            login here
                                        </Link>
                                        .
                                    </Text>
                                )}
                            </VStack>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Heading as="h6" fontSize="xl">
                            VENDOR INFORMATION
                        </Heading>
                        <List spacing={5} my="30px">
                            <ListItem>
                                <ListIcon as={CheckIcon} color="secondary" />
                                Shop Name: {product.shop.name}
                            </ListItem>
                            <ListItem>
                                <ListIcon as={CheckIcon} color="secondary" />
                                Trader: {product.shop.user.fullname}
                            </ListItem>
                            <ListItem>
                                <ListIcon as={CheckIcon} color="secondary" />
                                Address:{" "}
                                {`${product.shop.street_no}, ${product.shop.city}`}
                            </ListItem>
                            {product.reviews.length && (
                                <ListItem>
                                    <ListIcon
                                        as={CheckIcon}
                                        color="secondary"
                                    />
                                    {product.reviews.reduce(
                                        (r1, r2) => r1 + r2
                                    ) / product.reviews.length}{" "}
                                    rating from {product.reviews.length}{" "}
                                    review(s)
                                </ListItem>
                            )}
                        </List>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        )
    );
};

export default connect(mapStateToProps)(ProductTabs);
