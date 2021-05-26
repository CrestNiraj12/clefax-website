import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
//import { setProducts } from "./actions";
import routes from "./routes";

/*const mapStateToProps = (state) => ({
    showSearch: state.showSearch,
});

const mapDispatchToProps = (dispatch) => ({
    setProducts: (products) => dispatch(setProducts(products)),
});
*/

const Main = ({ showSearch, setProducts }) => {
    const location = useLocation();
    const [showScrollBtn, setShowScrollBtn] = useState(false);

    /*useEffect(() => {
        axios
            .get("/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, []);*/

    useEffect(() => {
        window.onscroll = function(e) {
            if (window.scrollY >= 350) setShowScrollBtn(true);
            else if (window.scrollY < 800) setShowScrollBtn(false);
        };
    }, []);

    return (
        <>
            <Fragment>
                {<ScrollToTopButton condition={showScrollBtn} />}
            </Fragment>
            {/*<Fragment>{showSearch && <Search />}</Fragment>*/}
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

export default Main; //connect(mapStateToProps, mapDispatchToProps)(Main);
