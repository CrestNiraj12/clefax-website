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
    IconButton,
    VStack,
    useDisclosure
} from "@chakra-ui/react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/tabs";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CheckIcon, DeleteIcon, EditIcon, Icon } from "@chakra-ui/icons";
import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";
import { useMediaQuery } from "@chakra-ui/media-query";
import { connect } from "react-redux";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Link,
    useToast
} from "@chakra-ui/react";
import { apiClient, getAvgReviews, getLoginRedirection } from "../../utilities";
import { Field, Form, Formik } from "formik";
import { validateReview } from "../../utilities/validation";
import { DEFAULT_TOAST } from "../../constants";
import RemoveModal from "../../components/RemoveModal";

const mapStateToProps = state => ({
    auth: state.auth
});

const ProductTabs = ({ product, auth }) => {
    const toast = useToast(DEFAULT_TOAST);
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
                        Reviews ({product.reviews.length})
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
                            <Box w={{ base: "100%", lg: "50%" }}>
                                <Heading as="h6" fontSize="xl" mb="20px">
                                    Reviews
                                </Heading>
                                <Box
                                    overflowY="auto"
                                    maxH="340px"
                                    className="scrollable"
                                    mr={{ base: "0px", md: "50px" }}
                                >
                                    {product.reviews.length ? (
                                        product.reviews
                                            .sort(
                                                (a, b) =>
                                                    new Date(b.created_at) -
                                                    new Date(a.created_at)
                                            )
                                            .map((review, id) => (
                                                <ReviewCard
                                                    key={id}
                                                    review={review}
                                                    auth={auth}
                                                    product_id={product.id}
                                                />
                                            ))
                                    ) : (
                                        <Text>There are no reviews yet.</Text>
                                    )}
                                </Box>
                            </Box>
                            <Spacer />
                            <VStack
                                spacing={5}
                                mt={{ base: "20px", md: "0" }}
                                alignItems="flex-start"
                                w={{ base: "100%", md: "50%" }}
                            >
                                <Heading as="h6" fontSize="xl">
                                    {`${
                                        product.reviews.length
                                            ? ""
                                            : "BE THE FIRST TO "
                                    }REVIEW “${product.name}”`}
                                </Heading>
                                <Text color="gray">
                                    Your email address will not be published.
                                    Required fields are marked *
                                </Text>
                                {auth.logged_in &&
                                auth.user.role === "Customer" ? (
                                    <Formik
                                        validate={validateReview}
                                        initialValues={{
                                            rating: 0,
                                            comment: "",
                                            product_id: product.id
                                        }}
                                        onSubmit={(values, actions) => {
                                            apiClient
                                                .get("/sanctum/csrf-cookie")
                                                .then(res =>
                                                    apiClient
                                                        .post(
                                                            "/api/review/create",
                                                            values
                                                        )
                                                        .then(res => {
                                                            toast({
                                                                title:
                                                                    "Review posted!",
                                                                description:
                                                                    res.data
                                                                        .message,
                                                                status:
                                                                    "success"
                                                            });
                                                            actions.setSubmitting(
                                                                false
                                                            );
                                                            window.location.reload();
                                                        })
                                                        .catch(err => {
                                                            console.log(
                                                                err.response
                                                            );
                                                            toast({
                                                                title:
                                                                    "Error while posting review",
                                                                description: err
                                                                    .response
                                                                    .data
                                                                    ? err
                                                                          .response
                                                                          .data
                                                                          .message
                                                                    : "Error occured! Please try again!",
                                                                status: "error"
                                                            });
                                                            actions.setSubmitting(
                                                                false
                                                            );
                                                        })
                                                )
                                                .catch(err => {
                                                    console.log(err.response);
                                                    toast({
                                                        title:
                                                            "Error while posting review",
                                                        description: err
                                                            .response.data
                                                            ? err.response.data
                                                                  .message
                                                            : "Error occured! Please try again!",
                                                        status: "error"
                                                    });
                                                    actions.setSubmitting(
                                                        false
                                                    );
                                                });
                                        }}
                                    >
                                        {props => (
                                            <Form style={{ width: "100%" }}>
                                                <Field name="rating">
                                                    {({ field, form }) => (
                                                        <FormControl
                                                            isInvalid={
                                                                form.errors
                                                                    .rating &&
                                                                form.touched
                                                                    .rating
                                                            }
                                                        >
                                                            <HStack alignItems="flex-end">
                                                                <FormLabel color="gray">
                                                                    Your Rating
                                                                </FormLabel>
                                                                <ReactStars
                                                                    edit
                                                                    value={
                                                                        props
                                                                            .values[
                                                                            "rating"
                                                                        ]
                                                                    }
                                                                    onChange={v =>
                                                                        form.setFieldValue(
                                                                            "rating",
                                                                            v
                                                                        )
                                                                    }
                                                                    size={18}
                                                                    emptyIcon={
                                                                        <Icon
                                                                            as={
                                                                                FaRegStar
                                                                            }
                                                                        />
                                                                    }
                                                                    filledIcon={
                                                                        <Icon
                                                                            as={
                                                                                FaStar
                                                                            }
                                                                        />
                                                                    }
                                                                    halfIcon={
                                                                        <Icon
                                                                            as={
                                                                                FaStarHalfAlt
                                                                            }
                                                                        />
                                                                    }
                                                                />
                                                            </HStack>
                                                            <FormErrorMessage>
                                                                {
                                                                    form.errors
                                                                        .rating
                                                                }
                                                            </FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="comment">
                                                    {({ field, form }) => (
                                                        <FormControl
                                                            isInvalid={
                                                                form.errors
                                                                    .comment &&
                                                                form.touched
                                                                    .comment
                                                            }
                                                        >
                                                            <Textarea
                                                                h="150px"
                                                                borderRadius="0"
                                                                {...field}
                                                                placeholder="Your review*"
                                                                size="md"
                                                            />
                                                            <FormErrorMessage>
                                                                {
                                                                    form.errors
                                                                        .comment
                                                                }
                                                            </FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Button
                                                    type="submit"
                                                    isLoading={
                                                        props.isSubmitting
                                                    }
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
                                            </Form>
                                        )}
                                    </Formik>
                                ) : (
                                    <Text>
                                        You need to be logged in{" "}
                                        {auth.logged_in && "as customer "}to be
                                        able to review the product. Please{" "}
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
                                    {getAvgReviews(product.reviews).toFixed(2)}{" "}
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

const ReviewCard = ({
    review: { id, rating, comment, user },
    auth,
    product_id
}) => {
    const toast = useToast(DEFAULT_TOAST);
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleShowUpdate = isShow => {
        if (user.id === auth.user.id) setShow(isShow);
    };

    const onSuccess = res => {
        toast({
            title: "Review deleted!",
            description: res.data.message,
            status: "success"
        });
        window.location.reload();
    };

    const onError = err => {
        console.log(err.response);
        toast({
            title: "Error while deleting review",
            description: err.response.data
                ? err.response.data.message
                : "Error occured! Please try again!",
            status: "error"
        });
    };

    return (
        <>
            <RemoveModal
                isOpen={isOpen}
                onClose={onClose}
                apiUrl={`/review/${id}`}
                title="Delete Review"
                words="the review?"
                onSuccess={onSuccess}
                onError={onError}
            />
            <HStack
                onMouseEnter={() => handleShowUpdate(true)}
                onMouseLeave={() => handleShowUpdate(false)}
                my="20px"
                pos="relative"
            >
                {show && !edit && (
                    <>
                        <IconButton
                            icon={
                                <EditIcon
                                    color="gray"
                                    _hover={{ color: "secondary" }}
                                />
                            }
                            onClick={() => setEdit(true)}
                            pos="absolute"
                            right="50px"
                            minW="0"
                            bg="transparent"
                            top="0"
                            p="0 !important"
                            _hover={{ bg: "transparent !important" }}
                        />
                        <IconButton
                            icon={
                                <DeleteIcon
                                    color="gray"
                                    _hover={{ color: "secondary" }}
                                />
                            }
                            p="0 !important"
                            minW="0"
                            pos="absolute"
                            right="20px"
                            bg="transparent"
                            top="0"
                            _hover={{ bg: "transparent !important" }}
                            onClick={onOpen}
                        />
                    </>
                )}
                <Image src={user.avatar} />
                <VStack alignItems="flex-start" w="80% !important">
                    <Text>
                        <b>{user.fullname}</b>
                    </Text>
                    {!edit ? (
                        <>
                            <ReactStars
                                edit={false}
                                size={18}
                                emptyIcon={<Icon as={FaRegStar} />}
                                filledIcon={<Icon as={FaStar} />}
                                halfIcon={<Icon as={FaStarHalfAlt} />}
                                value={rating}
                            />
                            <Text>{comment}</Text>
                        </>
                    ) : (
                        <Formik
                            validate={validateReview}
                            initialValues={{
                                rating,
                                comment,
                                product_id
                            }}
                            onSubmit={(values, actions) => {
                                console.log(values);
                                apiClient
                                    .get("/sanctum/csrf-cookie")
                                    .then(res =>
                                        apiClient
                                            .put(`/api/review/${id}`, values)
                                            .then(res => {
                                                toast({
                                                    title: "Review updated!",
                                                    description:
                                                        res.data.message,
                                                    status: "success"
                                                });
                                                actions.setSubmitting(false);
                                                window.location.reload();
                                            })
                                            .catch(err => {
                                                console.log(err.response);
                                                toast({
                                                    title:
                                                        "Error while updating review",
                                                    description: err.response
                                                        .data
                                                        ? err.response.data
                                                              .message
                                                        : "Error occured! Please try again!",
                                                    status: "error"
                                                });
                                                actions.setSubmitting(false);
                                            })
                                    )
                                    .catch(err => {
                                        console.log(err.response);
                                        toast({
                                            title:
                                                "Error while updating review",
                                            description: err.response.data
                                                ? err.response.data.message
                                                : "Error occured! Please try again!",
                                            status: "error"
                                        });
                                        actions.setSubmitting(false);
                                    });
                            }}
                        >
                            {props => (
                                <Form style={{ width: "100%" }}>
                                    <Field name="rating">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.rating &&
                                                    form.touched.rating
                                                }
                                            >
                                                <HStack alignItems="flex-end">
                                                    <FormLabel color="gray">
                                                        Your Rating
                                                    </FormLabel>
                                                    <ReactStars
                                                        edit
                                                        value={
                                                            props.values[
                                                                "rating"
                                                            ]
                                                        }
                                                        onChange={v =>
                                                            form.setFieldValue(
                                                                "rating",
                                                                v
                                                            )
                                                        }
                                                        size={18}
                                                        emptyIcon={
                                                            <Icon
                                                                as={FaRegStar}
                                                            />
                                                        }
                                                        filledIcon={
                                                            <Icon as={FaStar} />
                                                        }
                                                        halfIcon={
                                                            <Icon
                                                                as={
                                                                    FaStarHalfAlt
                                                                }
                                                            />
                                                        }
                                                    />
                                                </HStack>
                                                <FormErrorMessage>
                                                    {form.errors.rating}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="comment">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.comment &&
                                                    form.touched.comment
                                                }
                                            >
                                                <Textarea
                                                    h="150px"
                                                    borderRadius="0"
                                                    {...field}
                                                    placeholder="Your review*"
                                                    size="md"
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.comment}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Button
                                        type="submit"
                                        isLoading={props.isSubmitting}
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
                                </Form>
                            )}
                        </Formik>
                    )}
                </VStack>
            </HStack>
        </>
    );
};

export default connect(mapStateToProps)(ProductTabs);
