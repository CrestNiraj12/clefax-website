import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { setPage, setProducts, setCategories } from "./actions";
import routes from "./routes";
import { useMediaQuery } from "@chakra-ui/media-query";
import Navbar from "./components/Navbar";
import { HOME_PAGE } from "./constants";
import Search from "./components/Search";
import Cookies from "../images/cookies.png";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ForgotPassword from "./containers/ForgotPassword";
import TraderSignup from "./containers/TraderSignup";

const mapDispatchToProps = dispatch => ({
    setProducts: products => dispatch(setProducts(products)),
    setPage: page => dispatch(setPage(page)),
    setCategories: category => dispatch(setCategories(category))
});

const mapStateToProps = state => ({
    page: state.page,
    showSearch: state.showSearch
});

const products = [
    {
        title: "Cookies",
        images: [
            Cookies,
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 4,
        url: "/shop/product-title-1",
        price: 46.0,
        discount: 25,
        category: "Hello & Mellow",
        tags: ["meat", "poultry"],
        created_at: "2021/01/01"
    },
    {
        id: 1,
        title: "Cookies",
        images: [
            Cookies,
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-23.jpg"
        ],
        rating: 0,
        url: "/shop/product-title-1",
        price: 100.0,
        discount: 13,
        category: "Audio & Home",
        tags: ["meat", "lamb"],
        created_at: "2022/01/01"
    },
    {
        id: 1,
        title: "Cookies",
        images: [
            Cookies,
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 2,
        url: "/shop/product-title-1",
        price: 46.0,
        discount: 13,
        category: "Hello & Mellow",
        tags: ["vegetables"],
        created_at: "2021/01/01"
    },
    {
        id: 1,
        title: "Cookies",
        images: [
            Cookies,
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 4,
        url: "/shop/product-title-1",
        price: 46.0,
        category: "Hello & Mellow",
        tags: ["vegetables"],
        created_at: "2021/02/01"
    },
    {
        id: 1,
        title: "Cookies",
        images: [
            Cookies,
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 3.86,
        url: "/shop/product-title-1",
        price: 46.0,
        category: "Hello & Mellow",
        tags: ["meat"],
        created_at: "2021/01/01"
    },
    {
        id: 1,
        title: "Cookies",
        images: [
            Cookies,
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 4,
        url: "/shop/product-title-1",
        price: 46.0,
        discount: 13,
        category: "Hello & Mellow",
        tags: ["cake"],
        created_at: "2021/01/01"
    },
    {
        id: 1,
        title: "Cookies",
        images: [
            Cookies,
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 4,
        url: "/shop/product-title-1",
        price: 46.0,
        discount: 13,
        category: "Camera & Photo",
        tags: ["chocolate"],
        created_at: "2021/01/02"
    },
    {
        id: 1,
        title: "Cookies",
        images: [
            Cookies,
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 4,
        url: "/shop/product-title-1",
        price: 46.0,
        category: "Hello & Mellow",
        tags: ["vegetables"],
        created_at: "2021/01/01"
    }
];

const categories = [
    { title: "Hello & Mellow", products: [{ name: "hello" }] },
    { title: "Audio & Home", products: [{ name: "hello" }, { name: "hello" }] },
    {
        title: "Camera & Photo",
        products: [{ name: "hello" }, { name: "hello" }]
    }
];

const Main = ({ setProducts, setPage, page, showSearch, setCategories }) => {
    const location = useLocation();
    const [desktop] = useMediaQuery("(min-width: 1100px)");
    const [showScrollBtn, setShowScrollBtn] = useState(false);

    useEffect(() => {
        setPage(window.location.pathname === "/" ? HOME_PAGE : "");
    }, [location]);

    useEffect(() => {
        /*axios
            .get("/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));*/
        setProducts(products);
        setCategories(categories);
    }, []);

    useEffect(() => {
        window.onscroll = function(e) {
            if (window.scrollY >= 350) setShowScrollBtn(true);
            else if (window.scrollY < 800) setShowScrollBtn(false);
        };
    }, []);

    return (
        <>
            {showSearch && <Search />}
            {desktop && <ScrollToTopButton condition={showScrollBtn} />}

            <Switch>
                <Route path="/login" component={Login} exact />
                <Route path="/signup" component={Signup} exact />
                <Route
                    path="/forgot-password"
                    component={ForgotPassword}
                    exact
                />
                <Route path="/trader-signup" component={TraderSignup} exact />
                {routes.map(({ path, Component, exact }) => (
                    <Route
                        exact={exact}
                        key={location.pathname}
                        path={path}
                        render={props => {
                            const crumbs = routes
                                .filter(({ path }) =>
                                    props.match.path.includes(path)
                                )
                                .map(({ path, ...rest }) => ({
                                    path: Object.keys(props.match.params).length
                                        ? Object.keys(
                                              props.match.params
                                          ).reduce(
                                              (path, param) =>
                                                  path.replace(
                                                      `:${param}`,
                                                      props.match.params[param]
                                                  ),
                                              path
                                          )
                                        : path,
                                    ...rest
                                }));

                            return (
                                <>
                                    {page !== HOME_PAGE && <Navbar />}
                                    <Component {...props} crumbs={crumbs} />
                                    <Footer />
                                </>
                            );
                        }}
                    />
                ))}
            </Switch>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
