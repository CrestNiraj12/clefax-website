import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import {
    setPage,
    setProducts,
    setCategories,
    setAuth,
    setCartProducts,
    setWishlistProducts,
    setSlots
} from "./actions";
import routes from "./routes";
import { useMediaQuery } from "@chakra-ui/media-query";
import Navbar from "./components/Navbar";
import { HOME_PAGE } from "./constants";
import Search from "./components/Search";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ForgotPassword from "./containers/ForgotPassword";
import TraderSignup from "./containers/TraderSignup";
import { apiClient } from "./utilities";
import PaymentRedirect from "./containers/PaymentRedirect";
import EmailVerification from "./containers/EmailVerification";
import EmailVerificationRequest from "./containers/EmailVerificationRequest";
import PasswordReset from "./containers/PasswordReset";

const mapDispatchToProps = dispatch => ({
    setProducts: products => dispatch(setProducts(products)),
    setPage: page => dispatch(setPage(page)),
    setCategories: category => dispatch(setCategories(category)),
    setAuth: auth => dispatch(setAuth(auth)),
    setCartProducts: cart => dispatch(setCartProducts(cart)),
    setWishlistProducts: wishlist => dispatch(setWishlistProducts(wishlist)),
    setSlots: slots => dispatch(setSlots(slots))
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
    setAuth,
    setCartProducts,
    setWishlistProducts,
    setSlots
}) => {
    const location = useLocation();
    const [desktop] = useMediaQuery("(min-width: 1100px)");
    const [showScrollBtn, setShowScrollBtn] = useState(false);

    useEffect(() => {
        setPage(window.location.pathname === "/" ? HOME_PAGE : "");
    }, [location]);

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

    useEffect(() => {
        if (localStorage.getItem("user")) {
            if (
                localStorage.getItem("auth") &&
                localStorage.getItem("auth") === "true"
            ) {
                setAuth({
                    logged_in: true,
                    user: JSON.parse(localStorage.getItem("user"))
                });
            } else
                setAuth({
                    logged_in: false,
                    user: JSON.parse(localStorage.getItem("user"))
                });
        } else setAuth({ logged_in: false, user: null });
    }, []);

    useEffect(() => {
        axios
            .get("/api/products")
            .then(res => {
                setProducts(res.data);
                if (
                    localStorage.getItem("auth") &&
                    localStorage.getItem("auth") === "true" &&
                    localStorage.getItem("user")
                )
                    apiClient
                        .get("/sanctum/csrf-cookie")
                        .then(res =>
                            apiClient
                                .get("/api/wishlist")
                                .then(res => {
                                    setWishlistProducts([
                                        ...new Set(
                                            res.data.map(p => p.product_id)
                                        )
                                    ]);

                                    apiClient
                                        .get("/api/cart")
                                        .then(res => {
                                            setCartProducts(
                                                res.data.map(details => {
                                                    return {
                                                        product_id:
                                                            details.product_id,
                                                        qty: details.qty,
                                                        subtotal:
                                                            details.subtotal
                                                    };
                                                })
                                            );
                                        })
                                        .catch(err => console.log(err));
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        )
                        .catch(err => {
                            console.log(err.response);
                        });
                else {
                    if (localStorage.getItem("wishlist")) {
                        const ps = JSON.parse(localStorage.getItem("wishlist"));
                        setWishlistProducts(ps);
                    }
                    if (localStorage.getItem("cart")) {
                        const stored = JSON.parse(localStorage.getItem("cart"));
                        setCartProducts(stored);
                    }
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (
            localStorage.getItem("auth") &&
            localStorage.getItem("auth") === "true" &&
            localStorage.getItem("user")
        )
            apiClient
                .get("/sanctum/csrf-cookie")
                .then(res =>
                    apiClient
                        .get("/api/slots")
                        .then(res => {
                            const formattedSlots = [];
                            if (res.data.length > 0)
                                res.data.map(s => {
                                    formattedSlots.push({
                                        ...s,
                                        times: s.times,
                                        days: s.days
                                            .split(",")
                                            .map(t => Number(t.trim()))
                                    });
                                });
                            setSlots(formattedSlots);
                        })
                        .catch(err => {
                            console.log(err.response);
                        })
                )
                .catch(err => console.log(err));
    });

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
                <Route
                    path="/verify-email"
                    component={EmailVerificationRequest}
                    exact
                />
                <Route path="/user/verify" component={EmailVerification} />
                <Route path="/user/reset" component={PasswordReset} />
                <Route path="/redirect" component={PaymentRedirect} />
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
