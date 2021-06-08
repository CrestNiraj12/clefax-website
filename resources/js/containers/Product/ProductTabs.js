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
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useMediaQuery } from "@chakra-ui/media-query";

const ProductTabs = ({ title }) => {
    const [value, setValue] = React.useState("");
    const [baseScreen] = useMediaQuery("(max-width:48em)");

    return (
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
                    <Text lineHeight="2">
                        Curabitur egestas malesuada volutpat. Nunc vel
                        vestibulum odio, ac pellentesque lacus. Pellentesque
                        dapibus nunc nec est imperdiet, a malesuada sem rutrum.
                        Sed quam odio, porta a finibus quis, sagittis aliquet
                        leo. Nunc ornare metus urna, eu luctus velit placerat
                        ut. Cras at porttitor lectus. Ut dapibus aliquam nibh,
                        in imperdiet libero tincidunt sit amet. Morbi sodales
                        fermentum nibh nec facilisis. Morbi pharetra varius
                        velit, eget varius libero finibus quis. Quisque auctor
                        varius lectus, lacinia rhoncus velit posuere vel. Cras
                        condimentum tincidunt urna, sed vehicula ipsum dapibus
                        et. Pellentesque pharetra ultrices varius. Sed viverra
                        nec purus ut ornare.
                    </Text>
                    <List spacing={5} my="15px">
                        <ListItem>
                            <ListIcon as={CheckIcon} color="secondary" />
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="secondary" />
                            Assumenda, quia temporibus eveniet a libero incidunt
                            suscipit
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="secondary" />
                            Quidem, ipsam illum quis sed voluptatum quae eum
                            fugit earum
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="secondary" />
                            Quidem, ipsam illum quis sed voluptatum quae eum
                            fugit earum
                        </ListItem>
                    </List>
                    <Text mb="15px" lineHeight="2">
                        Sed molestie orci sem, at semper est molestie ac.
                        Suspendisse cursus feugiat erat, eu posuere massa.
                        Nullam posuere nibh non eros lobortis tempus. Maecenas
                        dignissim elementum massa, vel accumsan urna elementum
                        in. Suspendisse at dui euismod, rhoncus eros non,
                        imperdiet ipsum. Vestibulum vehicula vel turpis et
                        vestibulum. Ut porta et ex maximus malesuada.
                    </Text>
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
                                BE THE FIRST TO REVIEW “{title}”
                            </Heading>
                            <Text color="gray">
                                Your email address will not be published.
                                Required fields are marked *
                            </Text>
                            <HStack alignItems="flex-end">
                                <Text color="gray">Your Rating</Text>
                                <ReactStars
                                    edit
                                    size={18}
                                    emptyIcon={<Icon as={FaRegStar} />}
                                    filledIcon={<Icon as={FaStar} />}
                                    halfIcon={<Icon as={FaStarHalfAlt} />}
                                />
                            </HStack>
                            <Textarea
                                h="150px"
                                borderRadius="0"
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                placeholder="Your review*"
                                size="lg"
                            />
                            <HStack w="100%">
                                <Input placeholder="Name*" borderRadius="0" />
                                <Input placeholder="Email*" borderRadius="0" />
                            </HStack>

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
                            Store Name: Rose Shara
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="secondary" />
                            Vendor: Rose Shara
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="secondary" />
                            ddress: NewYork, NewYork, NY, 12345
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="secondary" />
                            4.50 rating from 2 reviews
                        </ListItem>
                    </List>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default ProductTabs;
