import {
    OFFER_FETCH_SUCCEEDED, OFFER_FETCH_REQUESTED,
    CARTITEMS_FETCH_SUCCEEDED, CARTITEMS_FETCH_REQUESTED,
    DELIVERYADDRESSES_FETCH_SUCCEEDED,
    DELIVERYADDRESSES_FETCH_REQUESTED
} from "../constants/cart";

export const initialState = {
    offers: [],
    cartItems: [],
    deliveryAddresses: [],
    isFetching: true,
    offersAreFetching: true,
    selectedAddressId: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case DELIVERYADDRESSES_FETCH_REQUESTED: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case DELIVERYADDRESSES_FETCH_SUCCEEDED: {
            return {
                ...state,
                deliveryAddresses: action.payload,
                isFetching: false
            }
        }
        case OFFER_FETCH_REQUESTED: {
            return {
                ...state,
                offersAreFetching: true,
            }
        }
        case OFFER_FETCH_SUCCEEDED: {
            return {
                ...state,
                offers: action.payload,
                offersAreFetching: false
            }
        }
        case CARTITEMS_FETCH_REQUESTED: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case CARTITEMS_FETCH_SUCCEEDED: {
            return {
                ...state,
                cartItems: action.payload,
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

export function fetchCartItems(){
    return {type: CARTITEMS_FETCH_REQUESTED}
}

export function fetchDeliveryAddresses(){
    return {type: DELIVERYADDRESSES_FETCH_REQUESTED}
}
