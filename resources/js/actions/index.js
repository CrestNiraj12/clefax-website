import { SET_PRODUCTS } from "../constants";

export const setProducts = products => ({
    type: SET_PRODUCTS,
    payload: products
});
