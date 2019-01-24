import {
    CHANGE_ELEMENT
} from '../constants/SaveFilterItem.constants';

const initialState = {
    bell: false,
    notifications: false,
    selected: false,
    active: false,
    email: false,
    mobile: false,
    system: false,
    toolTip: false
};

export const show = (state=initialState, action={}) => {
    switch (action.type) {
        case CHANGE_ELEMENT:
            return Object.assign({}, state, {[action.payload]: !state[action.payload] });
        default:
            return state;
    }
};