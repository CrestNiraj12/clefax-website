import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router";
import Cake from "../../../images/cake-bg.png";
import Fruits from "../../../images/fruits.png";
import Meat from "../../../images/meat.png";

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
        title: "Meat",
        subtitle: "Fresh meats of all kind",
        image: Meat,
        button_url: "/shop/search/?q=&cat=Meat"
    },
    {
        title: "Cakes",
        subtitle: "Baked just for you",
        image: Cake,
        button_url: "/shop/search/?q=Cake&cat=Bakery"
    },
    {
        title: "Fruits",
        subtitle: "Fresh organic fruits",
        image: Fruits,
        button_url: "/shop/search/?q=&cat=Fruits"
    }
];

const Header = () => {
    var history = useHistory();
    const [changed, setChanged] = useState(true);

    return (
        <CSSTransition in appear={true} timeout={1000} classNames="header">
            <Box h={{ base: "100vh", sm: "60vw", md: "50vw" }}>
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
                                                    fontSize={{
                                                        base: "sm",
                                                        sm: "xl"
                                                    }}
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
                                                fontSize={{
                                                    base: "40px",
                                                    md: "8vw"
                                                }}
                                                letterSpacing={{
                                                    base: "5px",
                                                    sm: "15px",
                                                    md: "25px"
                                                }}
                                                textTransform="uppercase"
                                                className="title"
                                            >
                                                {title}
                                            </Heading>
                                        </CSSTransition>
                                    </Stack>

                                    <Box
                                        w={{ base: "50%", sm: "35%" }}
                                        display="flex"
                                        justifyContent="center"
                                        className="floatImage"
                                        zIndex="-1"
                                    >
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
                                                w={{
                                                    base: "250px",
                                                    sm: "30vw"
                                                }}
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
                                        bottom={{ base: "-120px", sm: "-50px" }}
                                        zIndex="2"
                                        m="0 auto"
                                        className="headerBtn"
                                        fontSize={{ base: "12px", md: "10px" }}
                                        p={{
                                            base: "10px 20px !important",
                                            md: "0px 15px !important",
                                            lg: "10px 20px !important"
                                        }}
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
