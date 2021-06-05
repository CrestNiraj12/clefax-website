import { combineReducers } from "redux";
import products from "./setProducts";
import page from "./setPage";
import showSearch from "./showSearch";

export default combineReducers({ products, page, showSearch });
