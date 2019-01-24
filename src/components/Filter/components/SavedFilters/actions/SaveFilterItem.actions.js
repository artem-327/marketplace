import {
    CHANGE_ELEMENT
} from '../constants/SaveFilterItem.constants';

export const display = (element) => ({
    type: CHANGE_ELEMENT,
    payload: element
});