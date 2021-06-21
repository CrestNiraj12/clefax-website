import { SET_AUTH } from "../constants";

export default (state = { logged_in: false, user: null }, action) => {
    switch (action.type) {
        case SET_AUTH:
            return action.payload;
        default:
            return state;
    }
};
