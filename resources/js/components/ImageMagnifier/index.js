import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Image } from "@chakra-ui/react";

const settings = {
    className: "slider",
    dots: true,
    speed: 500,
    slidesToShow: 1,
    swipeToSlide: false,
    slidesToScroll: 1
};

const ImageMagnifier = ({ images, title }) => {
    const customDots = i => <Image src={images[i]} alt={title} w="100%" />;
    return (
        <Slider customPaging={customDots} renderDotsOutside {...settings}>
            {images &&
                images.length &&
                images.map((image, index) => (
                    <Box key={index}>
                        <Image src={image} w="100%" />
                    </Box>
                ))}
        </Slider>
    );
};

export default ImageMagnifier;
