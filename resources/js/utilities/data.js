import { apiClient, getFinalPrice } from ".";

export const loadWishlist = (setWishlistProducts, onSuccess, onError) => {
    if (
        localStorage.getItem("wishlist") &&
        JSON.parse(localStorage.getItem("wishlist")).length > 0
    )
        apiClient
            .post("/api/wishlist/product/bulk-add", {
                products: JSON.parse(localStorage.getItem("wishlist"))
            })
            .then(res => {
                apiClient
                    .get("/api/wishlist")
                    .then(res => {
                        setWishlistProducts([
                            ...new Set(res.data.map(p => p.product_id))
                        ]);
                        localStorage.removeItem("wishlist");
                        onSuccess();
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => {
                console.log(err);
                onError(err);
            });
    else onSuccess();
};

export const loadCart = (setCartProducts, onSuccess, onError) => {
    if (
        localStorage.getItem("cart") &&
        JSON.parse(localStorage.getItem("cart")).length > 0
    )
        apiClient
            .post("/api/cart/product/bulk-add", {
                products: JSON.parse(localStorage.getItem("cart"))
            })
            .then(res => {
                apiClient
                    .get("/api/cart")
                    .then(res => {
                        setCartProducts(
                            res.data.map(details => {
                                return {
                                    product_id: details.product_id,
                                    qty: details.qty,
                                    subtotal: details.subtotal
                                };
                            })
                        );
                        localStorage.removeItem("cart");
                        onSuccess();
                    })
                    .catch(err => {
                        console.log(err.response);
                        onError(err);
                    });
            })
            .catch(err => {
                console.log(err.response);
                onError(err);
            });
    else onSuccess();
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
                            setCartProducts([
                                {
                                    product_id: product.id,
                                    qty: valueAsNumber,
                                    subtotal:
                                        getFinalPrice(product) * valueAsNumber
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
