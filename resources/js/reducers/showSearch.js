import { SHOW_SEARCH } from "../constants";

export default (state = false, action) => {
    switch (action.type) {
        case SHOW_SEARCH:
            return action.payload;
        default:
            return state;
    }
};
