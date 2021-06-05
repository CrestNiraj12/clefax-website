import { Box, Heading, HStack, Image, Link, VStack } from "@chakra-ui/react";
import React from "react";

const ProductCardRowSmall = ({
    product: { title, url, images, discount, price }
}) => {
    return (
        <HStack pos="relative" spacing={5} marginLeft="20px">
            <Link href={url}>
                <Box h="80px" w="80px">
                    <Image
                        src={images[0]}
                        alt={title}
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
                    />
                </Box>
            </Link>
            <VStack
                spacing={2}
                align="stretch"
                p="5px 10px"
                justifyContent="center"
            >
                <Link
                    href={url}
                    _hover={{
                        color: "secondary",
                        textDecoration: "none"
                    }}
                >
                    <Heading as="h6" fontSize="1rem" fontWeight="500">
                        {title}
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
        </HStack>
    );
};

export default ProductCardRowSmall;
