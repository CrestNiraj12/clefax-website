import {
    SET_AUTH,
    SET_CATEGORIES,
    SET_PAGE,
    SET_PRODUCTS,
    SHOW_SEARCH
} from "../constants";

export const setProducts = products => ({
    type: SET_PRODUCTS,
    payload: products
});

export const setCategories = categories => ({
    type: SET_CATEGORIES,
    payload: categories
});

export const setPage = page => ({
    type: SET_PAGE,
    payload: page
});

export const showSearch = show => ({
    type: SHOW_SEARCH,
    payload: show
});

export const setAuth = auth => ({
    type: SET_AUTH,
    payload: auth
});
