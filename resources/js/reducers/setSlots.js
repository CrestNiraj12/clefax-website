import { SET_SLOTS } from "../constants";

export default (state = [], action) => {
    switch (action.type) {
        case SET_SLOTS:
            return action.payload;
        default:
            return state;
    }
};
