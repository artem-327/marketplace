import {
    CHANGE_ELEMENT
} from '../constants/SaveFilterItem.constants';

export const display = (element, key) => {
    return {
        type: CHANGE_ELEMENT,
        payload: element,
        key: key
    };
};