import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Main from "./Main";
import store from "./store";

if (document.getElementById("content")) {
    ReactDOM.render(
        //<Provider store={store}>
        <Router>
            <ScrollToTop>
                <Main />
            </ScrollToTop>
        </Router>,
        //</Provider>,
        document.getElementById("content")
    );
}
