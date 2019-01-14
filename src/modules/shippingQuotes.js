import {
    SHIPPINGQUOTES_FETCH_REQUESTED,
    SHIPPINGQUOTES_FETCH_SUCCEEDED
} from "../constants/shippingQuotes";


export const initialState = {
    destinationZIP: false,
    quantity: 0,
    shippingQuotes: [],
    shippingQuotesIsFetching: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SHIPPINGQUOTES_FETCH_REQUESTED: {
            return {
                ...state,
                shippingQuotesIsFetching: true
            }
        }
        case SHIPPINGQUOTES_FETCH_SUCCEEDED: {
            return {
                ...state,
                shippingQuotes: action.payload,
                shippingQuotesIsFetching: false
            }
        }

        default: {
            return state
        }
    }
}

export function getShippingQuotes(pack) {
    return {type: SHIPPINGQUOTES_FETCH_REQUESTED, payload: {pack}}
}