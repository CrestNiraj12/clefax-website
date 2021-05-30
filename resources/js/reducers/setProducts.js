import { SET_PRODUCTS } from "../constants";

export default (state = [], action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return action.payload;
        default:
            return state;
    }
};
