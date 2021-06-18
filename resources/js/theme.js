import { extendTheme } from "@chakra-ui/react";
import "@fontsource/archivo";
import "@fontsource/archivo/300.css";
import "@fontsource/rubik/700.css";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

const theme = extendTheme({
    fonts: {
        heading: "Rubik",
        body: "Archivo"
    },
    colors: {
        primary: "#1b1b1b",
        secondary: "#ed1d24",
        gray: "#909090",
        darkgray: "#585555",
        "gray.100": "#EDF2F7",
        lightgray: "#ededed",
        yellow: "#D69E2E"
    },
    components: {
        Heading: {
            baseStyle: {
                textTransform: "uppercase"
            }
        },
        Text: {
            baseStyle: {
                letterSpacing: "0.5px"
            }
        },
        Button: {
            baseStyle: {
                borderRadius: 0,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                padding: "20px 30px",
                fontFamily: "Archivo",
                fontWeight: 300,
                padding: 0,
                "&:hover": {
                    bg: "secondary",
                    color: "#fff",
                    borderColor: "secondary"
                },
                "&:focus": {
                    boxShadow: "none"
                }
            }
        },
        Link: {
            baseStyle: {
                "&:hover": {
                    color: "secondary",
                    textDecoration: "none"
                },
                "&:focus": {
                    boxShadow: "none"
                }
            }
        },
        Steps
    }
});
export default theme;
