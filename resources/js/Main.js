import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
//import { setCourses } from "./actions";
import routes from "./routes";

/*const mapStateToProps = (state) => ({
    showSearch: state.showSearch,
});

const mapDispatchToProps = (dispatch) => ({
    setCourses: (courses) => dispatch(setCourses(courses)),
});
*/

const Main = ({ showSearch, setCourses }) => {
    const location = useLocation();

    /*useEffect(() => {
        axios
            .get("/api/courses-with-types")
            .then((res) => setCourses(res.data))
            .catch((err) => console.log(err));
    }, []);*/

    return (
        <>
            {/*<Fragment>{showSearch && <Search />}</Fragment>*/}
            <Switch>
                {routes.map(({ path, Component, exact }) => (
                    <Route
                        exact={exact}
                        key={location.pathname}
                        path={path}
                        render={(props) => {
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
                                    ...rest,
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
            {/*<Footer />*/}
        </>
    );
};

export default Main; //connect(mapStateToProps, mapDispatchToProps)(Main);
