import axios from "axios";

const CURRENT_ADDED = "CURRENT_ADDED";
const CURRENT_ADDED_FULFILLED = "CURRENT_ADDED_FULFILLED";
const CURRENT_ADDED_PENDING = "CURRENT_ADDED_PENDING";

export const initialState = {
    data:[],
    isFetching: true,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case CURRENT_ADDED_PENDING: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case CURRENT_ADDED_FULFILLED: {
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
        type: CURRENT_ADDED,
        payload: axios.get("/api/v1/product-offers/"+id+"/").then(response => response.data.data.productOffer)
    }
}
