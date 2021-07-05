import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setAuth, setCartProducts } from "../../actions";
import { apiClient, formatSlotTimes } from "../../utilities";
import { handleOrder } from "../../utilities/data";
import qs from "query-string";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import { DEFAULT_TOAST, TEMPLATE_ORDER } from "../../constants";
import { generateTable, handleMailSend } from "../../utilities/mail";
import { useHistory } from "react-router-dom";

const mapStateToProps = state => ({
    cart: state.cart,
    slots: state.slots,
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    setAuth: auth => dispatch(setAuth(auth)),
    setCartProducts: cart => dispatch(setCartProducts(cart))
});

const PaymentRedirect = ({ cart, slots, setAuth, auth, setCartProducts }) => {
    var history = useHistory();
    const toast = useToast(DEFAULT_TOAST);

    useEffect(() => {
        const query = qs.parse(location.search);

        if (cart.length > 0) {
            apiClient
                .get("/sanctum/csrf-cookie")
                .then(res =>
                    apiClient
                        .post("/api/stripe/session", {
                            sessionId: query.session_id
                        })
                        .then(res => {
                            const values = JSON.parse(
                                localStorage.getItem("values")
                            );
                            const slot = formatSlotTimes(
                                slots.filter(
                                    s => s.id === Number(values.collection_id)
                                )[0].times
                            );
                            handleOrder(
                                values,
                                res.data.amount_total / 100,
                                slot,
                                cart,
                                setAuth,
                                onSuccess,
                                onError,
                                "stripe"
                            );
                        })
                        .catch(err => {
                            console.log(err.response);
                        })
                )
                .catch(err => console.log(err));
        }
    }, [cart]);

    const onSuccess = (total, oid, collection_slot) => {
        localStorage.removeItem("values");
        setCartProducts([]);
        const order_table = generateTable(
            JSON.parse(localStorage.getItem("order")),
            total
        );
        handleMailSend(
            TEMPLATE_ORDER,
            "Your order has been placed",
            auth.user.fullname,
            auth.user.email,
            { order_table, collection_slot }
        );
        localStorage.removeItem("order");
        toast({
            title: "Payment Success",
            description: "Your order has been placed!",
            status: "success"
        });
        history.push(`/invoice/?oid=${oid}`);
    };

    const onError = err => {
        localStorage.removeItem("values");
        localStorage.removeItem("order");
        console.log(err);
        const errors = err.response.data.message;
        if (errors.length > 0) {
            errors.forEach(msg =>
                toast({
                    title: "Error occured!",
                    description: msg,
                    status: "error"
                })
            );
        }
    };

    return (
        <Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
            <Spinner color="secondary" mr="10px" boxSize="15px" />{" "}
            <p>Processing your payment... Please dont close this window!</p>
        </Flex>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentRedirect);
