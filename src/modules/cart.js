import {
    OFFER_FETCH_SUCCEEDED, OFFER_FETCH_REQUESTED, 
    CARTITEMS_FETCH_SUCCEEDED, CARTITEMS_FETCH_REQUESTED
} from "../constants/cart";

export const initialState = {
    offers: [],
    cartItems: [],
    isFetching: true,
    cartIsFetching: true //TODO: fix isFetching
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
                offers: action.payload,
                isFetching: false
            }
        }
        case CARTITEMS_FETCH_REQUESTED: {
            return {
                ...state,
                cartIsFetching: true,
            }
        }
        case CARTITEMS_FETCH_SUCCEEDED: {
            return {
                ...state,
                cartItems: action.payload,
                cartIsFetching: false
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

export function fetchCartItems(){
    return {type: CARTITEMS_FETCH_REQUESTED}
}
