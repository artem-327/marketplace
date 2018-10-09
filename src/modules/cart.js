import axios from "axios";
import {
    OFFER_FETCH_SUCCEEDED, OFFER_FETCH_REQUESTED
} from "../constants/cart";

export const initialState = {
    data:[],
    isFetching: true,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case OFFER_FETCH_REQUESTED: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case OFFER_FETCH_SUCCEEDED: {
            return {
                ...state,
                data: action.payload,
                isFetching: false
            }
        }
        default: {
            return state
        }
    }
}

export function getCurrentAdded(id) {
    return {
        type: OFFER_FETCH_REQUESTED, payload: {id}
    }
}
