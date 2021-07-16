import { apiClient, getFinalPrice } from ".";

export const loadWishlist = (onSuccess, onError) => {
    if (
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user")).role === "Customer" &&
        localStorage.getItem("wishlist") &&
        JSON.parse(localStorage.getItem("wishlist")).length > 0
    )
        apiClient
            .post("/api/wishlist/product/bulk-add", {
                products: JSON.parse(localStorage.getItem("wishlist"))
            })
            .then(res => {
                localStorage.removeItem("wishlist");
                onSuccess();
            })
            .catch(err => {
                console.log(err);
                onError(err);
            });
    else onSuccess();
};

export const loadCart = (setProducts, onError) => {
    if (
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user")).role === "Customer" &&
        localStorage.getItem("cart") &&
        JSON.parse(localStorage.getItem("cart")).length > 0
    )
        apiClient
            .post("/api/cart/product/bulk-add", {
                products: JSON.parse(localStorage.getItem("cart"))
            })
            .then(res => {
                localStorage.removeItem("cart");
                setProducts();
            })
            .catch(err => {
                setProducts();
                onError(err);
            });
    else setProducts();
};

export const addToCart = (
    product,
    auth,
    valueAsNumber,
    onSuccess,
    onError,
    logicError,
    setCartProducts,
    cart,
    maxOrderExceedError
) => {
    if (product) {
        const max_order =
            product.qty > product.max_order ? product.max_order : product.qty;
        const includes = cart.map(c => c.product_id).includes(product.id);

        if (includes) {
            const p = cart.filter(c => c.product_id === product.id)[0];

            if (p.qty + valueAsNumber > max_order) {
                maxOrderExceedError(max_order, product.unit);
                return;
            }
        }
        if (auth.logged_in)
            apiClient
                .get("/sanctum/csrf-cookie")
                .then(res =>
                    apiClient
                        .post("/api/cart/product/add", {
                            product_id: product.id,
                            qty: valueAsNumber,
                            subtotal: getFinalPrice(product) * valueAsNumber
                        })
                        .then(res => {
                            if (
                                cart.map(c => c.product_id).includes(product.id)
                            )
                                setCartProducts([
                                    {
                                        product_id: product.id,
                                        qty:
                                            valueAsNumber +
                                            cart.filter(
                                                c => c.product_id === product.id
                                            )[0].qty,
                                        subtotal:
                                            getFinalPrice(product) *
                                                valueAsNumber +
                                            cart.filter(
                                                c => c.product_id === product.id
                                            )[0].subtotal
                                    },
                                    ...cart
                                ]);
                            else
                                setCartProducts([
                                    {
                                        product_id: product.id,
                                        qty: valueAsNumber,
                                        subtotal:
                                            getFinalPrice(product) *
                                            valueAsNumber
                                    },
                                    ...cart
                                ]);
                            onSuccess(product.id);
                        })
                        .catch(err => {
                            onError(err);
                        })
                )
                .catch(err => {
                    onError(err);
                });
        else {
            const totalQty = cart
                ? cart.map(p => p.qty).reduce((a, b) => a + b, 0)
                : 0;
            if (totalQty + valueAsNumber > 20) {
                logicError();
                return;
            }
            if (cart.length > 0) {
                if (cart.map(p => p.product_id).includes(product.id)) {
                    const storedProduct = cart.filter(
                        p => p.product_id === product.id
                    )[0];

                    localStorage.setItem(
                        "cart",
                        JSON.stringify([
                            {
                                product_id: product.id,
                                qty: storedProduct.qty + valueAsNumber,
                                subtotal:
                                    storedProduct.subtotal +
                                    getFinalPrice(product) * valueAsNumber
                            },
                            ...cart.filter(p => p.product_id !== product.id)
                        ])
                    );
                    setCartProducts([
                        {
                            product_id: product.id,
                            qty: storedProduct.qty + valueAsNumber,
                            subtotal:
                                storedProduct.subtotal +
                                getFinalPrice(product) * valueAsNumber
                        },
                        ...cart.filter(p => p.product_id !== product.id)
                    ]);
                } else {
                    localStorage.setItem(
                        "cart",
                        JSON.stringify([
                            {
                                product_id: product.id,
                                qty: valueAsNumber,
                                subtotal: getFinalPrice(product) * valueAsNumber
                            },
                            ...cart
                        ])
                    );
                    setCartProducts([
                        {
                            product_id: product.id,
                            qty: valueAsNumber,
                            subtotal: getFinalPrice(product) * valueAsNumber
                        },
                        ...cart
                    ]);
                }
            } else {
                if (valueAsNumber > 20) {
                    toast({
                        title: "Error",
                        description:
                            "Maximum product qty limit exceeded in the cart i.e, 20!",
                        status: "error"
                    });
                    return;
                }
                localStorage.setItem(
                    "cart",
                    JSON.stringify([
                        {
                            product_id: product.id,
                            qty: valueAsNumber,
                            subtotal: getFinalPrice(product) * valueAsNumber
                        }
                    ])
                );
                setCartProducts([
                    {
                        product_id: product.id,
                        qty: valueAsNumber,
                        subtotal: getFinalPrice(product) * valueAsNumber
                    }
                ]);
            }
            onSuccess(product.id);
        }
    }
};

export const handleOrder = (
    { fullname, email, phone, street_no, address, date, collection_id },
    total,
    slot,
    cart,
    setAuth,
    onSuccess,
    onError,
    method
) => {
    apiClient
        .get("/sanctum/csrf-cookie")
        .then(res =>
            apiClient
                .post("/api/user", {
                    fullname,
                    email,
                    phone,
                    street_no,
                    address
                })
                .then(res => {
                    setAuth({
                        logged_in: true,
                        user: res.data.user
                    });
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    date = new Date(date);
                    date = new Date(
                        date.getTime() - date.getTimezoneOffset() * 60000
                    )
                        .toISOString()
                        .split("T")[0];
                    apiClient
                        .post("/api/order", {
                            date,
                            collection_id,
                            subtotal: total,
                            total,
                            products: cart
                        })
                        .then(res => {
                            apiClient
                                .post("/api/payment", {
                                    method,
                                    amount: total,
                                    order_id: res.data.oid
                                })
                                .then(() => {
                                    onSuccess(
                                        total,
                                        res.data.oid,
                                        date + " " + slot
                                    );
                                })
                                .catch(err => {
                                    onError(err);
                                });
                        })
                        .catch(err => {
                            onError(err);
                        });
                })
                .catch(err => console.log(err.response))
        )
        .catch(err => console.log(err.response));
};
