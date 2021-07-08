import { Flex } from "@chakra-ui/layout";
import { Spinner, useToast } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import md5 from "md5";
import { DEFAULT_TOAST, SALT } from "../../constants";
import { useHistory } from "react-router-dom";
import qs from "query-string";
import { apiClient } from "../../utilities";
import { setAuth } from "../../actions";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({
    setAuth: auth => dispatch(setAuth(auth))
});

const EmailVerification = ({ setAuth }) => {
    const toast = useToast(DEFAULT_TOAST);
    const history = useHistory();

    useEffect(() => {
        const query = qs.parse(location.search);
        if (query.token) {
            const auth = localStorage.getItem("auth");
            var user = localStorage.getItem("user");
            if (auth && user) {
                if (auth === "true") {
                    toast({
                        title: "Account already verified",
                        description: "Your account is already verified!",
                        status: "info"
                    });
                    history.push("/");
                } else {
                    user = JSON.parse(user);
                    if (
                        query.token === md5(user.email + SALT + user.fullname)
                    ) {
                        apiClient
                            .get("/sanctum/csrf-cookie")
                            .then(res =>
                                apiClient
                                    .get(`/api/user/verify/${user.id}`)
                                    .then(res => {
                                        setAuth({
                                            logged_in: true,
                                            user: res.data.user
                                        });
                                        localStorage.setItem("auth", true);
                                        localStorage.setItem(
                                            "user",
                                            JSON.stringify(res.data.user)
                                        );
                                        toast({
                                            title: "Email verification success",
                                            description: res.data.message,
                                            status: "success"
                                        });
                                        history.push("/");
                                    })
                                    .catch(err => console.log(err.response))
                            )
                            .catch(err => console.log(err.response));
                    } else {
                        toast({
                            title: "Link invalid or expired",
                            description:
                                "Your account verification link is invalid or already expired!",
                            status: "warning"
                        });
                        history.push("/login");
                    }
                }
            } else {
                toast({
                    title: "Link expired",
                    description:
                        "Your account verification link is already expired!",
                    status: "warning"
                });
                history.push("/login");
            }
        }
    }, []);

    return (
        <Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
            <Spinner color="secondary" mr="10px" boxSize="15px" />{" "}
            <p>Verifying your account... Please dont close this window!</p>
        </Flex>
    );
};

export default connect(null, mapDispatchToProps)(EmailVerification);
