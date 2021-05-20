import { extendTheme } from "@chakra-ui/react";
import "@fontsource/lato";

const theme = extendTheme({
    fonts: {
        heading: "Rubik",
        body: "Lato",
    },
    colors: {
        primary: "#1b1b1b",
        secondary: "#ed1d24",
        gray: "#909090",
        lightgray: "#ededed",
    },
    components: {
        Button: {
            baseStyle: {
                borderRadius: 0,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                padding: "20px 30px",
                fontFamily: "Lato",
                fontWeight: 500,
                "&:hover": {
                    bg: "secondary",
                    color: "#fff",
                    borderColor: "secondary",
                },
            },
        },
    },
});
export default theme;
