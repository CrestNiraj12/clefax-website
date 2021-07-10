import { Box, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAuth } from "../../actions";
import { DEFAULT_TOAST } from "../../constants";

const mapDispatchToProps = dispatch => ({
    setAuth: auth => dispatch(setAuth(auth))
});

const LogoutProcess = ({ setAuth }) => {
    const toast = useToast(DEFAULT_TOAST);
    const history = useHistory();

    useEffect(() => {
        localStorage.setItem("auth", false);
        localStorage.removeItem("user");
        setAuth({ logged_in: false, user: null });
        toast({
            title: "Logout success",
            description: "Successfully logged out!",
            status: "success"
        });
        history.push("/");
    }, []);

    return <Box></Box>;
};

export default connect(null, mapDispatchToProps)(LogoutProcess);
