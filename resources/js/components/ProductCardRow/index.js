import React, { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import {
    Box,
    Flex,
    Heading,
    HStack,
    Icon,
    Image,
    Link,
    Skeleton,
    SkeletonText,
    VStack
} from "@chakra-ui/react";
import { CSSTransition } from "react-transition-group";
import { generateUrl, getAvgReviews } from "../../utilities";

const ProductCardRow = ({
    product: { id, name, images, reviews, price, discount }
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
            <Flex pos="relative">
                <Link href={generateUrl(id, name)} pos="relative">
                    <CSSTransition
                        in={imageLoaded && src === images[0]}
                        classNames="container-load"
                        timeout={500}
                    >
                        <Box h="150px" w="150px" className="container-load">
                            <Image
                                src={src}
                                alt={name}
                                w="100%"
                                h="100%"
                                objectFit="contain"
                                bg="#e6e6e6"
                                outline="none"
                                cursor="pointer"
                                tabIndex="-1"
                                _hover={{
                                    boxShadow: "none"
                                }}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </Box>
                    </CSSTransition>
                    <CSSTransition
                        in={imageLoaded && src === images[1]}
                        classNames="container-load"
                        timeout={500}
                        unmountOnExit
                    >
                        <Box
                            h="150px"
                            w="150px"
                            pos="absolute"
                            top="0"
                            className="container-load"
                        >
                            <Image
                                src={src}
                                alt={name}
                                w="100%"
                                h="100%"
                                objectFit="contain"
                                bg="#e6e6e6"
                                outline="none"
                                cursor="pointer"
                                tabIndex="-1"
                                _hover={{
                                    boxShadow: "none"
                                }}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </Box>
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
                <VStack
                    spacing={2}
                    align="stretch"
                    py="10px"
                    mx="20px"
                    justifyContent="center"
                >
                    <ReactStars
                        edit={false}
                        value={
                            reviews && reviews.length
                                ? getAvgReviews(reviews)
                                : 0
                        }
                        size={13}
                        emptyIcon={<Icon as={FaRegStar} />}
                        filledIcon={<Icon as={FaStar} />}
                        halfIcon={<Icon as={FaStarHalfAlt} />}
                    />
                    <Link
                        href={generateUrl(id, name)}
                        _hover={{
                            color: "secondary",
                            textDecoration: "none"
                        }}
                    >
                        <Heading as="h4" fontSize="1.1rem" fontWeight="500">
                            {name}
                        </Heading>
                    </Link>
                    <HStack spacing={2}>
                        {discount && discount > 0 && (
                            <Heading
                                as="h2"
                                fontSize="md"
                                color="gray"
                                textDecor="line-through"
                            >
                                £{price.toFixed(2)}
                            </Heading>
                        )}
                        <Heading as="h2" fontSize="md" color="secondary">
                            £
                            {(discount && discount > 0
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

export const SkeletonCardRow = () => (
    <Flex borderWidth="1px" borderColor="#e6e6e6">
        <Skeleton
            width="220px"
            height="150px"
            startColor="lightgray"
            endColor="gray"
            borderRadius="0"
        />
        <Box p="10px 20px" width="100%">
            <SkeletonText
                mt="7"
                width="100px"
                startColor="lightgray"
                endColor="gray"
                noOfLines={1}
                skeletonHeight="18px"
            />
            <SkeletonText
                width="100%"
                startColor="lightgray"
                endColor="gray"
                noOfLines={2}
                mt="2"
                skeletonHeight="20px"
                spacing="2"
            />
        </Box>
    </Flex>
);

export default ProductCardRow;
