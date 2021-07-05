import { loadStripe } from "@stripe/stripe-js";

export const payWithStripe = async (setButtonLoading, products, values) => {
    const stripePromise = loadStripe(
        "pk_test_51HrrlNARkfToiPFSupHqiJpGnsej3pPYyODpRU5x651HuosD4y4b9fufVkDzfKf0BQNbKgxwAKZWMiFWxrnIgaRO000iRAqmx5"
    );

    setButtonLoading(true);
    localStorage.setItem("values", JSON.stringify(values));

    const stripe = await stripePromise.catch(err => {
        setButtonLoading(false);
        console.log(err);
    });

    const response = await axios
        .post("/api/stripe/pay", {
            products
        })
        .catch(err => {
            console.log(err.response);
            setButtonLoading(false);
        });

    const result = await stripe.redirectToCheckout({
        sessionId: response.data
    });

    setButtonLoading(false);
    if (result.error) console.log(result.error);
};
