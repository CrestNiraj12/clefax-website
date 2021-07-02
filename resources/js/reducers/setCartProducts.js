import { SET_CART_PRODUCTS } from "../constants";

export default (state = [], action) => {
    switch (action.type) {
        case SET_CART_PRODUCTS:
            return action.payload;
        default:
            return state;
    }
};
