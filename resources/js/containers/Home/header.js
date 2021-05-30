import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const carousel = [
    {
        title: "Headphone",
        subtitle: "Google Technology",
        image:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img1.png",
        button_url: "#"
    },
    {
        title: "Airpods",
        subtitle: "Google Technology",
        image:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img2-1.png",
        button_url: "#"
    },
    {
        title: "Smartphone",
        subtitle: "Apple Technology",
        image:
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2020/01/img3-1.png",
        button_url: "#"
    }
];

const Header = () => {
    var history = useHistory();
    const [changed, setChanged] = useState(true);

    return (
        <CSSTransition in appear={true} timeout={1000} classNames="header">
            <Box h={["100vh", "46vw"]}>
                <Carousel
                    ssr
                    infinite
                    autoPlay={true}
                    autoPlaySpeed={7000}
                    beforeChange={() => setChanged(false)}
                    afterChange={() => setChanged(true)}
                    customTransition="all 0.5s ease-in"
                    responsive={responsive}
                    draggable={false}
                    swipeable={false}
                    keyBoardControl
                    containerClass="carousel"
                    customLeftArrow={<PrevArrow />}
                    customRightArrow={<NextArrow />}
                >
                    {carousel.map(
                        ({ title, subtitle, image, button_url }, index) => (
                            <div key={index}>
                                <Box
                                    w="100%"
                                    key={index}
                                    display="flex"
                                    justifyContent="center"
                                    pos="relative"
                                    alignItems="center"
                                >
                                    <Stack
                                        spacing={2}
                                        pos="absolute"
                                        overflow="hidden"
                                        mt="-50px"
                                    >
                                        <CSSTransition
                                            in={changed}
                                            appear={true}
                                            timeout={1000}
                                            classNames="subtitle"
                                        >
                                            <Box
                                                overflow="hidden"
                                                className="subtitle"
                                            >
                                                <Text
                                                    color="white"
                                                    fontSize="xl"
                                                    pl="10px"
                                                >
                                                    {subtitle}
                                                </Text>
                                            </Box>
                                        </CSSTransition>

                                        <CSSTransition
                                            in={changed}
                                            appear={true}
                                            timeout={1500}
                                            classNames="title"
                                        >
                                            <Heading
                                                as="h1"
                                                color="white"
                                                size="4xl"
                                                fontSize="8vw"
                                                letterSpacing="25px"
                                                textTransform="uppercase"
                                                className="title"
                                            >
                                                {title}
                                            </Heading>
                                        </CSSTransition>
                                    </Stack>

                                    <Box w="35%" className="floatImage">
                                        <CSSTransition
                                            in={changed}
                                            appear={true}
                                            timeout={1000}
                                            classNames="headerImage"
                                        >
                                            <Image
                                                src={image}
                                                alt={title}
                                                className="headerImage"
                                                w="100%"
                                                h="100%"
                                            />
                                        </CSSTransition>
                                    </Box>
                                </Box>
                                <CSSTransition
                                    in={changed}
                                    appear={true}
                                    timeout={1000}
                                    classNames="headerBtn"
                                >
                                    <Button
                                        bg="white"
                                        pos="absolute"
                                        left="0"
                                        right="0"
                                        bottom={["-30px", "-50px", "-30px"]}
                                        zIndex="2"
                                        m="0 auto"
                                        className="headerBtn"
                                        fontSize={["12px", "8px", "12px"]}
                                        p={[
                                            "10px 30px",
                                            "0px 15px",
                                            "10px 30px"
                                        ]}
                                        onClick={() => history.push(button_url)}
                                    >
                                        Shop Collection
                                    </Button>
                                </CSSTransition>
                            </div>
                        )
                    )}
                </Carousel>
            </Box>
        </CSSTransition>
    );
};

const PrevArrow = props => {
    const { onClick } = props;
    return (
        <Box onClick={onClick} className="arrowContainer leftArrowContainer">
            <ArrowLeftIcon className="arrow leftArrow" />
        </Box>
    );
};

const NextArrow = props => {
    const { onClick } = props;
    return (
        <Box onClick={onClick} className="arrowContainer rightArrowContainer">
            <ArrowRightIcon className="arrow rightArrow" />
        </Box>
    );
};

export default Header;
