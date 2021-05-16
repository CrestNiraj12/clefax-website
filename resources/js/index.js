import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Main from "./Main";
import store from "./store";
import { ChakraProvider } from "@chakra-ui/react";

if (document.getElementById("content")) {
    ReactDOM.render(
        //<Provider store={store}>
        <Router>
            <ChakraProvider>
                <ScrollToTop>
                    <Main />
                </ScrollToTop>
            </ChakraProvider>
        </Router>,
        //</Provider>,
        document.getElementById("content")
    );
}
