import { combineReducers } from "redux";
import products from "./setProducts";
import page from "./setPage";
import categories from "./setCategories";
import showSearch from "./showSearch";
import auth from "./setAuth";
import cart from "./setCartProducts";
import wishlist from "./setWishlistProducts";
import slots from "./setSlots";

export default combineReducers({
    auth,
    products,
    categories,
    page,
    showSearch,
    cart,
    wishlist,
    slots
});
