import { Box, IconButton } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import React from "react";
import { CSSTransition } from "react-transition-group";

const ScrollToTopButton = ({ condition }) => (
    <CSSTransition
        in={condition}
        appear={true}
        timeout={200}
        classNames="scroll-btn"
    >
        <Box pos="fixed" bottom="70px" right="50px" className="scroll-btn">
            <IconButton
                aria-label="Go to top"
                icon={<ChevronUpIcon color="#fff" fontSize="30px" />}
                bgColor="secondary"
                borderRadius="0"
                w="50px"
                h="50px"
                border="2px solid #fff"
                _hover={{
                    bgColor: "#c71016 !important",
                    border: "2px solid #fff"
                }}
                onClick={() => window.scrollTo(0, 0)}
            />
        </Box>
    </CSSTransition>
);

export default ScrollToTopButton;
