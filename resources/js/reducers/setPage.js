import { SET_PAGE } from "../constants";

export default (state = [], action) => {
    switch (action.type) {
        case SET_PAGE:
            return action.payload;
        default:
            return state;
    }
};
