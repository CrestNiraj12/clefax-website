import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { setPage, setProducts, setCategories, setAuth } from "./actions";
import routes from "./routes";
import { useMediaQuery } from "@chakra-ui/media-query";
import Navbar from "./components/Navbar";
import { HOME_PAGE } from "./constants";
import Search from "./components/Search";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ForgotPassword from "./containers/ForgotPassword";
import TraderSignup from "./containers/TraderSignup";

const mapDispatchToProps = dispatch => ({
    setProducts: products => dispatch(setProducts(products)),
    setPage: page => dispatch(setPage(page)),
    setCategories: category => dispatch(setCategories(category)),
    setAuth: auth => dispatch(setAuth(auth))
});

const mapStateToProps = state => ({
    page: state.page,
    showSearch: state.showSearch
});

const Main = ({
    setProducts,
    setPage,
    page,
    showSearch,
    setCategories,
    setAuth
}) => {
    const location = useLocation();

    const [desktop] = useMediaQuery("(min-width: 1100px)");
    const [showScrollBtn, setShowScrollBtn] = useState(false);

    useEffect(() => {
        setPage(window.location.pathname === "/" ? HOME_PAGE : "");
    }, [location]);

    useEffect(() => {
        setAuth(
            localStorage.getItem("user")
                ? {
                      logged_in: true,
                      user: JSON.parse(localStorage.getItem("user"))
                  }
                : { logged_in: false, user: null }
        );
    }, []);

    useEffect(() => {
        axios
            .get("/api/products")
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get("/api/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
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
