import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setAuth, setCartProducts } from "../../actions";
import { apiClient } from "../../utilities";
import { handleOrder } from "../../utilities/data";
import qs from "query-string";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import { DEFAULT_TOAST, TEMPLATE_BASIC, TEMPLATE_ORDER } from "../../constants";
import { generateTable, handleMailSend } from "../../utilities/mail";
import { useHistory } from "react-router-dom";

const mapStateToProps = state => ({
    cart: state.cart,
    slots: state.slots,
    auth: state.auth,
    products: state.products
});

const mapDispatchToProps = dispatch => ({
    setAuth: auth => dispatch(setAuth(auth)),
    setCartProducts: cart => dispatch(setCartProducts(cart))
});

const PaymentRedirect = ({
    cart,
    slots,
    setAuth,
    auth,
    setCartProducts,
    products
}) => {
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
                            const slot = slots.filter(
                                s => s.id === Number(values.collection_id)
                            )[0].times;
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
        const ps = JSON.parse(localStorage.getItem("order"));
        const order_table = generateTable(ps, total);

        handleMailSend(
            TEMPLATE_ORDER,
            "Your order has been placed",
            auth.user.fullname,
            auth.user.email,
            { order_table, collection_slot }
        );

        [...new Set(ps.map(p => p.shop))].forEach(s => {
            const productsByShop = ps.filter(p => p.shop === s);
            const shop = products.filter(p => p.shop.name === s)[0].shop;
            const t = productsByShop
                .map(p => p.subtotal)
                .reduce((a, b) => a + b, 0);

            const ot = generateTable(productsByShop, t);
            const message = `<p>An ordered was made from your shop <strong>${shop.name}</strong>.</p> 
                    <p><span style="color: #e03e2d;">CUSTOMER DETAILS:</span></p>
                    <p><span style="font-size: 10pt;">Name: ${auth.user.fullname}<br />Email: ${auth.user.email}<br /></span><span style="font-size: 10pt;">Collection date &amp; time: <strong>${collection_slot}</strong><br /></span></p>
                    <p>&nbsp;</p>
                    <p><span style="color: #e03e2d;">ORDER DETAILS:</span></p>
                    <p>${ot}</p>`;

            if (productsByShop.length)
                handleMailSend(
                    TEMPLATE_BASIC,
                    "New order notification",
                    shop.user.fullname,
                    shop.user.email,
                    { from_name: "Clefax E-Shop", message }
                );
        });

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
