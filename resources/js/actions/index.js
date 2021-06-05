import { SET_PAGE, SET_PRODUCTS, SHOW_SEARCH } from "../constants";

export const setProducts = products => ({
    type: SET_PRODUCTS,
    payload: products
});

export const setPage = page => ({
    type: SET_PAGE,
    payload: page
});

export const showSearch = show => ({
    type: SHOW_SEARCH,
    payload: show
});
