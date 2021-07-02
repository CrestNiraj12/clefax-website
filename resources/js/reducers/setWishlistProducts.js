import { SET_WISHLIST_PRODUCTS } from "../constants";

export default (state = [], action) => {
    switch (action.type) {
        case SET_WISHLIST_PRODUCTS:
            return action.payload;
        default:
            return state;
    }
};
