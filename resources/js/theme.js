import { extendTheme } from "@chakra-ui/react";
import "@fontsource/archivo";
import "@fontsource/archivo/300.css";
import "@fontsource/rubik/700.css";

const theme = extendTheme({
    fonts: {
        heading: "Rubik",
        body: "Archivo"
    },
    colors: {
        primary: "#1b1b1b",
        secondary: "#ed1d24",
        gray: "#909090",
        lightgray: "#ededed"
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
                "&:hover": {
                    bg: "secondary",
                    color: "#fff",
                    borderColor: "secondary"
                }
            }
        }
    }
});
export default theme;
