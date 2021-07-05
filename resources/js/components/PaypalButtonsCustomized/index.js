import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useEffect } from "react";

export const PaypalButtonsCustomized = ({
    createOrder,
    onApprove,
    onCancel,
    PAYPAL_CLIENT_ID
}) => {
    const [{ isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        const scriptProviderOptions = {
            "client-id": PAYPAL_CLIENT_ID,
            currency: "GBP"
        };

        dispatch({
            type: "resetOptions",
            value: {
                ...scriptProviderOptions,
                "data-order-id": Date.now()
            }
        });
    }, [dispatch]);

    return (
        <>
            {isPending ? (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : null}
            <PayPalButtons
                style={{
                    color: "black",
                    shape: "rect",
                    layout: "vertical",
                    label: "pay",
                    height: 35,
                    width: "100%"
                }}
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
                onCancel={() => onCancel()}
                onError={err => console.log(err)}
            />
        </>
    );
};
