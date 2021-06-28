import { apiClient } from ".";

export const loadWishlist = (onSuccess, onError) => {
    if (
        localStorage.getItem("wishlist") &&
        JSON.parse(localStorage.getItem("wishlist")).length > 0
    )
        apiClient
            .post("/api/wishlist/product/bulk-add", {
                products: JSON.parse(localStorage.getItem("wishlist"))
            })
            .then(res => {
                console.log("Successfully loaded wishlist to database!");
                localStorage.removeItem("wishlist");
                onSuccess();
            })
            .catch(err => {
                console.log(err.response);
                onError();
            });
    else onSuccess();
};
