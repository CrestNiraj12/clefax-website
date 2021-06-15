import { combineReducers } from "redux";
import products from "./setProducts";
import page from "./setPage";
import categories from "./setCategories";
import showSearch from "./showSearch";

export default combineReducers({ products, categories, page, showSearch });
