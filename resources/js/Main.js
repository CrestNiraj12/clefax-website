import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { setProducts } from "./actions";
import routes from "./routes";
import { useMediaQuery } from "@chakra-ui/media-query";

const mapDispatchToProps = dispatch => ({
    setProducts: products => dispatch(setProducts(products))
});

const products = [
    {
        title: "Headphone S102",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-11-720x720.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 4,
        url: "#",
        price: 46.0,
        discount: 25,
        categories: ["Hello & mellow"],
        created_at: "2021/01/01"
    },
    {
        title: "Bluetooth Speaker GK1",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-12.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-23.jpg"
        ],
        rating: 0,
        url: "#",
        price: 100.0,
        discount: 13,
        categories: ["Audio & Home"],
        created_at: "2022/01/01"
    },
    {
        title: "Headphone S102",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-11-720x720.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 2,
        url: "#",
        price: 46.0,
        discount: 13,
        categories: ["Hello & mellow"],
        created_at: "2021/01/01"
    },
    {
        title: "Headphone S102",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-11-720x720.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 4,
        url: "#",
        price: 46.0,
        categories: ["Hello & mellow"],
        created_at: "2021/02/01"
    },
    {
        title: "Headphone S102",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-11-720x720.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 3.86,
        url: "#",
        price: 46.0,
        categories: ["Hello & mellow"],
        created_at: "2021/01/01"
    },
    {
        title: "Headphone S102",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-11-720x720.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 4,
        url: "#",
        price: 46.0,
        discount: 13,
        categories: ["Hello & mellow"],
        created_at: "2021/01/01"
    },
    {
        title: "Headphone S102",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-11-720x720.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 4,
        url: "#",
        price: 46.0,
        discount: 13,
        categories: ["Camera & Photo", "Hello & mellow"],
        created_at: "2021/01/02"
    },
    {
        title: "Headphone S102",
        images: [
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-11-720x720.jpg",
            "https://wpbingosite.com/wordpress/dimita/wp-content/uploads/2019/04/Image-1.jpg"
        ],
        rating: 4,
        url: "#",
        price: 46.0,
        categories: ["Hello & mellow"],
        created_at: "2021/01/01"
    }
];

const Main = ({ setProducts }) => {
    const location = useLocation();
    const [desktop] = useMediaQuery("(min-width: 1100px)");
    const [showScrollBtn, setShowScrollBtn] = useState(false);

    useEffect(() => {
        /*axios
            .get("/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));*/
        setProducts(products);
    }, []);

    useEffect(() => {
        window.onscroll = function(e) {
            if (window.scrollY >= 350) setShowScrollBtn(true);
            else if (window.scrollY < 800) setShowScrollBtn(false);
        };
    }, []);

    return (
        <>
            <Fragment>
                {desktop && <ScrollToTopButton condition={showScrollBtn} />}
            </Fragment>
            <Switch>
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
                                    {/*<NavBar />*/}
                                    <Component {...props} crumbs={crumbs} />
                                </>
                            );
                        }}
                    />
                ))}
            </Switch>
            <Footer />
        </>
    );
};

export default connect(null, mapDispatchToProps)(Main);
