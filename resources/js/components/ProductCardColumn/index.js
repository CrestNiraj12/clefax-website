import React, { useState } from "react";

import ReactStars from "react-rating-stars-component";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import {
    Box,
    Image,
    Link,
    Flex,
    VStack,
    HStack,
    Heading,
    Skeleton,
    SkeletonText,
    Icon
} from "@chakra-ui/react";
import { CSSTransition } from "react-transition-group";
import { generateUrl, getAvgReviews } from "../../utilities";

const ProductCardColumn = ({
    product: { id, name, images, reviews, price, discount },
    hideRatings = false
}) => {
    const [src, setSrc] = useState(images[0]);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Box
            borderWidth="1px"
            borderColor="#e6e6e6"
            onMouseEnter={() => (images.length > 1 ? setSrc(images[1]) : null)}
            onMouseLeave={() => (images.length > 1 ? setSrc(images[0]) : null)}
            pos="relative"
        >
            {discount > 0 && (
                <Box
                    borderWidth="1px"
                    borderColor="secondary"
                    pos="absolute"
                    color="secondary"
                    w="60px"
                    textAlign="center"
                    top="25px"
                    left="20px"
                    zIndex="1"
                    pointerEvents="none"
                >
                    -{discount}%
                </Box>
            )}
            <Flex direction="column">
                <Link href={generateUrl(id, name)} pos="relative">
                    <CSSTransition
                        in={imageLoaded && src === images[0]}
                        classNames="container-load"
                        timeout={500}
                    >
                        <Image
                            src={src}
                            alt={name}
                            w="100%"
                            minH="22vw"
                            h={{ base: "400px", lg: "22vw" }}
                            outline="none"
                            objectFit="contain"
                            bg="#e6e6e6"
                            tabIndex="-1"
                            className="container-load"
                            _hover={{
                                boxShadow: "none"
                            }}
                            cursor="pointer"
                            onLoad={() => setImageLoaded(true)}
                        />
                    </CSSTransition>
                    <CSSTransition
                        in={imageLoaded && src === images[1]}
                        classNames="container-load"
                        timeout={500}
                        unmountOnExit
                    >
                        <Image
                            src={src}
                            alt={name}
                            w="100%"
                            minH="22vw"
                            pos="absolute"
                            top="0"
                            outline="none"
                            objectFit="contain"
                            bg="#e6e6e6"
                            tabIndex="-1"
                            className="container-load"
                            _hover={{
                                boxShadow: "none"
                            }}
                            cursor="pointer"
                            onLoad={() => setImageLoaded(true)}
                        />
                    </CSSTransition>
                    <CSSTransition
                        in={!imageLoaded}
                        classNames="container-load"
                        timeout={500}
                        unmountOnExit
                    >
                        <Skeleton
                            width="150px"
                            height="150px"
                            startColor="lightgray"
                            endColor="gray"
                            borderRadius="0"
                            className="container-load"
                            top={0}
                            pos="absolute"
                        />
                    </CSSTransition>
                </Link>

                <VStack spacing={4} align="stretch" py="30px" mx="20px">
                    {!hideRatings && (
                        <ReactStars
                            edit={false}
                            value={
                                reviews && reviews.length
                                    ? getAvgReviews(reviews)
                                    : 0
                            }
                            size={16}
                            emptyIcon={<Icon as={FaRegStar} />}
                            filledIcon={<Icon as={FaStar} />}
                            halfIcon={<Icon as={FaStarHalfAlt} />}
                        />
                    )}
                    <Link
                        href={generateUrl(id, name)}
                        _hover={{
                            color: "secondary",
                            textDecoration: "none"
                        }}
                    >
                        <Heading as="h4" fontSize="lg" fontWeight="500">
                            {name}
                        </Heading>
                    </Link>
                    <HStack spacing={2}>
                        {discount > 0 && (
                            <Heading
                                as="h2"
                                fontSize="lg"
                                color="gray"
                                textDecor="line-through"
                            >
                                £{price.toFixed(2)}
                            </Heading>
                        )}
                        <Heading as="h2" fontSize="lg" color="secondary">
                            £
                            {(discount > 0
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

export const SkeletonCardColumn = () => (
    <Box borderWidth="1px" borderColor="#e6e6e6">
        <Skeleton height="22vw" startColor="lightgray" endColor="gray" />
        <Box p="30px 40px">
            <SkeletonText
                mt="4"
                startColor="lightgray"
                endColor="gray"
                noOfLines={3}
                skeletonHeight="20px"
                spacing="4"
            />
        </Box>
    </Box>
);

export default ProductCardColumn;
