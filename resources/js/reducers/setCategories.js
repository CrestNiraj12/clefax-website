import { SET_CATEGORIES } from "../constants";

export default (state = [], action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return action.payload;
        default:
            return state;
    }
};
